import { useState } from 'react';
import { ArrowLeft, Heart, Share2, Star, Package, ShieldCheck, MessageCircle, AlertCircle, PenSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import { products, regions } from '../lib/mock-data';
import { toast } from 'sonner@2.0.3';

// Import new components
import { ImageGallery } from './ProductDetails/ImageGallery';
import { PriceTag } from './ProductDetails/PriceTag';
import { ProductLocation } from './ProductDetails/ProductLocation';
import { DeliveryOptions } from './ProductDetails/DeliveryOptions';
import { DescriptionSection } from './ProductDetails/DescriptionSection';
import { RatingsHeader } from './ProductDetails/RatingsHeader';
import { ReviewList } from './ProductDetails/ReviewList';
import { ReviewModal } from './ProductDetails/ReviewModal';
import { SellerProductsCarousel } from './ProductDetails/SellerProductsCarousel';
import { SimilarProducts } from './ProductDetails/SimilarProducts';
import { QuantitySelector } from './ProductDetails/QuantitySelector';
import { AddToCartButton } from './ProductDetails/AddToCartButton';
import { BuyNowBarMobile } from './ProductDetails/BuyNowBarMobile';

interface ProductDetailPageProps {
  productId: number;
  language: 'en' | 'fr';
  onBack: () => void;
  onAddToCart: (productId: number, quantity: number) => void;
  onToggleWishlist: (productId: number) => void;
  isInWishlist: boolean;
  onProductClick?: (productId: number) => void;
}

// Enhanced mock reviews with more data
const reviews = [
  {
    id: 1,
    user: 'Jean Pierre Mbarga',
    rating: 5,
    comment: 'Excellent product! Fast delivery and good quality. The seller was very responsive and helpful.',
    commentFr: 'Excellent produit! Livraison rapide et bonne qualité. Le vendeur était très réactif et serviable.',
    date: '2025-11-10',
    verified: true,
    helpful: 12
  },
  {
    id: 2,
    user: 'Marie Dupont',
    rating: 4,
    comment: 'Good value for money. Recommended! Minor packaging issue but product is perfect.',
    commentFr: 'Bon rapport qualité-prix. Recommandé! Petit problème d\'emballage mais le produit est parfait.',
    date: '2025-11-08',
    verified: true,
    helpful: 8
  },
  {
    id: 3,
    user: 'Paul Ndongo',
    rating: 5,
    comment: 'Perfect! Exactly as described. Will buy again from this seller.',
    commentFr: 'Parfait! Exactement comme décrit. Je rachèterai chez ce vendeur.',
    date: '2025-11-05',
    verified: true,
    helpful: 15
  },
  {
    id: 4,
    user: 'Aminata Kamara',
    rating: 4,
    comment: 'Very satisfied with the purchase. Delivery was quick and the product quality is great.',
    commentFr: 'Très satisfaite de l\'achat. La livraison était rapide et la qualité du produit est excellente.',
    date: '2025-11-01',
    verified: false,
    helpful: 5
  },
  {
    id: 5,
    user: 'Claude Tchamba',
    rating: 5,
    comment: 'Outstanding quality! Better than expected. Highly recommend this product.',
    commentFr: 'Qualité exceptionnelle! Mieux que prévu. Je recommande vivement ce produit.',
    date: '2025-10-28',
    verified: true,
    helpful: 20
  }
];

// Rating breakdown
const ratingBreakdown = {
  5: 3,
  4: 2,
  3: 0,
  2: 0,
  1: 0
};

export function ProductDetailPage({ 
  productId, 
  language, 
  onBack, 
  onAddToCart, 
  onToggleWishlist,
  isInWishlist,
  onProductClick
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading state
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {language === 'en' ? 'Product not found' : 'Produit non trouvé'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const regionData = regions.find(r => r.id === product.region);
  
  // Get similar products (same category, different product)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  // Get more products from same seller
  const sellerProducts = products
    .filter(p => p.seller === product.seller && p.id !== product.id)
    .slice(0, 6);

  // Mock multiple images (in real app, these would come from API)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  // Stock status
  const getStockStatus = () => {
    if (product.stock === 0) {
      return {
        label: language === 'en' ? 'Out of Stock' : 'Rupture de Stock',
        color: 'bg-red-100 text-red-700',
        icon: Package
      };
    } else if (product.stock < 10) {
      return {
        label: language === 'en' ? 'Limited Stock' : 'Stock Limité',
        color: 'bg-amber-100 text-amber-700',
        icon: Package
      };
    } else {
      return {
        label: language === 'en' ? 'In Stock' : 'En Stock',
        color: 'bg-green-100 text-green-700',
        icon: Package
      };
    }
  };

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;

  // Calculate average rating
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  // Mock city data (in real app, this would come from seller profile)
  const getCityForRegion = (regionId: string) => {
    const cities: { [key: string]: string } = {
      'centre': 'Yaoundé',
      'littoral': 'Douala',
      'west': 'Bafoussam',
      'southwest': 'Buea',
      'northwest': 'Bamenda',
      'north': 'Garoua',
      'adamawa': 'Ngaoundéré',
      'east': 'Bertoua',
      'south': 'Kribi',
      'far-north': 'Maroua'
    };
    return cities[regionId] || 'Cameroon';
  };

  const handleShare = () => {
    toast.success(
      language === 'en' 
        ? 'Product link copied to clipboard!' 
        : 'Lien du produit copié dans le presse-papiers!'
    );
  };

  const handleBuyNow = () => {
    onAddToCart(product.id, quantity);
    toast.success(
      language === 'en' 
        ? 'Proceeding to checkout...' 
        : 'Passage à la caisse...'
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-12 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-5 w-5" />
              {language === 'en' ? 'Back' : 'Retour'}
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onToggleWishlist(product.id)}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <ImageGallery
              images={productImages}
              productName={language === 'en' ? product.name : product.nameFr}
              discount={product.discount}
              isFlashSale={product.isFlashSale}
              language={language}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 space-y-4">
              {/* Product Name */}
              <h1 className="text-3xl">
                {language === 'en' ? product.name : product.nameFr}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span>{product.rating}</span>
                <span className="text-gray-500">
                  ({reviews.length} {language === 'en' ? 'reviews' : 'avis'})
                </span>
              </div>

              <Separator />

              {/* Price */}
              <PriceTag 
                price={product.price} 
                discount={product.discount} 
                size="lg"
              />

              {/* Stock Status */}
              <Badge className={stockStatus.color}>
                <StockIcon className="h-3 w-3 mr-1" />
                {stockStatus.label}
                {product.stock > 0 && product.stock < 10 && (
                  <span className="ml-1">({product.stock} {language === 'en' ? 'left' : 'restant'})</span>
                )}
              </Badge>

              <Separator />

              {/* Quantity Selector */}
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                maxStock={product.stock}
                language={language}
              />

              {/* Action Buttons - Desktop */}
              <div className="hidden lg:flex gap-3">
                <AddToCartButton
                  productId={product.id}
                  quantity={quantity}
                  stock={product.stock}
                  onAddToCart={onAddToCart}
                  language={language}
                  fullWidth
                />
                <Button 
                  size="lg" 
                  variant="default"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {language === 'en' ? 'Buy Now' : 'Acheter Maintenant'}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>{language === 'en' ? 'Verified seller' : 'Vendeur vérifié'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="h-4 w-4 text-green-600" />
                  <span>{language === 'en' ? 'Authentic product' : 'Produit authentique'}</span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback 
                      style={{ backgroundColor: regionData?.color }}
                      className="text-white"
                    >
                      {product.seller.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p>{product.seller}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.rating} {language === 'en' ? 'rating' : 'note'}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {language === 'en' ? 'Chat' : 'Discuter'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            {regionData && (
              <ProductLocation
                region={regionData}
                city={getCityForRegion(product.region)}
                language={language}
              />
            )}

            {/* Delivery Options */}
            <DeliveryOptions
              options={product.deliveryOptions}
              language={language}
            />
          </div>
        </div>

        {/* Description Section */}
        <DescriptionSection
          description={
            language === 'en' 
              ? (product.description || 'This is a high-quality product sourced directly from local vendors in Cameroon. All products are carefully selected and verified to ensure the best quality for our customers. Perfect for everyday use and comes with a satisfaction guarantee.')
              : (product.descriptionFr || 'Ceci est un produit de haute qualité provenant directement de vendeurs locaux au Cameroun. Tous les produits sont soigneusement sélectionnés et vérifiés pour garantir la meilleure qualité à nos clients. Parfait pour un usage quotidien et livré avec une garantie de satisfaction.')
          }
          language={language}
        />

        {/* Reviews Section */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl">
                {language === 'en' ? 'Customer Reviews' : 'Avis des Clients'}
              </h3>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setIsReviewModalOpen(true)}
              >
                <PenSquare className="h-4 w-4" />
                {language === 'en' ? 'Write a Review' : 'Écrire un Avis'}
              </Button>
            </div>

            <RatingsHeader
              averageRating={averageRating}
              totalReviews={reviews.length}
              ratingBreakdown={ratingBreakdown}
              language={language}
            />

            <ReviewList reviews={reviews} language={language} />
          </CardContent>
        </Card>

        {/* More from this Seller */}
        {sellerProducts.length > 0 && (
          <SellerProductsCarousel
            products={sellerProducts}
            sellerName={product.seller}
            language={language}
            onProductClick={onProductClick}
          />
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <SimilarProducts
            products={similarProducts}
            language={language}
            onProductClick={onProductClick}
          />
        )}
      </div>

      {/* Mobile Bottom Bar */}
      <BuyNowBarMobile
        productId={product.id}
        price={product.price}
        discount={product.discount}
        stock={product.stock}
        onAddToCart={onAddToCart}
        onBuyNow={handleBuyNow}
        language={language}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productName={language === 'en' ? product.name : product.nameFr}
        language={language}
      />
    </div>
  );
}
