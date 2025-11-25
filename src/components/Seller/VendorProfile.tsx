import { useState } from 'react';
import { Upload, Save, Store, MapPin, Mail, Phone, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { regions } from '../../lib/mock-data';
import { toast } from 'sonner@2.0.3';

interface VendorProfileProps {
  language: 'en' | 'fr';
  vendor: {
    id: number;
    storeName: string;
    ownerName: string;
    phone: string;
    email: string;
    region: string;
    city: string;
    storeLogo?: string;
    storeBanner?: string;
    storeDescription?: string;
    storeDescriptionFr?: string;
  };
  onSave: (data: any) => void;
}

export function VendorProfile({ language, vendor: initialVendor, onSave }: VendorProfileProps) {
  const [vendor, setVendor] = useState(initialVendor);
  const [logoPreview, setLogoPreview] = useState(initialVendor.storeLogo || '');
  const [bannerPreview, setBannerPreview] = useState(initialVendor.storeBanner || '');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      setVendor({ ...vendor, storeLogo: url });
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBannerPreview(url);
      setVendor({ ...vendor, storeBanner: url });
    }
  };

  const handleSave = () => {
    if (!vendor.storeName || !vendor.ownerName || !vendor.email || !vendor.phone) {
      toast.error(
        language === 'en' 
          ? 'Please fill all required fields' 
          : 'Veuillez remplir tous les champs obligatoires'
      );
      return;
    }

    onSave(vendor);
    toast.success(
      language === 'en' 
        ? 'Store profile updated successfully' 
        : 'Profil du magasin mis à jour avec succès'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl mb-1">
          {language === 'en' ? 'Store Settings' : 'Paramètres du Magasin'}
        </h2>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Manage your store profile and information' 
            : 'Gérez le profil et les informations de votre magasin'}
        </p>
      </div>

      {/* Store Banner */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Store Banner' : 'Bannière du Magasin'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
              {bannerPreview ? (
                <img 
                  src={bannerPreview} 
                  alt="Store Banner" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <Store className="h-12 w-12" />
                </div>
              )}
              <label className="absolute bottom-4 right-4 cursor-pointer">
                <div className="bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">
                    {language === 'en' ? 'Upload Banner' : 'Télécharger Bannière'}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">
              {language === 'en' 
                ? 'Recommended size: 1200x400px' 
                : 'Taille recommandée: 1200x400px'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Store Logo & Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Store Information' : 'Informations du Magasin'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div className="flex items-center gap-6">
            <div>
              <Label className="mb-2 block">{language === 'en' ? 'Store Logo' : 'Logo du Magasin'}</Label>
              <Avatar className="h-24 w-24">
                {logoPreview && <AvatarImage src={logoPreview} />}
                <AvatarFallback className="bg-green-100 text-green-700 text-2xl">
                  {vendor.storeName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <label className="cursor-pointer">
                <div className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">
                    {language === 'en' ? 'Upload Logo' : 'Télécharger Logo'}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                {language === 'en' 
                  ? 'Recommended size: 400x400px' 
                  : 'Taille recommandée: 400x400px'}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">
                {language === 'en' ? 'Store Name' : 'Nom du Magasin'} *
              </Label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="storeName"
                  value={vendor.storeName}
                  onChange={(e) => setVendor({ ...vendor, storeName: e.target.value })}
                  className="pl-10"
                  placeholder="Kamga Electronics"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerName">
                {language === 'en' ? 'Owner Name' : 'Nom du Propriétaire'} *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="ownerName"
                  value={vendor.ownerName}
                  onChange={(e) => setVendor({ ...vendor, ownerName: e.target.value })}
                  className="pl-10"
                  placeholder="Jean Kamga"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {language === 'en' ? 'Email' : 'Email'} *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={vendor.email}
                  onChange={(e) => setVendor({ ...vendor, email: e.target.value })}
                  className="pl-10"
                  placeholder="jean.kamga@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                {language === 'en' ? 'Phone Number' : 'Numéro de Téléphone'} *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={vendor.phone}
                  onChange={(e) => setVendor({ ...vendor, phone: e.target.value })}
                  className="pl-10"
                  placeholder="+237 677 123 456"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">
                {language === 'en' ? 'Primary Region' : 'Région Principale'} *
              </Label>
              <Select value={vendor.region} onValueChange={(value) => setVendor({ ...vendor, region: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region.id} value={region.id}>
                      {language === 'en' ? region.name : region.nameFr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">
                {language === 'en' ? 'City' : 'Ville'} *
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="city"
                  value={vendor.city}
                  onChange={(e) => setVendor({ ...vendor, city: e.target.value })}
                  className="pl-10"
                  placeholder="Douala"
                  required
                />
              </div>
            </div>
          </div>

          {/* Store Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">
                {language === 'en' ? 'Store Description (English)' : 'Description du Magasin (Anglais)'}
              </Label>
              <Textarea
                id="description"
                value={vendor.storeDescription}
                onChange={(e) => setVendor({ ...vendor, storeDescription: e.target.value })}
                placeholder={language === 'en' ? 'Describe your store...' : 'Décrivez votre magasin...'}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descriptionFr">
                {language === 'en' ? 'Store Description (French)' : 'Description du Magasin (Français)'}
              </Label>
              <Textarea
                id="descriptionFr"
                value={vendor.storeDescriptionFr}
                onChange={(e) => setVendor({ ...vendor, storeDescriptionFr: e.target.value })}
                placeholder={language === 'en' ? 'Describe your store...' : 'Décrivez votre magasin...'}
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 gap-2"
        >
          <Save className="h-4 w-4" />
          {language === 'en' ? 'Save Changes' : 'Enregistrer les Modifications'}
        </Button>
      </div>
    </div>
  );
}
