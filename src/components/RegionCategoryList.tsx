import { RegionCategoryCard } from './RegionCategoryCard';
import { categories, products } from '../lib/mock-data';

interface RegionCategoryListProps {
  regionId: string;
  language: 'en' | 'fr';
  onCategoryClick: (categoryId: string) => void;
}

export function RegionCategoryList({ regionId, language, onCategoryClick }: RegionCategoryListProps) {
  // Get categories that have products in this region
  const availableCategories = categories.filter(category => {
    const categoryProducts = products.filter(
      p => p.region === regionId && p.category === category.id
    );
    return categoryProducts.length > 0;
  });

  if (availableCategories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {language === 'en' ? 'No categories available in this region' : 'Aucune catégorie disponible dans cette région'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {availableCategories.map((category) => {
        const productCount = products.filter(
          p => p.region === regionId && p.category === category.id
        ).length;

        return (
          <RegionCategoryCard
            key={category.id}
            category={category}
            language={language}
            regionId={regionId}
            productCount={productCount}
            onClick={onCategoryClick}
          />
        );
      })}
    </div>
  );
}
