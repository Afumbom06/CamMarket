import { MapPin, Phone, Navigation, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MapContainer } from './MapContainer';
import { regionCoordinates, calculateDistance, estimateDeliveryCostByDistance } from '../../lib/map-data';
import { regions } from '../../lib/mock-data';

interface VendorLocationMapProps {
  language: 'en' | 'fr';
  vendor: {
    storeName: string;
    region: string;
    city: string;
    address?: string;
    phone?: string;
    coordinates?: { lat: number; lng: number };
  };
  userRegion?: string;
  showDeliveryCost?: boolean;
}

export function VendorLocationMap({
  language,
  vendor,
  userRegion,
  showDeliveryCost = false,
}: VendorLocationMapProps) {
  // Get vendor coordinates (use region center if not specified)
  const vendorCoords = vendor.coordinates || regionCoordinates[vendor.region];
  const regionData = regions.find(r => r.id === vendor.region);

  // Calculate distance and delivery cost if user region is provided
  let distance = 0;
  let deliveryCost = 0;
  
  if (userRegion && vendorCoords) {
    const userCoords = regionCoordinates[userRegion];
    if (userCoords) {
      distance = calculateDistance(
        userCoords.lat,
        userCoords.lng,
        vendorCoords.lat,
        vendorCoords.lng
      );
      deliveryCost = estimateDeliveryCostByDistance(distance);
    }
  }

  const markers = vendorCoords ? [{
    lat: vendorCoords.lat,
    lng: vendorCoords.lng,
    title: vendor.storeName,
    icon: 'vendor' as const,
    color: '#FFCC00',
  }] : [];

  // Add user location marker if available
  if (userRegion) {
    const userCoords = regionCoordinates[userRegion];
    if (userCoords) {
      markers.push({
        lat: userCoords.lat,
        lng: userCoords.lng,
        title: language === 'en' ? 'Your Location' : 'Votre Position',
        icon: 'pin' as const,
        color: '#C8102E',
      });
    }
  }

  const openInMaps = () => {
    if (!vendorCoords) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${vendorCoords.lat},${vendorCoords.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Map */}
      <MapContainer
        center={vendorCoords || { lat: 6.5, lng: 12.5 }}
        zoom={userRegion ? 8 : 11}
        markers={markers}
        height="300px"
      />

      {/* Location Details */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <MapPin className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1">{vendor.storeName}</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>{vendor.city}, {language === 'en' ? regionData?.name : regionData?.nameFr}</span>
                  <Badge variant="secondary" className="text-xs">
                    {language === 'en' ? regionData?.name : regionData?.nameFr}
                  </Badge>
                </div>
                {vendor.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{vendor.address}</span>
                  </div>
                )}
                {vendor.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{vendor.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Distance & Delivery Cost */}
          {userRegion && distance > 0 && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  {language === 'en' ? 'Distance from you' : 'Distance de vous'}
                </span>
                <span className="text-green-600">{distance.toFixed(1)} km</span>
              </div>
              
              {showDeliveryCost && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {language === 'en' ? 'Estimated delivery cost' : 'Coût de livraison estimé'}
                  </span>
                  <span className="text-green-600">
                    {deliveryCost.toLocaleString()} FCFA
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={openInMaps}
            >
              <ExternalLink className="h-4 w-4" />
              {language === 'en' ? 'Open in Maps' : 'Ouvrir dans Maps'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
