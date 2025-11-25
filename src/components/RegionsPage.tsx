import { MapPin, Package, Store, TrendingUp, ArrowRight, Flag } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { regions, products, vendors } from '../lib/mock-data';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RegionsPageProps {
  language: 'en' | 'fr';
  onRegionClick: (regionId: string) => void;
}

export function RegionsPage({ language, onRegionClick }: RegionsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 p-5 rounded-2xl">
              <Flag className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl mb-4">
            {language === 'en' ? 'Explore Cameroon by Region' : 'Explorez le Cameroun par Région'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Discover unique products and local vendors from all 10 regions of Cameroon. Each region has its own treasures waiting for you.'
              : 'Découvrez des produits uniques et des vendeurs locaux des 10 régions du Cameroun. Chaque région a ses propres trésors qui vous attendent.'}
          </p>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {regions.map((region) => {
            const regionProducts = products.filter(p => p.region === region.id);
            const regionVendors = vendors.filter(v => v.region === region.id);

            return (
              <Card
                key={region.id}
                className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
                onClick={() => onRegionClick(region.id)}
              >
                {/* Region Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={region.image}
                    alt={region.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  {/* Region Color Badge */}
                  <div className="absolute top-3 left-3">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: region.color }}
                    />
                  </div>

                  {/* Active Badge */}
                  <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-white border-0">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {language === 'en' ? 'Active' : 'Actif'}
                  </Badge>

                  {/* Region Name */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h2 className="text-xl text-white mb-1 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {language === 'fr' ? region.nameFr : region.name}
                    </h2>
                  </div>
                </div>

                {/* Region Info */}
                <CardContent className="p-5">
                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                    {language === 'fr' ? region.descriptionFr : region.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Store className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-gray-600">
                          {language === 'en' ? 'Vendors' : 'Vendeurs'}
                        </span>
                      </div>
                      <p className="text-lg">{regionVendors.length}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Package className="h-4 w-4 text-blue-600" />
                        <span className="text-xs text-gray-600">
                          {language === 'en' ? 'Products' : 'Produits'}
                        </span>
                      </div>
                      <p className="text-lg">{regionProducts.length}+</p>
                    </div>
                  </div>

                  {/* Explore Button */}
                  <Button className="w-full gap-2 group-hover:bg-green-700">
                    {language === 'en' ? 'Explore Region' : 'Explorer la Région'}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="text-2xl mb-3">
            {language === 'en' ? 'Can\'t Decide?' : 'Vous Hésitez?'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            {language === 'en'
              ? 'Browse all products from every region or shop by category to find exactly what you need.'
              : 'Parcourez tous les produits de chaque région ou achetez par catégorie pour trouver exactement ce dont vous avez besoin.'}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="outline" size="lg">
              {language === 'en' ? 'Browse All Products' : 'Parcourir Tous les Produits'}
            </Button>
            <Button variant="outline" size="lg">
              {language === 'en' ? 'Shop by Category' : 'Acheter par Catégorie'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
