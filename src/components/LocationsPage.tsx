import { useState } from 'react';
import { ArrowLeft, MapPin, Store, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PickupPointsMap, VendorLocationMap, DeliveryZoneMap } from './Map';
import { regions, mockVendor } from '../lib/mock-data';

interface LocationsPageProps {
  language: 'en' | 'fr';
  onBack: () => void;
  userRegion?: string;
}

export function LocationsPage({ language, onBack, userRegion = 'centre' }: LocationsPageProps) {
  const [selectedRegion, setSelectedRegion] = useState(userRegion);
  const [activeTab, setActiveTab] = useState('pickup');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl flex items-center gap-2">
                <MapPin className="h-6 w-6 text-green-600" />
                {language === 'en' ? 'Locations & Delivery' : 'Emplacements & Livraison'}
              </h1>
              <p className="text-sm text-gray-600">
                {language === 'en'
                  ? 'Find pickup points, vendor locations, and delivery zones'
                  : 'Trouvez les points de retrait, emplacements des vendeurs et zones de livraison'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Region Selector */}
        <div className="mb-6 flex items-center gap-4">
          <label className="text-sm">
            {language === 'en' ? 'Filter by Region:' : 'Filtrer par Région:'}
          </label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === 'en' ? 'All Regions' : 'Toutes les Régions'}
              </SelectItem>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {language === 'en' ? region.name : region.nameFr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="pickup" className="gap-2">
              <MapPin className="h-4 w-4" />
              {language === 'en' ? 'Pickup Points' : 'Points de Retrait'}
            </TabsTrigger>
            <TabsTrigger value="vendors" className="gap-2">
              <Store className="h-4 w-4" />
              {language === 'en' ? 'Vendors' : 'Vendeurs'}
            </TabsTrigger>
            <TabsTrigger value="delivery" className="gap-2">
              <Truck className="h-4 w-4" />
              {language === 'en' ? 'Delivery Zones' : 'Zones de Livraison'}
            </TabsTrigger>
          </TabsList>

          {/* Pickup Points Tab */}
          <TabsContent value="pickup">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <h2 className="text-xl mb-2">
                  {language === 'en' ? 'Pickup Points' : 'Points de Retrait'}
                </h2>
                <p className="text-sm text-gray-600">
                  {language === 'en'
                    ? 'Find convenient pickup locations across Cameroon. Select a point to see details and directions.'
                    : 'Trouvez des emplacements de retrait pratiques à travers le Cameroun. Sélectionnez un point pour voir les détails et les directions.'}
                </p>
              </div>
              <PickupPointsMap
                language={language}
                userRegion={userRegion}
                selectedRegion={selectedRegion}
              />
            </div>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <h2 className="text-xl mb-2">
                  {language === 'en' ? 'Vendor Locations' : 'Emplacements des Vendeurs'}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {language === 'en'
                    ? 'View vendor store locations and calculate delivery costs to your area.'
                    : 'Voir les emplacements des magasins de vendeurs et calculer les coûts de livraison vers votre zone.'}
                </p>
              </div>
              
              {/* Example Vendor Location */}
              <VendorLocationMap
                language={language}
                vendor={{
                  storeName: mockVendor.storeName,
                  region: mockVendor.region,
                  city: mockVendor.city,
                  phone: mockVendor.phone,
                }}
                userRegion={userRegion}
                showDeliveryCost={true}
              />

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 {language === 'en'
                    ? 'Tip: When viewing a product, you can see the vendor\'s location and estimated delivery cost.'
                    : 'Astuce : Lors de la consultation d\'un produit, vous pouvez voir l\'emplacement du vendeur et le coût de livraison estimé.'}
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Delivery Zones Tab */}
          <TabsContent value="delivery">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <h2 className="text-xl mb-2">
                  {language === 'en' ? 'Delivery Zone Calculator' : 'Calculateur de Zone de Livraison'}
                </h2>
                <p className="text-sm text-gray-600">
                  {language === 'en'
                    ? 'Calculate delivery costs based on distance between regions. Select a destination to see estimated costs and delivery times.'
                    : 'Calculez les coûts de livraison en fonction de la distance entre les régions. Sélectionnez une destination pour voir les coûts estimés et les délais de livraison.'}
                </p>
              </div>

              <DeliveryZoneMap
                language={language}
                fromRegion={userRegion}
              />

              {/* Delivery Information */}
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm mb-3">
                    {language === 'en' ? 'Delivery Zones Explained:' : 'Zones de Livraison Expliquées:'}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-20 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        {language === 'en' ? 'Zone A' : 'Zone A'}
                      </span>
                      <span className="text-gray-600">
                        {language === 'en'
                          ? 'Very Close (0-5km) - Same day delivery available'
                          : 'Très Proche (0-5km) - Livraison le jour même disponible'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-20 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {language === 'en' ? 'Zone B' : 'Zone B'}
                      </span>
                      <span className="text-gray-600">
                        {language === 'en'
                          ? 'Same City (5-20km) - 1-2 days delivery'
                          : 'Même Ville (5-20km) - Livraison en 1-2 jours'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-20 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                        {language === 'en' ? 'Zone C' : 'Zone C'}
                      </span>
                      <span className="text-gray-600">
                        {language === 'en'
                          ? 'Adjacent Region (20-100km) - 2-4 days delivery'
                          : 'Région Adjacente (20-100km) - Livraison en 2-4 jours'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-20 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                        {language === 'en' ? 'Zone D' : 'Zone D'}
                      </span>
                      <span className="text-gray-600">
                        {language === 'en'
                          ? 'Far Region (100km+) - 4-7 days delivery'
                          : 'Région Éloignée (100km+) - Livraison en 4-7 jours'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    ✨ {language === 'en'
                      ? 'Free delivery on orders over 50,000 FCFA within the same region!'
                      : 'Livraison gratuite pour les commandes de plus de 50 000 FCFA dans la même région !'}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
