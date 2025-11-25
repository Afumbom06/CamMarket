import { MapPin, TrendingUp, Package } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { regions, products } from '../lib/mock-data';

interface RegionGridProps {
  language: 'en' | 'fr';
  onRegionClick: (regionId: string) => void;
}

export function RegionGrid({ language, onRegionClick }: RegionGridProps) {
  return (
    <>
      {/* Mobile Dropdown (shown on small screens) */}
      <div className="block md:hidden mb-4">
        <Select onValueChange={(value) => onRegionClick(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={language === 'en' ? 'Select a Region' : 'Sélectionner une Région'} />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => {
              const regionProducts = products.filter(p => p.region === region.id);
              return (
                <SelectItem key={region.id} value={region.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: region.color }}
                    />
                    <span>{language === 'en' ? region.name : region.nameFr}</span>
                    <span className="text-xs text-gray-500">({regionProducts.length})</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {regions.map((region) => {
          const regionProducts = products.filter(p => p.region === region.id);
          const productCount = regionProducts.length;

          return (
            <Card
              key={region.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 group overflow-hidden hover:-translate-y-1"
              onClick={() => onRegionClick(region.id)}
            >
              <div
                className="h-24 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${region.color}dd, ${region.color})`
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-white opacity-20 group-hover:scale-125 transition-transform duration-300" />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-white/20 text-white border-white/40">
                    {productCount}+
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="mb-2 text-center group-hover:text-green-600 transition-colors">
                  {language === 'en' ? region.name : region.nameFr}
                </h3>
                
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    <span>{productCount}</span>
                  </div>
                  {productCount > 0 && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-green-600">Active</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mobile Grid (shown on small screens as alternative to dropdown) */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {regions.map((region) => {
          const regionProducts = products.filter(p => p.region === region.id);
          const productCount = regionProducts.length;

          return (
            <Card
              key={region.id}
              className="cursor-pointer hover:shadow-md transition-all duration-300 group overflow-hidden"
              onClick={() => onRegionClick(region.id)}
            >
              <div
                className="h-16 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${region.color}dd, ${region.color})`
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-white opacity-20" />
                </div>
                <div className="absolute top-1 right-1">
                  <Badge className="bg-white/20 text-white border-white/40 text-xs px-1">
                    {productCount}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-2">
                <h3 className="text-xs text-center">
                  {language === 'en' ? region.name : region.nameFr}
                </h3>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
