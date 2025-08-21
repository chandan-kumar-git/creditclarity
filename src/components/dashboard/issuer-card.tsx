"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ScoreGauge from './score-gauge'
import type { Issuer } from '@/lib/types'
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'

interface IssuerCardProps {
  issuer: Issuer
  onDetailsClick: (issuer: Issuer) => void
}

const TrendIcon = ({ trend }: { trend: Issuer['longTermTrend'] }) => {
  if (trend === 'up') return <ArrowUpRight className="h-4 w-4 text-primary" />;
  if (trend === 'down') return <ArrowDownRight className="h-4 w-4 text-destructive" />;
  return <ArrowRight className="h-4 w-4 text-muted-foreground" />;
};

export function IssuerCard({ issuer, onDetailsClick }: IssuerCardProps) {
  return (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{issuer.name}</CardTitle>
                <CardDescription>{issuer.assetClass}</CardDescription>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground capitalize">
                <TrendIcon trend={issuer.longTermTrend} />
                <span>{issuer.longTermTrend}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-around gap-4">
        <ScoreGauge score={issuer.score} />
        <div className="w-1/2 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={issuer.scoreHistory} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              />
              <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onDetailsClick(issuer)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
