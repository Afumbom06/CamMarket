import { ArrowLeft, MapPin, Package, Store, TrendingUp, Flag } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RegionCategoryList } from './RegionCategoryList';
import { VendorCarousel } from './VendorCarousel';
import { ProductCarousel } from './ProductCarousel';
import { DealsCarousel } from './DealsCarousel';
import { ProductGrid } from './ProductGrid';
import { regions, vendors, products } from '../lib/mock-data';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface RegionDetailsPageProps {
  regionId: string;
  language: 'en' | 'fr';
  onBack: () => void;
  onViewProduct: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  wishlistItems: number[];
}

export function RegionDetailsPage({
  regionId,
  language,
  onBack,
  onViewProduct,
  onToggleWishlist,
  onAddToCart,
  wishlistItems
}: RegionDetailsPageProps) {
  const [viewMode, setViewMode] = useState<'featured' | 'all'>('featured');
  const region = regions.find(r => r.id === regionId);

  if (!region) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">
            {language === 'en' ? 'Region not found' : 'Région non trouvée'}
          </h2>
          <Button onClick={onBack}>
            {language === 'en' ? 'Go Back' : 'Retour'}
          </Button>
        </div>
      </div>
    );
  }

  // Filter data for this region
  const regionVendors = vendors.filter(v => v.region === regionId);
  const regionProducts = products.filter(p => p.region === regionId);
  const featuredProducts = regionProducts.slice(0, 8);
  const dealProducts = regionProducts.filter(p => p.isFlashSale);

  const handleCategoryClick = (categoryId: string) => {
    // In a real app, this would navigate to category page
    console.log('Category clicked:', categoryId);
  };

  const handleVisitShop = (vendorId: number) => {
    // In a real app, this would navigate to vendor page
    console.log('Visit shop:', vendorId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div 
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${region.image})`
        }}
      >
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="gap-2 bg-white/90 hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === 'en' ? 'Back' : 'Retour'}
          </Button>
        </div>

        {/* Region Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: region.color }}
              />
              <Badge className="bg-white/20 text-white border-white/40">
                <MapPin className="h-3 w-3 mr-1" />
                {language === 'en' ? 'Region' : 'Région'}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl mb-3">
              {language === 'fr' ? region.nameFr : region.name}
            </h1>
            
            <p className="text-lg mb-4 max-w-2xl opacity-90">
              {language === 'fr' ? region.descriptionFr : region.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Store className="h-4 w-4" />
                <span>{region.vendorCount} {language === 'en' ? 'Vendors' : 'Vendeurs'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Package className="h-4 w-4" />
                <span>{region.productCount}+ {language === 'en' ? 'Products' : 'Produits'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <TrendingUp className="h-4 w-4" />
                <span>{language === 'en' ? 'Active Market' : 'Marché Actif'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl mb-2">
              {language === 'en' ? 'Shop by Category' : 'Acheter par Catégorie'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Browse products by category in this region' 
                : 'Parcourir les produits par catégorie dans cette région'}
            </p>
          </div>
          <RegionCategoryList
            regionId={regionId}
            language={language}
            onCategoryClick={handleCategoryClick}
          />
        </section>

        {/* Top Deals Section */}
        {dealProducts.length > 0 && (
          <section className="mb-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 md:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🔥</span>
                <h2 className="text-2xl md:text-3xl text-red-600">
                  {language === 'en' ? 'Flash Deals' : 'Offres Flash'}
                </h2>
              </div>
              <p className="text-gray-700">
                {language === 'en' 
                  ? 'Limited time offers in this region - grab them before they\'re gone!' 
                  : 'Offres à durée limitée dans cette région - profitez-en avant qu\'elles ne disparaissent!'}
              </p>
            </div>
            <DealsCarousel
              products={dealProducts}
              language={language}
              onViewProduct={onViewProduct}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              wishlistItems={wishlistItems}
            />
          </section>
        )}

        {/* Top Vendors Section */}
        {regionVendors.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl mb-2">
                  {language === 'en' ? 'Top Vendors' : 'Meilleurs Vendeurs'}
                </h2>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? 'Verified sellers from this region' 
                    : 'Vendeurs vérifiés de cette région'}
                </p>
              </div>
              <Button variant="outline" className="hidden md:flex">
                {language === 'en' ? 'View All' : 'Voir Tout'}
              </Button>
            </div>
            <VendorCarousel
              vendors={regionVendors}
              language={language}
              onVisitShop={handleVisitShop}
            />
          </section>
        )}

        {/* Products Section */}
        <section className="mb-12">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'featured' | 'all')}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl mb-2">
                  {language === 'en' ? 'Products' : 'Produits'}
                </h2>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? 'Discover amazing products from this region' 
                    : 'Découvrez des produits incroyables de cette région'}
                </p>
              </div>
              <TabsList>
                <TabsTrigger value="featured">
                  {language === 'en' ? 'Featured' : 'En Vedette'}
                </TabsTrigger>
                <TabsTrigger value="all">
                  {language === 'en' ? 'All' : 'Tous'}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="featured">
              <ProductCarousel
                products={featuredProducts}
                language={language}
                onViewProduct={onViewProduct}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                wishlistItems={wishlistItems}
              />
            </TabsContent>

            <TabsContent value="all">
              <ProductGrid
                products={regionProducts}
                language={language}
                onViewProduct={onViewProduct}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                wishlistItems={wishlistItems}
              />
            </TabsContent>
          </Tabs>
        </section>

        {/* Explore More Regions CTA */}
        <section className="text-center py-12 bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 rounded-2xl">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 p-4 rounded-2xl">
              <Flag className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-2xl mb-4">
            {language === 'en' 
              ? 'Explore More Regions' 
              : 'Explorez Plus de Régions'}
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            {language === 'en' 
              ? 'Discover unique products from all across Cameroon' 
              : 'Découvrez des produits uniques de tout le Cameroun'}
          </p>
          <Button onClick={onBack} size="lg">
            {language === 'en' ? 'View All Regions' : 'Voir Toutes les Régions'}
          </Button>
        </section>
      </div>
    </div>
  );
}
