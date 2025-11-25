import { useState } from 'react';
import { MapPin, Plus, Check, Map } from 'lucide-react';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { regions } from '../../lib/mock-data';
import { toast } from 'sonner@2.0.3';
import { PickupPointsMap } from '../Map';

interface DeliveryInformationProps {
  language: 'en' | 'fr';
  deliveryMethod: 'home' | 'pickup';
  userAddresses: any[];
  selectedAddress: any;
  onSelectAddress: (address: any) => void;
  isLoggedIn: boolean;
  userRegion?: string;
}

export function DeliveryInformation({
  language,
  deliveryMethod,
  userAddresses,
  selectedAddress,
  onSelectAddress,
  isLoggedIn,
  userRegion,
}: DeliveryInformationProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showPickupMap, setShowPickupMap] = useState(false);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState<any>(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    region: '',
    city: '',
    address: '',
  });

  const handleAddAddress = () => {
    // Validate
    if (!newAddress.name || !newAddress.phone || !newAddress.region || !newAddress.city || !newAddress.address) {
      toast.error(language === 'en' ? 'Please fill all fields' : 'Veuillez remplir tous les champs');
      return;
    }

    // Validate phone number (Cameroon format)
    const phoneRegex = /^\+237\s?[26]\d{8}$/;
    if (!phoneRegex.test(newAddress.phone)) {
      toast.error(language === 'en' ? 'Invalid phone number format. Use +237 6XX XXX XXX' : 'Format de numéro invalide. Utilisez +237 6XX XXX XXX');
      return;
    }

    const address = {
      ...newAddress,
      id: Date.now(),
      isDefault: userAddresses.length === 0,
    };

    onSelectAddress(address);
    setIsAddDialogOpen(false);
    setNewAddress({ name: '', phone: '', region: '', city: '', address: '' });
    toast.success(language === 'en' ? 'Address added successfully' : 'Adresse ajoutée avec succès');
  };

  const handlePickupPointSelect = (point: any) => {
    setSelectedPickupPoint(point);
    onSelectAddress(point); // Use the pickup point as "address"
  };

  if (deliveryMethod === 'pickup') {
    return (
      <div className="space-y-4">
        {/* Pickup Point Selection Tabs */}
        <Tabs value={showPickupMap ? 'map' : 'list'} onValueChange={(v) => setShowPickupMap(v === 'map')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">
              {language === 'en' ? 'List View' : 'Vue Liste'}
            </TabsTrigger>
            <TabsTrigger value="map">
              <Map className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Map View' : 'Vue Carte'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4">
            <PickupPointsMap
              language={language}
              userRegion={userRegion}
              onSelectPickupPoint={handlePickupPointSelect}
              selectedPointId={selectedPickupPoint?.id}
            />
          </TabsContent>
          
          <TabsContent value="map" className="mt-4">
            <PickupPointsMap
              language={language}
              userRegion={userRegion}
              onSelectPickupPoint={handlePickupPointSelect}
              selectedPointId={selectedPickupPoint?.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!isLoggedIn && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            {language === 'en'
              ? '💡 Sign in to save and manage your addresses'
              : '💡 Connectez-vous pour enregistrer et gérer vos adresses'}
          </p>
        </div>
      )}

      {userAddresses.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <h3 className="mb-2">{language === 'en' ? 'No Saved Addresses' : 'Aucune Adresse Enregistrée'}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {language === 'en' ? 'Add a delivery address to continue' : 'Ajoutez une adresse de livraison pour continuer'}
          </p>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {language === 'en' ? 'Add Address' : 'Ajouter une Adresse'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{language === 'en' ? 'Add New Address' : 'Ajouter une Nouvelle Adresse'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>{language === 'en' ? 'Full Name' : 'Nom Complet'}</Label>
                  <Input
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    placeholder={language === 'en' ? 'Enter your name' : 'Entrez votre nom'}
                  />
                </div>
                <div>
                  <Label>{language === 'en' ? 'Phone Number' : 'Numéro de Téléphone'}</Label>
                  <Input
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    placeholder="+237 6XX XXX XXX"
                  />
                </div>
                <div>
                  <Label>{language === 'en' ? 'Region' : 'Région'}</Label>
                  <Select value={newAddress.region} onValueChange={(value) => setNewAddress({ ...newAddress, region: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select region' : 'Sélectionner la région'} />
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
                <div>
                  <Label>{language === 'en' ? 'City' : 'Ville'}</Label>
                  <Input
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    placeholder={language === 'en' ? 'Enter city' : 'Entrez la ville'}
                  />
                </div>
                <div>
                  <Label>{language === 'en' ? 'Street Address' : 'Adresse'}</Label>
                  <Input
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    placeholder={language === 'en' ? 'Enter street address' : 'Entrez l\'adresse'}
                  />
                </div>
                <Button className="w-full" onClick={handleAddAddress}>
                  {language === 'en' ? 'Save Address' : 'Enregistrer l\'Adresse'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <>
          <RadioGroup value={selectedAddress?.id?.toString()} onValueChange={(value) => {
            const address = userAddresses.find(a => a.id.toString() === value);
            onSelectAddress(address);
          }}>
            {userAddresses.map((address) => (
              <div
                key={address.id}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedAddress?.id === address.id ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <RadioGroupItem value={address.id.toString()} id={`address-${address.id}`} className="mt-1" />
                <Label htmlFor={`address-${address.id}`} className="flex-1 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="">{address.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{address.address}</p>
                      <p className="text-sm text-gray-600">{address.city}, {regions.find(r => r.id === address.region)?.[language === 'en' ? 'name' : 'nameFr']}</p>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                      {address.isDefault && (
                        <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {language === 'en' ? 'Default' : 'Par défaut'}
                        </span>
                      )}
                    </div>
                    {selectedAddress?.id === address.id && (
                      <Check className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                {language === 'en' ? 'Add New Address' : 'Ajouter une Nouvelle Adresse'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{language === 'en' ? 'Add New Address' : 'Ajouter une Nouvelle Adresse'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>{language === 'en' ? 'Full Name' : 'Nom Complet'}</Label>
                  <Input
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    placeholder={language === 'en' ? 'Enter your name' : 'Entrez votre nom'}
                  />
                </div>
                <div>
                  <Label>{language === 'en' ? 'Phone Number' : 'Numéro de Téléphone'}</Label>
                  <Input
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    placeholder="+237 6XX XXX XXX"
                  />
                </div>
                <div>
                  <Label>{language === 'en' ? 'Region' : 'Région'}</Label>
                  <Select value={newAddress.region} onValueChange={(value) => setNewAddress({ ...newAddress, region: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select region' : 'Sélectionner la région'} />
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
                <div>
                  <Label>{language === 'en' ? 'City' : 'Ville'}</Label>
                  <Input
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    placeholder={language === 'en' ? 'Enter city' : 'Entrez la ville'}
                  />
                </div>
                <div>
                  <Label>{language === 'en' ? 'Street Address' : 'Adresse'}</Label>
                  <Input
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    placeholder={language === 'en' ? 'Enter street address' : 'Entrez l\'adresse'}
                  />
                </div>
                <Button className="w-full" onClick={handleAddAddress}>
                  {language === 'en' ? 'Save Address' : 'Enregistrer l\'Adresse'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
