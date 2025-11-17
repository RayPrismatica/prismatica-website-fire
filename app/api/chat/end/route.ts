import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { put, list } from '@vercel/blob';

// Analysis prompt for Athena to summarize conversations
function getAnalysisPrompt(): string {
  return fs.readFileSync(
    path.join(process.cwd(), 'athena', 'prompts', 'conversation-analysis.md'),
    'utf8'
  );
}

export async function POST(request: NextRequest) {
  try {
    const { conversationId } = await request.json();

    if (!conversationId) {
      return NextResponse.json(
        { error: 'conversationId is required' },
        { status: 400 }
      );
    }

    // Find the conversation in Blob storage
    const today = new Date().toISOString().split('T')[0];
    const yearMonth = today.substring(0, 7); // YYYY-MM

    // List blobs to find the conversation
    const prefix = `athena/intel/layer1/raw-conversations/${yearMonth}/`;
    const { blobs } = await list({ prefix });

    const conversationBlob = blobs.find(blob => blob.pathname.includes(`/${conversationId}.json`));

    if (!conversationBlob) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Read the conversation from Blob
    const response = await fetch(conversationBlob.url);
    const conversationData = await response.json();

    // Skip analysis if conversation is too short (less than 3 exchanges)
    if (conversationData.message_count < 6) {
      console.log(`⏭️  Skipping analysis for ${conversationId} (too short)`);
      return NextResponse.json({
        status: 'skipped',
        reason: 'Conversation too short for meaningful analysis'
      });
    }

    // Use API key
    const apiKey = process.env.ANTHROPIC_API_KEY_CHAT || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    // Ask Athena to analyze the conversation
    const analysisResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2000,
      temperature: 0.3, // Lower temperature for more consistent analysis
      system: getAnalysisPrompt(),
      messages: [
        {
          role: 'user',
          content: `Analyze this conversation and create a summary following the template provided.

**Conversation ID:** ${conversationId}
**Page:** ${conversationData.pathname}
**Message Count:** ${conversationData.message_count}
**Timestamp:** ${conversationData.timestamp}

**Full Conversation:**
${JSON.stringify(conversationData.messages, null, 2)}`
        }
      ]
    });

    // Extract the summary text
    const textBlock = analysisResponse.content.find(
      (block): block is Anthropic.TextBlock => block.type === 'text'
    );

    const summary = textBlock?.text || 'Failed to generate summary';

    // Save the summary to Blob
    const summaryBlobPath = `athena/intel/layer1/summaries/${yearMonth}/${conversationId}.md`;

    const summaryBlob = await put(summaryBlobPath, summary, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'text/markdown'
    });

    console.log(`📝 Analysis complete: ${conversationId}`);
    console.log(`📝 Summary saved to Blob: ${summaryBlob.url}`);

    return NextResponse.json({
      status: 'analyzed',
      conversationId,
      summaryUrl: summaryBlob.url,
      summaryPath: summaryBlobPath
    });

  } catch (error) {
    console.error('Error analyzing conversation:', error);
    return NextResponse.json(
      { error: 'Failed to analyze conversation' },
      { status: 500 }
    );
  }
}
