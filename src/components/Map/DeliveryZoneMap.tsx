import { useState } from 'react';
import { MapPin, TrendingUp, Package, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MapContainer } from './MapContainer';
import { regionCoordinates, calculateDistance, estimateDeliveryCostByDistance } from '../../lib/map-data';
import { regions } from '../../lib/mock-data';

interface DeliveryZoneMapProps {
  language: 'en' | 'fr';
  fromRegion: string;
  toRegion?: string;
  onRegionChange?: (region: string) => void;
}

export function DeliveryZoneMap({
  language,
  fromRegion,
  toRegion,
  onRegionChange,
}: DeliveryZoneMapProps) {
  const [selectedToRegion, setSelectedToRegion] = useState(toRegion || fromRegion);

  const fromCoords = regionCoordinates[fromRegion];
  const toCoords = regionCoordinates[selectedToRegion];

  const distance = fromCoords && toCoords
    ? calculateDistance(fromCoords.lat, fromCoords.lng, toCoords.lat, toCoords.lng)
    : 0;

  const deliveryCost = estimateDeliveryCostByDistance(distance);

  const markers = [];
  if (fromCoords) {
    markers.push({
      lat: fromCoords.lat,
      lng: fromCoords.lng,
      title: `${language === 'en' ? 'From:' : 'De:'} ${fromCoords.city}`,
      icon: 'vendor' as const,
      color: '#FFCC00',
    });
  }
  if (toCoords && selectedToRegion !== fromRegion) {
    markers.push({
      lat: toCoords.lat,
      lng: toCoords.lng,
      title: `${language === 'en' ? 'To:' : 'À:'} ${toCoords.city}`,
      icon: 'pin' as const,
      color: '#C8102E',
    });
  }

  const handleRegionChange = (region: string) => {
    setSelectedToRegion(region);
    onRegionChange?.(region);
  };

  const getDeliveryZone = (distanceKm: number) => {
    if (distanceKm < 5) return { zone: 'A', color: 'green', label: language === 'en' ? 'Very Close' : 'Très Proche' };
    if (distanceKm < 20) return { zone: 'B', color: 'blue', label: language === 'en' ? 'Same City' : 'Même Ville' };
    if (distanceKm < 100) return { zone: 'C', color: 'yellow', label: language === 'en' ? 'Adjacent Region' : 'Région Adjacente' };
    return { zone: 'D', color: 'red', label: language === 'en' ? 'Far Region' : 'Région Éloignée' };
  };

  const deliveryZone = getDeliveryZone(distance);

  const fromRegionData = regions.find(r => r.id === fromRegion);
  const toRegionData = regions.find(r => r.id === selectedToRegion);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            {language === 'en' ? 'Delivery Zone Calculator' : 'Calculateur de Zone de Livraison'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Region Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-2 block">
                {language === 'en' ? 'From' : 'De'}
              </label>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm">
                  {language === 'en' ? fromRegionData?.name : fromRegionData?.nameFr}
                </p>
                <p className="text-xs text-gray-600">{fromCoords?.city}</p>
              </div>
            </div>
            <div>
              <label className="text-sm mb-2 block">
                {language === 'en' ? 'To' : 'À'}
              </label>
              <Select value={selectedToRegion} onValueChange={handleRegionChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {language === 'en' ? region.name : region.nameFr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Map */}
          <MapContainer
            center={
              fromCoords && toCoords && selectedToRegion !== fromRegion
                ? {
                    lat: (fromCoords.lat + toCoords.lat) / 2,
                    lng: (fromCoords.lng + toCoords.lng) / 2,
                  }
                : fromCoords || { lat: 6.5, lng: 12.5 }
            }
            zoom={selectedToRegion === fromRegion ? 11 : 6}
            markers={markers}
            height="300px"
          />

          {/* Delivery Information */}
          {selectedToRegion !== fromRegion && (
            <div className="space-y-3">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {language === 'en' ? 'Delivery Zone:' : 'Zone de Livraison:'}
                    </span>
                    <Badge
                      variant="outline"
                      className={`
                        ${deliveryZone.color === 'green' ? 'border-green-600 text-green-600' : ''}
                        ${deliveryZone.color === 'blue' ? 'border-blue-600 text-blue-600' : ''}
                        ${deliveryZone.color === 'yellow' ? 'border-yellow-600 text-yellow-600' : ''}
                        ${deliveryZone.color === 'red' ? 'border-red-600 text-red-600' : ''}
                      `}
                    >
                      {language === 'en' ? 'Zone' : 'Zone'} {deliveryZone.zone} - {deliveryZone.label}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-4">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">
                        {language === 'en' ? 'Distance' : 'Distance'}
                      </span>
                    </div>
                    <p className="text-2xl text-green-600">
                      {distance.toFixed(0)} km
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">
                        {language === 'en' ? 'Delivery Cost' : 'Coût de Livraison'}
                      </span>
                    </div>
                    <p className="text-2xl text-blue-600">
                      {deliveryCost.toLocaleString()} FCFA
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Delivery Time Estimate */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'en' ? 'Estimated Delivery Time:' : 'Temps de Livraison Estimé:'}
                </p>
                <p className="text-sm">
                  {distance < 20 ? (language === 'en' ? '1-2 days' : '1-2 jours') :
                   distance < 100 ? (language === 'en' ? '2-4 days' : '2-4 jours') :
                   (language === 'en' ? '4-7 days' : '4-7 jours')}
                </p>
              </div>
            </div>
          )}

          {selectedToRegion === fromRegion && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {language === 'en'
                  ? 'Delivery within the same region. Select a different destination to see delivery zones.'
                  : 'Livraison dans la même région. Sélectionnez une destination différente pour voir les zones de livraison.'}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
