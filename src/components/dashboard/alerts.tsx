"use client";

import { AlertTriangle, Bell, Info } from "lucide-react";
import { getAlerts } from "@/lib/mock-data";
import { Badge } from "../ui/badge";
import type { Alert } from "@/lib/types";
import { useEffect, useState } from "react";

const severityIcons = {
  high: <AlertTriangle className="h-4 w-4 text-destructive" />,
  medium: <Bell className="h-4 w-4 text-accent-foreground" />,
  low: <Info className="h-4 w-4 text-muted-foreground" />,
}

const severityBadge = {
    high: 'destructive',
    medium: 'default',
    low: 'secondary',
} as const;


export function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getAlerts();
      setAlerts(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);


  return (
    <div className="space-y-4">
        <div className="px-2 text-sm font-semibold text-foreground/70">Alerts</div>
      {isLoading ? (
        <div className="px-2 text-sm text-muted-foreground">Loading alerts...</div>
      ) : (
        alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 px-2">
              <div className="mt-1">{severityIcons[alert.severity]}</div>
              <div className="flex-1">
                  <p className="text-sm font-medium leading-none">{alert.issuerName}</p>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                   <Badge variant={severityBadge[alert.severity]} className="mt-1 capitalize">{alert.severity}</Badge>
              </div>
            </div>
        ))
      )}
    </div>
  );
}
