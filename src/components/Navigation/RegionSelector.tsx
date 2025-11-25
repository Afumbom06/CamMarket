import { MapPin, Check } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { regions } from '../../lib/mock-data';
import { ScrollArea } from '../ui/scroll-area';

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (regionId: string) => void;
  language: 'en' | 'fr';
  variant?: 'default' | 'compact';
}

export function RegionSelector({ 
  selectedRegion, 
  onRegionChange, 
  language,
  variant = 'default' 
}: RegionSelectorProps) {
  const selectedRegionData = selectedRegion === 'all' 
    ? { 
        name: 'All Regions', 
        nameFr: 'Toutes les Régions', 
        id: 'all', 
        color: '#10b981' 
      }
    : regions.find(r => r.id === selectedRegion);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`gap-2 ${variant === 'compact' ? 'h-9' : ''}`}
        >
          <MapPin 
            className="h-4 w-4" 
            style={{ color: selectedRegionData?.color }} 
          />
          <span className="hidden md:inline">
            {language === 'en' ? selectedRegionData?.name : selectedRegionData?.nameFr}
          </span>
          <span className="md:hidden">
            {language === 'en' ? 'Region' : 'Région'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <div className="px-2 py-1.5 text-sm text-gray-500">
          {language === 'en' ? 'Select Region' : 'Sélectionner la Région'}
        </div>
        <DropdownMenuSeparator />
        
        <ScrollArea className="h-[350px]">
          <DropdownMenuItem 
            onClick={() => onRegionChange('all')}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: '#10b981' }}
                />
                {language === 'en' ? 'All Regions' : 'Toutes les Régions'}
              </div>
              {selectedRegion === 'all' && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {regions.map((region) => (
            <DropdownMenuItem
              key={region.id}
              onClick={() => onRegionChange(region.id)}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: region.color }}
                  />
                  <span>{language === 'en' ? region.name : region.nameFr}</span>
                </div>
                {selectedRegion === region.id && (
                  <Check className="h-4 w-4 text-green-600" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
