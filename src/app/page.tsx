"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, Settings } from 'lucide-react';

import { getIssuers } from '@/lib/mock-data';
import type { Issuer } from '@/lib/types';
import { IssuerCard } from '@/components/dashboard/issuer-card';
import { IssuerDetails } from '@/components/dashboard/issuer-details';
import { Filters } from '@/components/dashboard/filters';
import { Alerts } from '@/components/dashboard/alerts';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [issuers, setIssuers] = useState<Issuer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIssuer, setSelectedIssuer] = useState<Issuer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [assetClassFilter, setAssetClassFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getIssuers();
      setIssuers(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleViewDetails = (issuer: Issuer) => {
    setSelectedIssuer(issuer);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setTimeout(() => setSelectedIssuer(null), 300);
  };

  const assetClasses = useMemo(() => [...new Set(issuers.map(i => i.assetClass))], [issuers]);

  const filteredIssuers = useMemo(() => {
    if (assetClassFilter === 'all') {
      return issuers;
    }
    return issuers.filter(i => i.assetClass === assetClassFilter);
  }, [assetClassFilter, issuers]);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent className="p-0">
          <div className="space-y-8 py-4">
            <Filters 
              assetClasses={assetClasses}
              selectedAssetClass={assetClassFilter}
              onAssetClassChange={setAssetClassFilter}
            />
            <SidebarSeparator />
            <Alerts />
          </div>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://placehold.co/40x40" data-ai-hint="profile picture" />
                <AvatarFallback>FA</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-sidebar-foreground">Financial Analyst</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell />
            </Button>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredIssuers.map((issuer) => (
                <IssuerCard key={issuer.id} issuer={issuer} onDetailsClick={handleViewDetails} />
              ))}
            </div>
          )}
        </main>
      </SidebarInset>

      <IssuerDetails
        issuer={selectedIssuer}
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
      />
    </SidebarProvider>
  );
}

const CardSkeleton = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);
