"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { FeatureContribution } from '@/lib/types'

interface FeatureImportanceChartProps {
  data: FeatureContribution[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="font-bold">{label}</div>
        <div className="text-sm">
          Contribution: <span className="font-medium">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

export function FeatureImportanceChart({ data }: FeatureImportanceChartProps) {
  const chartData = data.map(item => ({
    name: item.feature,
    value: item.value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Contribution Analysis</CardTitle>
        <CardDescription>Impact of different features on the credit score.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={chartData} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }}/>
              <Bar dataKey="value" barSize={20}>
                {chartData.map((entry, index) => (
                  <rect key={`bar-${index}`} {...entry} fill={entry.value > 0 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
