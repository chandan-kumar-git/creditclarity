# **App Name**: CreditClarity

## Core Features:

- Event Extraction: Ingest real-time financial news headlines and extract credit-relevant events using NLP.  This component acts as a tool, passing identified events to the scoring engine for immediate creditworthiness re-evaluation.
- Adaptive Scoring: Calculate and display issuer-level and asset-class-level creditworthiness scores, updated in near real-time. Provides feature contribution breakdowns and trend indicators.
- Live Score Dashboard: Display live-updating scores and trends for each issuer in a responsive, interactive dashboard.
- Visualized Explanations: Provide visualizations of feature importances and recent affecting events in the dashboard.
- Interactive Filters: Enable filtering by asset class, issuer, event type, and score change magnitude to allow focused analysis.
- Automated Alerts: Implement alerts and notifications for sudden score changes or outliers to inform analysts of significant events.
- Cloud Deployment: Deploy the application using Docker for reproducibility and cloud deployment on Firebase Hosting.

## Style Guidelines:

- Primary color: Deep sky blue (#3EB489) to suggest trustworthiness and reliability in financial data.
- Background color: Light grayish-blue (#E8F5F4) to ensure a clean and non-distracting interface.
- Accent color: Light Yellow (#F4E83E) to highlight key metrics and actionable items.
- Body and headline font: 'Inter', a sans-serif, for clear readability and a modern aesthetic.
- Use clean, simple line icons to represent different data sources, event types, and asset classes.
- Employ a clear, grid-based layout for presenting scores, trends, and event information logically.
- Use subtle transitions and animations to provide feedback on user interactions and data updates.