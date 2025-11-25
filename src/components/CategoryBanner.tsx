import { ChevronRight } from 'lucide-react';
import { categories } from '../lib/mock-data';
import { getCategoryIcon } from '../lib/category-icons';

interface CategoryBannerProps {
  categoryId: string;
  language: 'en' | 'fr';
  onNavigateHome: () => void;
}

export function CategoryBanner({ categoryId, language, onNavigateHome }: CategoryBannerProps) {
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) return null;

  const IconComponent = getCategoryIcon(category.icon);

  return (
    <div className="relative h-64 md:h-80 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${category.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/90 mb-4">
          <button onClick={onNavigateHome} className="hover:text-white transition-colors">
            {language === 'en' ? 'Home' : 'Accueil'}
          </button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={onNavigateHome} className="hover:text-white transition-colors">
            {language === 'en' ? 'Categories' : 'Catégories'}
          </button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">
            {language === 'en' ? category.name : category.nameFr}
          </span>
        </div>

        {/* Category Title */}
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
            <IconComponent className="h-12 w-12 md:h-16 md:w-16 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl text-white">
            {language === 'en' ? category.name : category.nameFr}
          </h1>
        </div>

        {/* Category Description */}
        {category.description && (
          <p className="text-white/90 text-lg max-w-2xl">
            {language === 'en' ? category.description : category.descriptionFr}
          </p>
        )}
      </div>
    </div>
  );
}
