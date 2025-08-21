"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  className?: string;
}

const getScoreColor = (score: number, maxScore: number) => {
  const percentage = (score / maxScore) * 100;
  if (percentage < 60) return 'text-destructive';
  if (percentage < 80) return 'text-accent';
  return 'text-primary';
};

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, maxScore = 1000, className }) => {
  const radius = 50;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (score / maxScore) * circumference;
  const colorClass = getScoreColor(score, maxScore);

  return (
    <div className={cn('relative w-32 h-32', className)}>
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 120 120"
        className="transform -rotate-90"
      >
        <circle
          stroke="hsl(var(--border))"
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          className={cn('transition-all duration-1000 ease-out', colorClass)}
          stroke="currentColor"
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('text-3xl font-bold text-foreground', colorClass)}>{score}</span>
        <span className="text-xs text-muted-foreground">Score</span>
      </div>
    </div>
  );
};

export default ScoreGauge;
