"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface FiltersProps {
  assetClasses: string[];
  selectedAssetClass: string;
  onAssetClassChange: (value: string) => void;
}

export function Filters({ assetClasses, selectedAssetClass, onAssetClassChange }: FiltersProps) {
  return (
    <div className="space-y-6 px-2">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground/70">Filters</label>
        <Select value={selectedAssetClass} onValueChange={onAssetClassChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Asset Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Asset Classes</SelectItem>
            {assetClasses.map((ac) => (
              <SelectItem key={ac} value={ac}>{ac}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label htmlFor="score-range">Score Range</Label>
        <Slider defaultValue={[200, 850]} max={1000} min={0} step={10} id="score-range" />
      </div>
      
       <div className="space-y-4">
        <Label htmlFor="change-magnitude">Score Change Magnitude</Label>
        <Slider defaultValue={[20]} max={100} min={0} step={5} id="change-magnitude" />
      </div>
    </div>
  )
}
