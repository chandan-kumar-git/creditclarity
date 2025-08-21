"use client";

import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { FeatureImportanceChart } from './feature-importance-chart';
import { getExplanation } from '@/app/actions';
import type { Issuer } from '@/lib/types';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Calendar, Newspaper } from 'lucide-react';

interface IssuerDetailsProps {
  issuer: Issuer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IssuerDetails({ issuer, isOpen, onClose }: IssuerDetailsProps) {
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (issuer && isOpen) {
      setIsLoading(true);
      setExplanation('');
      getExplanation(issuer)
        .then(setExplanation)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [issuer, isOpen]);

  if (!issuer) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl p-0">
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader>
              <SheetTitle className="text-2xl">{issuer.name}</SheetTitle>
              <SheetDescription>
                Detailed credit analysis for {issuer.assetClass} sector.
              </SheetDescription>
            </SheetHeader>
            <Tabs defaultValue="summary" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary">AI Summary</TabsTrigger>
                <TabsTrigger value="features">Feature Analysis</TabsTrigger>
                <TabsTrigger value="events">Recent Events</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="mt-6">
                 <div className="rounded-lg border bg-card text-card-foreground p-4 space-y-4">
                    <h3 className="font-semibold">AI Generated Explanation</h3>
                    {isLoading && (
                        <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        </div>
                    )}
                    {explanation && <p className="text-sm text-muted-foreground">{explanation}</p>}
                 </div>
              </TabsContent>
              <TabsContent value="features" className="mt-6">
                <FeatureImportanceChart data={issuer.featureContributions} />
              </TabsContent>
              <TabsContent value="events" className="mt-6">
                <div className="space-y-6">
                  {issuer.recentEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Newspaper className="h-5 w-5 text-muted-foreground"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{event.headline}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date}</span>
                            </div>
                            <Badge variant="secondary">{event.source}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
