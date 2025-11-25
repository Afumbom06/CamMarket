import { Checkbox } from './ui/checkbox';
import { regions } from '../lib/mock-data';

interface RegionFilterProps {
  language: 'en' | 'fr';
  selectedRegions: string[];
  onToggle: (regionId: string) => void;
}

export function RegionFilter({ language, selectedRegions, onToggle }: RegionFilterProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">
        {language === 'en' ? 'Region' : 'Région'}
      </h3>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {regions.map((region) => (
          <label 
            key={region.id}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          >
            <Checkbox
              checked={selectedRegions.includes(region.id)}
              onCheckedChange={() => onToggle(region.id)}
            />
            <span className="text-sm flex-1">
              {language === 'en' ? region.name : region.nameFr}
            </span>
            <span className="text-xs text-gray-500">
              ({region.productCount})
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
