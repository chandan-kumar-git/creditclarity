'use server';

/**
 * @fileOverview An AI agent that extracts credit-relevant events from financial news headlines.
 *
 * - extractCreditEvents - A function that handles the event extraction process.
 * - ExtractCreditEventsInput - The input type for the extractCreditEvents function.
 * - ExtractCreditEventsOutput - The return type for the extractCreditEvents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractCreditEventsInputSchema = z.object({
  headline: z.string().describe('A financial news headline.'),
});
export type ExtractCreditEventsInput = z.infer<typeof ExtractCreditEventsInputSchema>;

const ExtractCreditEventsOutputSchema = z.object({
  events: z.array(
    z.object({
      eventType: z.string().describe('The type of credit-relevant event.'),
      entities: z.array(z.string()).describe('The entities associated with the event.'),
      sentiment: z.string().describe('The sentiment associated with the event.'),
      relevanceScore: z
        .number()
        .describe('A score indicating the relevance of the event to creditworthiness.'),
    })
  ).describe('A list of credit-relevant events extracted from the headline.'),
});
export type ExtractCreditEventsOutput = z.infer<typeof ExtractCreditEventsOutputSchema>;

export async function extractCreditEvents(input: ExtractCreditEventsInput): Promise<ExtractCreditEventsOutput> {
  return extractCreditEventsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractCreditEventsPrompt',
  input: {schema: ExtractCreditEventsInputSchema},
  output: {schema: ExtractCreditEventsOutputSchema},
  prompt: `You are an expert financial analyst specializing in identifying credit-relevant events from news headlines.

  Analyze the following news headline and extract any credit-relevant events. For each event, identify the event type, associated entities (companies, organizations, etc.), the sentiment associated with the event (positive, negative, or neutral), and a relevance score indicating the event's impact on creditworthiness (0-100).

  Headline: {{{headline}}}

  Return the extracted events in a JSON format.
  `,
});

const extractCreditEventsFlow = ai.defineFlow(
  {
    name: 'extractCreditEventsFlow',
    inputSchema: ExtractCreditEventsInputSchema,
    outputSchema: ExtractCreditEventsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
