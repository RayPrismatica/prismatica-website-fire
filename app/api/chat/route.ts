import { NextRequest, NextResponse } from 'next/server';
import { chatRateLimiter, getClientIdentifier } from '@/lib/rateLimiter';
import fs from 'fs';
import path from 'path';

// In production, load and cache the prompt once
const promptPath = path.join(process.cwd(), 'scripts', 'prompts', 'athena-chat.md');
let CACHED_ATHENA_PROMPT: string | null = null;

// Only cache in production
if (process.env.NODE_ENV === 'production') {
  CACHED_ATHENA_PROMPT = fs.readFileSync(promptPath, 'utf8');
}

// Function to get the prompt - uses cache in production, reloads in development
function getAthenaPrompt(): string {
  if (process.env.NODE_ENV === 'production' && CACHED_ATHENA_PROMPT) {
    return CACHED_ATHENA_PROMPT;
  }
  // In development, always read fresh from file
  return fs.readFileSync(promptPath, 'utf8');
}

export async function POST(request: NextRequest) {
  // Rate limiting check
  const clientId = getClientIdentifier(request);
  const rateLimitResult = chatRateLimiter.check(clientId);

  if (!rateLimitResult.allowed) {
    const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
    return NextResponse.json(
      {
        error: 'Too many requests. Please slow down.',
        retryAfter
      },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
        }
      }
    );
  }

  try {
    const { messages } = await request.json();

    // Use separate API key for chat (fallback to main key for backward compatibility)
    const apiKey = process.env.ANTHROPIC_API_KEY_CHAT || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY_CHAT or ANTHROPIC_API_KEY environment variable is not set' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1024,
        system: getAthenaPrompt(),
        messages: messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(
      {
        message: data.content[0].text
      },
      {
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
        }
      }
    );
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
