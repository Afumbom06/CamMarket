import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { regions, products } from '../lib/mock-data';

interface WishlistPageProps {
  language: 'en' | 'fr';
  wishlistItems: number[];
  onBack: () => void;
  onRemoveFromWishlist: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  onViewProduct: (productId: number) => void;
}

export function WishlistPage({ 
  language, 
  wishlistItems, 
  onBack, 
  onRemoveFromWishlist,
  onAddToCart,
  onViewProduct
}: WishlistPageProps) {
  const wishlistProducts = products.filter(p => wishlistItems.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-5 w-5" />
                {language === 'en' ? 'Back' : 'Retour'}
              </Button>
              <div>
                <h1 className="text-xl">
                  <Heart className="h-5 w-5 inline mr-2 fill-red-500 text-red-500" />
                  {language === 'en' ? 'My Wishlist' : 'Ma Liste de Souhaits'}
                </h1>
                <p className="text-sm text-gray-500">
                  {wishlistProducts.length} {language === 'en' ? 'items' : 'articles'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {wishlistProducts.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-2xl mb-2">
                {language === 'en' ? 'Your wishlist is empty' : 'Votre liste de souhaits est vide'}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === 'en' 
                  ? 'Save items you love to buy them later'
                  : 'Enregistrez les articles que vous aimez pour les acheter plus tard'}
              </p>
              <Button onClick={onBack}>
                {language === 'en' ? 'Continue Shopping' : 'Continuer les Achats'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {wishlistProducts.map((product) => {
              const regionData = regions.find(r => r.id === product.region);
              const finalPrice = product.discount
                ? product.price - (product.price * product.discount) / 100
                : product.price;

              return (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div 
                        className="relative w-32 h-32 flex-shrink-0 cursor-pointer"
                        onClick={() => onViewProduct(product.id)}
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={language === 'en' ? product.name : product.nameFr}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {product.isFlashSale && product.discount && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div 
                          className="cursor-pointer"
                          onClick={() => onViewProduct(product.id)}
                        >
                          <h3 className="mb-2 line-clamp-2">
                            {language === 'en' ? product.name : product.nameFr}
                          </h3>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {product.seller} • {language === 'en' ? regionData?.name : regionData?.nameFr}
                          </p>

                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-xl text-green-600">
                              {finalPrice.toLocaleString()} FCFA
                            </span>
                            {product.discount && (
                              <span className="text-sm text-gray-400 line-through">
                                {product.price.toLocaleString()} FCFA
                              </span>
                            )}
                          </div>

                          <div className="text-sm mb-3">
                            {product.stock > 0 ? (
                              <span className="text-green-600">
                                ✓ {language === 'en' ? 'In Stock' : 'En Stock'}
                              </span>
                            ) : (
                              <span className="text-red-600">
                                {language === 'en' ? 'Out of Stock' : 'Rupture de Stock'}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="gap-2"
                            onClick={() => {
                              onAddToCart(product.id);
                              onRemoveFromWishlist(product.id);
                            }}
                            disabled={product.stock === 0}
                          >
                            <ShoppingCart className="h-4 w-4" />
                            {language === 'en' ? 'Add to Cart' : 'Ajouter au Panier'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="gap-2 text-red-600 hover:text-red-700"
                            onClick={() => onRemoveFromWishlist(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            {language === 'en' ? 'Remove' : 'Retirer'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
