"use client";

import React, { useState, useMemo } from 'react';
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

import { ISSUERS } from '@/lib/mock-data';
import type { Issuer } from '@/lib/types';
import { IssuerCard } from '@/components/dashboard/issuer-card';
import { IssuerDetails } from '@/components/dashboard/issuer-details';
import { Filters } from '@/components/dashboard/filters';
import { Alerts } from '@/components/dashboard/alerts';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

export default function DashboardPage() {
  const [selectedIssuer, setSelectedIssuer] = useState<Issuer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [assetClassFilter, setAssetClassFilter] = useState('all');

  const handleViewDetails = (issuer: Issuer) => {
    setSelectedIssuer(issuer);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    // Delay clearing to allow for exit animation
    setTimeout(() => setSelectedIssuer(null), 300);
  };

  const assetClasses = useMemo(() => [...new Set(ISSUERS.map(i => i.assetClass))], []);

  const filteredIssuers = useMemo(() => {
    if (assetClassFilter === 'all') {
      return ISSUERS;
    }
    return ISSUERS.filter(i => i.assetClass === assetClassFilter);
  }, [assetClassFilter]);

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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredIssuers.map((issuer) => (
              <IssuerCard key={issuer.id} issuer={issuer} onDetailsClick={handleViewDetails} />
            ))}
          </div>
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
