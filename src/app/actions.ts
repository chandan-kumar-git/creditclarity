'use server';

import { generateScoreExplanation } from '@/ai/flows/generate-score-explanation';
import type { Issuer } from '@/lib/types';

export async function getExplanation(issuer: Issuer) {
  try {
    // We're using the last score and the first score in history as new and old for demonstration
    const oldScore = issuer.scoreHistory[0]?.score ?? issuer.score - 10;
    const newScore = issuer.score;

    const impactingEvents = issuer.recentEvents.map(e => e.headline);
    const featureContributions = issuer.featureContributions.reduce((acc, feat) => {
      acc[feat.feature] = feat.value;
      return acc;
    }, {} as Record<string, number>);

    const result = await generateScoreExplanation({
      issuer: issuer.name,
      assetClass: issuer.assetClass,
      oldScore: oldScore,
      newScore: newScore,
      impactingEvents: impactingEvents,
      featureContributions: featureContributions,
    });
    return result.explanation;
  } catch (error) {
    console.error(error);
    return 'An error occurred while generating the explanation. Please try again.';
  }
}
