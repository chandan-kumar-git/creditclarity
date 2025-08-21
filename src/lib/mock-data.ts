import type { Issuer, Alert } from './types';

export const ISSUERS: Issuer[] = [
  {
    id: 'aapl',
    name: 'Apple Inc.',
    assetClass: 'Technology',
    score: 820,
    longTermTrend: 'up',
    scoreHistory: [
      { date: '2023-01-01', score: 780 },
      { date: '2023-02-01', score: 790 },
      { date: '2023-03-01', score: 785 },
      { date: '2023-04-01', score: 800 },
      { date: '2023-05-01', score: 810 },
      { date: '2023-06-01', score: 820 },
    ],
    featureContributions: [
      { feature: 'Revenue Growth', value: 0.3 },
      { feature: 'Profit Margin', value: 0.4 },
      { feature: 'Debt-to-Equity', value: -0.1 },
      { feature: 'Market Sentiment', value: 0.2 },
      { feature: 'Cash Flow', value: 0.2 },
    ],
    recentEvents: [
      { date: '2023-06-15', headline: 'Apple unveils new Vision Pro headset', source: 'Reuters' },
      { date: '2023-05-20', headline: 'Record iPhone sales boost quarterly earnings', source: 'Bloomberg' },
    ],
  },
  {
    id: 'msft',
    name: 'Microsoft Corp.',
    assetClass: 'Technology',
    score: 850,
    longTermTrend: 'up',
    scoreHistory: [
      { date: '2023-01-01', score: 810 },
      { date: '2023-02-01', score: 820 },
      { date: '2023-03-01', score: 835 },
      { date: '2023-04-01', score: 830 },
      { date: '2023-05-01', score: 845 },
      { date: '2023-06-01', score: 850 },
    ],
    featureContributions: [
      { feature: 'Cloud Revenue', value: 0.5 },
      { feature: 'AI Investments', value: 0.3 },
      { feature: 'Regulatory Scrutiny', value: -0.2 },
      { feature: 'Enterprise Sales', value: 0.4 },
    ],
    recentEvents: [
      { date: '2023-06-10', headline: 'Microsoft closes Activision Blizzard deal', source: 'The Verge' },
      { date: '2023-05-05', headline: 'Azure growth continues to outpace competitors', source: 'TechCrunch' },
    ],
  },
  {
    id: 'tsla',
    name: 'Tesla, Inc.',
    assetClass: 'Automotive',
    score: 680,
    longTermTrend: 'stable',
    scoreHistory: [
      { date: '2023-01-01', score: 710 },
      { date: '2023-02-01', score: 690 },
      { date: '2023-03-01', score: 700 },
      { date: '2023-04-01', score: 670 },
      { date: '2023-05-01', score: 685 },
      { date: '2023-06-01', score: 680 },
    ],
    featureContributions: [
      { feature: 'Vehicle Deliveries', value: 0.4 },
      { feature: 'Production Costs', value: -0.3 },
      { feature: 'Competition', value: -0.2 },
      { feature: 'CEO sentiment', value: -0.1 },
      { feature: 'Energy Storage Growth', value: 0.2 },
    ],
    recentEvents: [
      { date: '2023-06-18', headline: 'Tesla announces price cuts on Model 3 and Y', source: 'CNBC' },
      { date: '2023-04-30', headline: 'Giga Berlin production ramp-up slower than expected', source: 'Reuters' },
    ],
  },
  {
    id: 'jpm',
    name: 'JPMorgan Chase & Co.',
    assetClass: 'Financials',
    score: 790,
    longTermTrend: 'down',
    scoreHistory: [
      { date: '2023-01-01', score: 815 },
      { date: '2023-02-01', score: 810 },
      { date: '2023-03-01', score: 800 },
      { date: '2023-04-01', score: 795 },
      { date: '2023-05-01', score: 792 },
      { date: '2023-06-01', score: 790 },
    ],
    featureContributions: [
      { feature: 'Net Interest Margin', value: -0.2 },
      { feature: 'Loan Growth', value: 0.1 },
      { feature: 'Investment Banking Fees', value: -0.3 },
      { feature: 'Asset Quality', value: 0.2 },
    ],
    recentEvents: [
      { date: '2023-06-01', headline: 'Fed rate hikes pressure bank margins', source: 'Wall Street Journal' },
      { date: '2023-05-15', headline: 'JPMorgan acquires First Republic Bank in government-led deal', source: 'Financial Times' },
    ],
  },
];

export const ALERTS: Alert[] = [
  { id: '1', issuerName: 'Tesla, Inc.', message: 'Score dropped 30 points due to price cuts.', date: '2023-06-18', severity: 'high' },
  { id: '2', issuerName: 'Microsoft Corp.', message: 'Score increased 15 points after Activision deal closure.', date: '2023-06-10', severity: 'medium' },
  { id: '3', issuerName: 'JPMorgan Chase & Co.', message: 'Negative trend detected over last 90 days.', date: '2023-06-01', severity: 'low' },
];

export const getIssuers = async (): Promise<Issuer[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(ISSUERS);
    }, 500);
  });
};

export const getAlerts = async (): Promise<Alert[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(ALERTS);
    }, 500);
  });
};
