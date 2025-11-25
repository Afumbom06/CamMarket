import { Card, CardContent } from './ui/card';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getCategoryIcon } from '../lib/category-icons';

interface RegionCategoryCardProps {
  category: {
    id: string;
    name: string;
    nameFr: string;
    icon: string;
    image: string;
  };
  language: 'en' | 'fr';
  regionId: string;
  productCount: number;
  onClick: (categoryId: string) => void;
}

export function RegionCategoryCard({ 
  category, 
  language, 
  regionId,
  productCount,
  onClick 
}: RegionCategoryCardProps) {
  const IconComponent = getCategoryIcon(category.icon);
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
      onClick={() => onClick(category.id)}
    >
      <div className="relative h-32 overflow-hidden">
        <ImageWithFallback
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <IconComponent className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs">
          {productCount}+
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="group-hover:text-green-600 transition-colors">
            {language === 'fr' ? category.nameFr : category.name}
          </h3>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
        </div>
      </CardContent>
    </Card>
  );
}
