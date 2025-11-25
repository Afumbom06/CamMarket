import { ProductCard } from './ProductCard';

interface Product {
  id: number;
  name: string;
  nameFr: string;
  price: number;
  region: string;
  category: string;
  image: string;
  seller: string;
  rating: number;
  stock: number;
  isFlashSale?: boolean;
  discount?: number;
}

interface ProductGridProps {
  products: Product[];
  language: 'en' | 'fr';
  onViewProduct: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  wishlistItems: number[];
}

export function ProductGrid({
  products,
  language,
  onViewProduct,
  onToggleWishlist,
  onAddToCart,
  wishlistItems
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🛍️</div>
        <h3 className="text-lg mb-2">
          {language === 'en' ? 'No products found' : 'Aucun produit trouvé'}
        </h3>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Try adjusting your filters or check back later' 
            : 'Essayez d\'ajuster vos filtres ou revenez plus tard'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          language={language}
          onViewProduct={onViewProduct}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
          isInWishlist={wishlistItems.includes(product.id)}
        />
      ))}
    </div>
  );
}
