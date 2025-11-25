import { Truck, Package, MapPin } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { regions, deliveryPricing, regionDistances } from '../../lib/mock-data';

interface DeliveryCostCalculatorProps {
  language: 'en' | 'fr';
  userRegion: string;
  sellerRegions: string[]; // Unique seller regions from cart
  deliveryMethod: 'home' | 'pickup';
  onDeliveryMethodChange: (method: 'home' | 'pickup') => void;
}

export function DeliveryCostCalculator({
  language,
  userRegion,
  sellerRegions,
  deliveryMethod,
  onDeliveryMethodChange,
}: DeliveryCostCalculatorProps) {
  const calculateDeliveryCost = () => {
    if (deliveryMethod === 'pickup') {
      return 0;
    }

    let totalCost = 0;
    sellerRegions.forEach(sellerRegion => {
      if (sellerRegion === userRegion) {
        totalCost += deliveryPricing.sameRegion;
      } else {
        const adjacentRegions = regionDistances[userRegion] || [];
        if (adjacentRegions.includes(sellerRegion)) {
          totalCost += deliveryPricing.interRegion.adjacent;
        } else {
          totalCost += deliveryPricing.interRegion.far;
        }
      }
    });
    return totalCost;
  };

  const deliveryCost = calculateDeliveryCost();
  const userRegionData = regions.find(r => r.id === userRegion);

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="flex items-center gap-2 mb-4">
          <Truck className="h-5 w-5 text-green-600" />
          {language === 'en' ? 'Delivery Options' : 'Options de Livraison'}
        </h3>

        <RadioGroup value={deliveryMethod} onValueChange={(value) => onDeliveryMethodChange(value as 'home' | 'pickup')}>
          {/* Home Delivery */}
          <div className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
            deliveryMethod === 'home' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'
          }`}>
            <RadioGroupItem value="home" id="home" className="mt-1" />
            <Label htmlFor="home" className="flex-1 cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="h-4 w-4" />
                    <span>{language === 'en' ? 'Home Delivery' : 'Livraison à Domicile'}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Delivery to' : 'Livraison à'}: {language === 'en' ? userRegionData?.name : userRegionData?.nameFr}
                  </p>
                  {sellerRegions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {sellerRegions.map(sellerRegion => {
                        const sellerRegionData = regions.find(r => r.id === sellerRegion);
                        const cost = sellerRegion === userRegion 
                          ? deliveryPricing.sameRegion 
                          : (regionDistances[userRegion] || []).includes(sellerRegion)
                            ? deliveryPricing.interRegion.adjacent
                            : deliveryPricing.interRegion.far;
                        
                        return (
                          <div key={sellerRegion} className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {language === 'en' ? 'From' : 'De'} {language === 'en' ? sellerRegionData?.name : sellerRegionData?.nameFr}: {cost.toLocaleString()} FCFA
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-green-600">
                    {deliveryCost.toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            </Label>
          </div>

          {/* Pickup */}
          <div className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
            deliveryMethod === 'pickup' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'
          }`}>
            <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
            <Label htmlFor="pickup" className="flex-1 cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4" />
                    <span>{language === 'en' ? 'Pickup' : 'Retrait'}</span>
                    <Badge variant="secondary" className="text-xs">
                      {language === 'en' ? 'FREE' : 'GRATUIT'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' 
                      ? 'Pick up from seller locations' 
                      : 'Retrait aux emplacements des vendeurs'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-green-600">0 FCFA</span>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
