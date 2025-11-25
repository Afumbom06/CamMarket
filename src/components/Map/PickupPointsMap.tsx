import { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MapContainer } from './MapContainer';
import { pickupPoints, regionCoordinates, calculateDistance } from '../../lib/map-data';
import { regions } from '../../lib/mock-data';

interface PickupPointsMapProps {
  language: 'en' | 'fr';
  userRegion?: string;
  selectedRegion?: string;
  onSelectPickupPoint?: (point: any) => void;
  selectedPointId?: string;
}

export function PickupPointsMap({
  language,
  userRegion,
  selectedRegion,
  onSelectPickupPoint,
  selectedPointId,
}: PickupPointsMapProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  // Filter pickup points by region
  const filteredPoints = selectedRegion && selectedRegion !== 'all'
    ? pickupPoints.filter(p => p.region === selectedRegion)
    : pickupPoints;

  // Get center for map
  const mapCenter = selectedRegion && selectedRegion !== 'all'
    ? regionCoordinates[selectedRegion]
    : { lat: 6.5, lng: 12.5 }; // Cameroon center

  // Prepare markers for map
  const markers = filteredPoints.map(point => ({
    lat: point.lat,
    lng: point.lng,
    title: language === 'en' ? point.name : point.nameFr,
    icon: point.type as 'hub' | 'vendor' | 'pin',
    color: point.type === 'hub' ? '#00843D' : '#FFCC00',
  }));

  const handlePointSelect = (point: any) => {
    setSelectedPoint(point);
    onSelectPickupPoint?.(point);
  };

  const handleMarkerClick = (marker: any) => {
    const point = filteredPoints.find(
      p => p.lat === marker.lat && p.lng === marker.lng
    );
    if (point) {
      setSelectedPoint(point);
    }
  };

  const getDistanceText = (point: any) => {
    if (!userRegion) return null;
    const userCoords = regionCoordinates[userRegion];
    if (!userCoords) return null;
    
    const distance = calculateDistance(
      userCoords.lat,
      userCoords.lng,
      point.lat,
      point.lng
    );
    
    return `${distance.toFixed(1)} km`;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      hub: { en: 'Main Hub', fr: 'Hub Principal' },
      vendor: { en: 'Vendor Store', fr: 'Magasin Vendeur' },
      partner: { en: 'Partner Point', fr: 'Point Partenaire' },
    };
    return labels[type as keyof typeof labels]?.[language] || type;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          {language === 'en' ? 'Pickup Points' : 'Points de Retrait'}
        </h3>
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'list' | 'map')}>
          <TabsList>
            <TabsTrigger value="list">
              {language === 'en' ? 'List' : 'Liste'}
            </TabsTrigger>
            <TabsTrigger value="map">
              {language === 'en' ? 'Map' : 'Carte'}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="space-y-4">
          <MapContainer
            center={mapCenter}
            zoom={selectedRegion && selectedRegion !== 'all' ? 11 : 6}
            markers={markers}
            height="400px"
            onMarkerClick={handleMarkerClick}
          />
          
          {selectedPoint && (
            <Card className="border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="mb-1">
                      {language === 'en' ? selectedPoint.name : selectedPoint.nameFr}
                    </h4>
                    <Badge variant="outline" className="mb-2">
                      {getTypeLabel(selectedPoint.type)}
                    </Badge>
                  </div>
                  {selectedPointId === selectedPoint.id && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{language === 'en' ? selectedPoint.address : selectedPoint.addressFr}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{selectedPoint.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{selectedPoint.hours}</span>
                  </div>
                  {getDistanceText(selectedPoint) && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Navigation className="h-4 w-4" />
                      <span>{getDistanceText(selectedPoint)} {language === 'en' ? 'from you' : 'de vous'}</span>
                    </div>
                  )}
                </div>

                {onSelectPickupPoint && (
                  <Button
                    className="w-full mt-4"
                    onClick={() => handlePointSelect(selectedPoint)}
                    variant={selectedPointId === selectedPoint.id ? 'default' : 'outline'}
                  >
                    {selectedPointId === selectedPoint.id
                      ? (language === 'en' ? 'Selected' : 'Sélectionné')
                      : (language === 'en' ? 'Select This Point' : 'Sélectionner ce Point')}
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="grid gap-3">
          {filteredPoints.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600">
                  {language === 'en'
                    ? 'No pickup points available in this region'
                    : 'Aucun point de retrait disponible dans cette région'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPoints.map((point) => {
              const regionData = regions.find(r => r.id === point.region);
              const isSelected = selectedPointId === point.id;
              
              return (
                <Card
                  key={point.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'border-2 border-green-600 bg-green-50' : ''
                  }`}
                  onClick={() => handlePointSelect(point)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          point.type === 'hub' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          {point.type === 'hub' ? '🏢' : point.type === 'vendor' ? '🏪' : '📍'}
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1">
                            {language === 'en' ? point.name : point.nameFr}
                          </h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {getTypeLabel(point.type)}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {language === 'en' ? regionData?.name : regionData?.nameFr}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              <span>{language === 'en' ? point.address : point.addressFr}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              <span>{point.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>{point.hours}</span>
                            </div>
                            {getDistanceText(point) && (
                              <div className="flex items-center gap-2 text-green-600">
                                <Navigation className="h-3 w-3" />
                                <span>{getDistanceText(point)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
