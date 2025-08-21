export interface ScoreHistory {
  date: string;
  score: number;
}

export interface FeatureContribution {
  feature: string;
  value: number;
}

export interface RecentEvent {
  date: string;
  headline: string;
  source: string;
}

export interface Issuer {
  id: string;
  name: string;
  assetClass: string;
  score: number;
  scoreHistory: ScoreHistory[];
  longTermTrend: 'up' | 'down' | 'stable';
  featureContributions: FeatureContribution[];
  recentEvents: RecentEvent[];
}

export interface Alert {
  id: string;
  issuerName: string;
  message: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
}
