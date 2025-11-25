import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { PriceRangeFilter } from './PriceRangeFilter';
import { RegionFilter } from './RegionFilter';
import { RatingFilter } from './RatingFilter';
import { DeliveryFilter } from './DeliveryFilter';
import { ConditionFilter } from './ConditionFilter';

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  selectedRegions: string[];
  selectedRating: number;
  selectedDelivery: string[];
  selectedCondition: 'all' | 'new' | 'used';
}

interface FilterSidebarProps {
  language: 'en' | 'fr';
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
  totalProducts?: number;
}

export function FilterSidebar({ 
  language, 
  filters, 
  onFiltersChange, 
  onClose,
  isMobile = false,
  totalProducts = 0
}: FilterSidebarProps) {
  
  const handlePriceApply = (min: number, max: number) => {
    onFiltersChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const handleRegionToggle = (regionId: string) => {
    const newRegions = filters.selectedRegions.includes(regionId)
      ? filters.selectedRegions.filter(r => r !== regionId)
      : [...filters.selectedRegions, regionId];
    onFiltersChange({ ...filters, selectedRegions: newRegions });
  };

  const handleRatingSelect = (rating: number) => {
    onFiltersChange({ ...filters, selectedRating: rating });
  };

  const handleDeliveryToggle = (option: string) => {
    const newOptions = filters.selectedDelivery.includes(option)
      ? filters.selectedDelivery.filter(o => o !== option)
      : [...filters.selectedDelivery, option];
    onFiltersChange({ ...filters, selectedDelivery: newOptions });
  };

  const handleConditionSelect = (condition: 'all' | 'new' | 'used') => {
    onFiltersChange({ ...filters, selectedCondition: condition });
  };

  const handleReset = () => {
    onFiltersChange({
      minPrice: 0,
      maxPrice: 500000,
      selectedRegions: [],
      selectedRating: 0,
      selectedDelivery: [],
      selectedCondition: 'all'
    });
  };

  const hasActiveFilters = 
    filters.minPrice > 0 || 
    filters.maxPrice < 500000 || 
    filters.selectedRegions.length > 0 || 
    filters.selectedRating > 0 || 
    filters.selectedDelivery.length > 0 || 
    filters.selectedCondition !== 'all';

  return (
    <div className={`bg-white ${isMobile ? 'h-full' : 'rounded-lg border'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">
          {language === 'en' ? 'Filters' : 'Filtres'}
        </h2>
        {isMobile && onClose && (
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filters */}
      <ScrollArea className={isMobile ? 'h-[calc(100vh-180px)]' : 'h-auto'}>
        <div className="p-4 space-y-6">
          {/* Price Range */}
          <div>
            <PriceRangeFilter
              language={language}
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onApply={handlePriceApply}
            />
          </div>

          <Separator />

          {/* Region Filter */}
          <div>
            <RegionFilter
              language={language}
              selectedRegions={filters.selectedRegions}
              onToggle={handleRegionToggle}
            />
          </div>

          <Separator />

          {/* Rating Filter */}
          <div>
            <RatingFilter
              language={language}
              selectedRating={filters.selectedRating}
              onSelect={handleRatingSelect}
            />
          </div>

          <Separator />

          {/* Condition Filter */}
          <div>
            <ConditionFilter
              language={language}
              selectedCondition={filters.selectedCondition}
              onSelect={handleConditionSelect}
            />
          </div>

          <Separator />

          {/* Delivery Filter */}
          <div>
            <DeliveryFilter
              language={language}
              selectedOptions={filters.selectedDelivery}
              onToggle={handleDeliveryToggle}
            />
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleReset}
          >
            {language === 'en' ? 'Reset Filters' : 'Réinitialiser'}
          </Button>
        )}
        {isMobile && (
          <Button 
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            onClick={onClose}
          >
            {language === 'en' 
              ? `Show ${totalProducts} Products` 
              : `Afficher ${totalProducts} Produits`}
          </Button>
        )}
      </div>
    </div>
  );
}
