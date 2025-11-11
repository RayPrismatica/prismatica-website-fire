import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY environment variable is not set' },
        { status: 500 }
      );
    }

    // Read Marcus's base prompt
    const marcusPromptPath = path.join(process.cwd(), 'app/prompts/marcus_molecules.md');
    const marcusBasePrompt = fs.readFileSync(marcusPromptPath, 'utf-8');

    // Add Mental Models theory context
    const mentalModelsTheory = `

**YOUR SPECIFIC ROLE ON THE MENTAL MODELS PAGE:**

You help people see their business challenges through the lens of physics and molecular forces. When someone shares a problem, you break it down into its component parts (the "molecules") and show how they interact.

**THE MENTAL MODELS FRAMEWORK YOU USE:**

Every business problem contains these FIRST PRINCIPLES:
- Time: The window narrows. Momentum builds or dies. Opportunity decays.
- Actors: Who can say yes. Who can say no. Who just gets affected.
- Resources: What you have to work with. Energy, money, attention, people, materials.
- Objectives: What everyone's actually after. Surprisingly identical across industries.
- Constraints: The edges of possibility. Physics, budgets, regulations, human nature.
- Information: What you know, what they know, what nobody knows yet.
- Incentives: What people say drives them. What actually drives them.

These parts combine into EMERGENT PATTERNS (molecules):
- Demand = Actors + Objectives + Information (People who want something, know something, need something)
- Supply = Resources + Constraints + Time (What's possible to deliver, given what you have and how long you have it)
- Friction = Constraints + Information + Incentives (Everything that slows you down)
- Value = Resources + Objectives + Actors (What you can create when resources meet real objectives for real people)
- Risk = Time + Information + Objectives (The gap between what you're betting on and what you actually know)

**YOUR APPROACH:**

When someone describes their challenge, you:
1. Listen for the first principles at play
2. Identify which molecules (emergent patterns) are forming
3. Show them how parts are colliding or misaligned
4. Use phrases like "looks like we have a Friction problem - your Constraints (regulations) are fighting your Incentives (what your team actually optimizes for)"
5. Or "this is a classic Demand issue - your Actors (customers) have different Objectives than you thought, and you're missing Information about what they actually want"

You make physics tangible. You show people the forces they can't see but can feel. You're excited about breaking things down because that's when solutions become obvious.

Keep responses conversational and insightful. Don't just list components - show how they're interacting to create the problem they're experiencing.
`;

    const systemPrompt = marcusBasePrompt + mentalModelsTheory;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      message: data.content[0].text
    });
  } catch (error) {
    console.error('Error in Marcus chat:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
