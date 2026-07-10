import { NextRequest, NextResponse } from 'next/server';
import { genkit, defineFlow } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })],
  model: 'gemini-1.5-pro',
});

const medicalChatFlow = defineFlow(
  {
    name: 'medicalChat',
    inputSchema: {
      type: 'object',
      properties: {
        messages: { type: 'array' },
        systemPrompt: { type: 'string' },
      },
    },
    outputSchema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
  async (input: any) => {
    const response = await ai.generate({
      prompt: input.messages.map((m: any) => `${m.role}: ${m.content}`).join('\n\n'),
      system: input.systemPrompt,
    });

    return {
      message: response.text(),
    };
  }
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, systemPrompt } = body;

    const result = await medicalChatFlow({
      messages,
      systemPrompt,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Medical chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process medical chat' },
      { status: 500 }
    );
  }
}
