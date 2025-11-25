import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { ProductCard } from '../ProductCard';
import { Product } from '../../lib/mock-data';

interface SimilarProductsProps {
  products: Product[];
  language: 'en' | 'fr';
  onProductClick?: (productId: number) => void;
  onViewMore?: () => void;
}

export function SimilarProducts({ 
  products, 
  language,
  onProductClick,
  onViewMore 
}: SimilarProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-green-600" />
          {language === 'en' ? 'You May Also Like' : 'Vous Pourriez Aussi Aimer'}
        </h3>
        
        {onViewMore && (
          <Button variant="ghost" onClick={onViewMore} className="gap-2">
            {language === 'en' ? 'View More' : 'Voir Plus'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <div 
            key={product.id}
            onClick={() => onProductClick?.(product.id)}
          >
            <ProductCard product={product} language={language} />
          </div>
        ))}
      </div>
    </div>
  );
}
