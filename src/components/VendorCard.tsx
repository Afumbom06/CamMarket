import { Star, Package, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VendorCardProps {
  vendor: {
    id: number;
    name: string;
    nameFr?: string;
    region: string;
    rating: number;
    products: number;
    verified: boolean;
    badge: string;
    avatar?: string;
    description?: string;
    descriptionFr?: string;
  };
  language: 'en' | 'fr';
  onVisitShop?: (vendorId: number) => void;
}

export function VendorCard({ vendor, language, onVisitShop }: VendorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <ImageWithFallback
                src={vendor.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${vendor.name}`}
                alt={vendor.name}
                className="h-16 w-16 rounded-full border-2 border-gray-200 group-hover:border-green-500 transition-colors"
              />
              {vendor.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="line-clamp-1 group-hover:text-green-600 transition-colors">
                {language === 'fr' && vendor.nameFr ? vendor.nameFr : vendor.name}
              </h3>
              <Badge variant="secondary" className="shrink-0 text-xs">
                {vendor.badge}
              </Badge>
            </div>

            {vendor.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {language === 'fr' && vendor.descriptionFr ? vendor.descriptionFr : vendor.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{vendor.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Package className="h-4 w-4" />
                <span>{vendor.products} {language === 'en' ? 'products' : 'produits'}</span>
              </div>
            </div>

            {/* Button */}
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => onVisitShop?.(vendor.id)}
            >
              {language === 'en' ? 'Visit Shop' : 'Visiter la Boutique'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
