import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { categories } from '../lib/mock-data';
import { getCategoryIcon } from '../lib/category-icons';

interface CategorySectionProps {
  language: 'en' | 'fr';
  onCategoryClick?: (categoryId: string) => void;
}

export function CategorySection({ language, onCategoryClick }: CategorySectionProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl">
            {language === 'en' ? 'Popular Categories' : 'Catégories Populaires'}
          </h2>
          <Button variant="outline" className="gap-2">
            {language === 'en' ? 'View All' : 'Voir Tout'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const IconComponent = getCategoryIcon(category.icon);
            return (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => onCategoryClick?.(category.id)}
              >
                <div className="relative overflow-hidden aspect-square">
                  <ImageWithFallback
                    src={category.image}
                    alt={language === 'en' ? category.name : category.nameFr}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white transform group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mb-2 group-hover:bg-white/30 transition-all duration-300">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <span className="text-sm text-center px-2">
                      {language === 'en' ? category.name : category.nameFr}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
