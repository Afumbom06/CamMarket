import { useState } from 'react';
import { MapPin, Navigation, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { VendorLocationMap } from '../Map';

interface ProductLocationProps {
  region: {
    id: string;
    name: string;
    nameFr: string;
    color: string;
  };
  city: string;
  language: 'en' | 'fr';
  vendor?: {
    storeName: string;
    phone?: string;
  };
  userRegion?: string;
}

export function ProductLocation({ region, city, language, vendor, userRegion }: ProductLocationProps) {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: `${region.color}20` }}
                >
                  <MapPin 
                    className="h-4 w-4" 
                    style={{ color: region.color }} 
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Location' : 'Emplacement'}
                  </p>
                  <p className="text-gray-900">
                    {language === 'en' ? region.name : region.nameFr}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-10">
                <Navigation className="h-3 w-3 text-gray-400" />
                <span className="text-sm text-gray-600">{city}</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowMap(true)}
            >
              <MapPin className="h-4 w-4" />
              {language === 'en' ? 'View Map' : 'Voir Carte'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map Dialog */}
      <Dialog open={showMap} onOpenChange={setShowMap}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Vendor Location' : 'Emplacement du Vendeur'}
            </DialogTitle>
          </DialogHeader>
          {vendor && (
            <VendorLocationMap
              language={language}
              vendor={{
                storeName: vendor.storeName,
                region: region.id,
                city: city,
                phone: vendor.phone,
              }}
              userRegion={userRegion}
              showDeliveryCost={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
