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
  prompt: `You are a senior financial analyst providing a clear, concise, and professional explanation for a credit score change.

  **Issuer:** {{issuer}}
  **Asset Class:** {{assetClass}}
  **Score Change:** From {{oldScore}} to {{newScore}}

  **Analysis Request:**
  Based on the data below, generate a narrative explanation for the credit score change. The explanation should be suitable for a financial professional. It should:
  1.  Start with a summary sentence of the score change.
  2.  Explain the primary drivers, referencing the feature contributions. Emphasize the features with the largest positive or negative impact.
  3.  Incorporate the recent impacting events as context for the feature changes.
  4.  Conclude with a brief outlook or summary of the current credit standing.

  **Impacting Events:**
  {{#each impactingEvents}}
  - {{this}}
  {{/each}}

  **Feature Contribution Analysis (Feature: Contribution Value):**
  {{#each (keys featureContributions)}}
  - {{this}}: {{lookup ../featureContributions this}}
  {{/each}}

  Please provide the explanation below.
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
