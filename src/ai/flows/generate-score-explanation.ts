'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating explanations for credit score changes.
 *
 * It includes:
 * - generateScoreExplanation - A function that generates an explanation for a credit score change.
 * - GenerateScoreExplanationInput - The input type for the generateScoreExplanation function.
 * - GenerateScoreExplanationOutput - The return type for the generateScoreExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateScoreExplanationInputSchema = z.object({
  issuer: z.string().describe('The name of the issuer.'),
  assetClass: z.string().describe('The asset class.'),
  oldScore: z.number().describe('The previous credit score.'),
  newScore: z.number().describe('The updated credit score.'),
  impactingEvents: z.array(z.string()).describe('A list of events impacting the score change.'),
  featureContributions: z
    .record(z.string(), z.number())
    .describe('A map of feature names to their contribution to the score change.'),
});
export type GenerateScoreExplanationInput = z.infer<typeof GenerateScoreExplanationInputSchema>;

const GenerateScoreExplanationOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation of the score change.'),
});
export type GenerateScoreExplanationOutput = z.infer<typeof GenerateScoreExplanationOutputSchema>;

export async function generateScoreExplanation(
  input: GenerateScoreExplanationInput
): Promise<GenerateScoreExplanationOutput> {
  return generateScoreExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateScoreExplanationPrompt',
  input: {schema: GenerateScoreExplanationInputSchema},
  output: {schema: GenerateScoreExplanationOutputSchema},
  prompt: `You are a financial analyst explaining credit score changes.

  The credit score for {{issuer}} in the {{assetClass}} asset class has changed from {{oldScore}} to {{newScore}}.

  The following events have impacted the score change:
  {{#each impactingEvents}}
  - {{this}}
  {{/each}}

  The following features contributed to the score change:
  {{#each (keys featureContributions)}}
  - {{this}}: {{lookup ../featureContributions this}}
  {{/each}}

  Provide a concise explanation of why the score changed, including the impacting events and feature contributions.
  `,
});

const generateScoreExplanationFlow = ai.defineFlow(
  {
    name: 'generateScoreExplanationFlow',
    inputSchema: GenerateScoreExplanationInputSchema,
    outputSchema: GenerateScoreExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
