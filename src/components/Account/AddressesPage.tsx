import { useState } from 'react';
import { ArrowLeft, MapPin, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { regions } from '../../lib/mock-data';
import { toast } from 'sonner@2.0.3';

interface Address {
  id: number;
  name: string;
  phone: string;
  region: string;
  city: string;
  address: string;
  isDefault: boolean;
}

interface AddressesPageProps {
  addresses: Address[];
  language: 'en' | 'fr';
  onBack: () => void;
  onAddAddress: (address: Omit<Address, 'id'>) => void;
  onUpdateAddress: (id: number, address: Omit<Address, 'id'>) => void;
  onDeleteAddress: (id: number) => void;
  onSetDefaultAddress: (id: number) => void;
}

export function AddressesPage({
  addresses,
  language,
  onBack,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
  onSetDefaultAddress,
}: AddressesPageProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingAddressId, setDeletingAddressId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    city: '',
    address: '',
    isDefault: false,
  });

  const t = {
    en: {
      title: 'Delivery Addresses',
      addAddress: 'Add New Address',
      editAddress: 'Edit Address',
      delete: 'Delete',
      edit: 'Edit',
      setDefault: 'Set as Default',
      default: 'Default',
      name: 'Full Name',
      phone: 'Phone Number',
      region: 'Region',
      city: 'City/Town',
      address: 'Street Address',
      save: 'Save Address',
      cancel: 'Cancel',
      deleteTitle: 'Delete Address',
      deleteMessage: 'Are you sure you want to delete this address?',
      noAddresses: 'No addresses saved',
      noAddressesMessage: 'Add your first delivery address',
    },
    fr: {
      title: 'Adresses de Livraison',
      addAddress: 'Ajouter une Adresse',
      editAddress: 'Modifier l\'Adresse',
      delete: 'Supprimer',
      edit: 'Modifier',
      setDefault: 'Définir par Défaut',
      default: 'Par Défaut',
      name: 'Nom Complet',
      phone: 'Numéro de Téléphone',
      region: 'Région',
      city: 'Ville',
      address: 'Adresse',
      save: 'Enregistrer',
      cancel: 'Annuler',
      deleteTitle: 'Supprimer l\'Adresse',
      deleteMessage: 'Êtes-vous sûr de vouloir supprimer cette adresse?',
      noAddresses: 'Aucune adresse enregistrée',
      noAddressesMessage: 'Ajoutez votre première adresse de livraison',
    },
  };

  const text = t[language];

  const openAddDialog = () => {
    setFormData({
      name: '',
      phone: '',
      region: '',
      city: '',
      address: '',
      isDefault: addresses.length === 0,
    });
    setEditingAddress(null);
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (address: Address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      region: address.region,
      city: address.city,
      address: address.address,
      isDefault: address.isDefault,
    });
    setEditingAddress(address);
    setIsAddDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.phone || !formData.region || !formData.city || !formData.address) {
      toast.error(language === 'en' ? 'Please fill all fields' : 'Veuillez remplir tous les champs');
      return;
    }

    if (editingAddress) {
      onUpdateAddress(editingAddress.id, formData);
      toast.success(language === 'en' ? 'Address updated' : 'Adresse mise à jour');
    } else {
      onAddAddress(formData);
      toast.success(language === 'en' ? 'Address added' : 'Adresse ajoutée');
    }

    setIsAddDialogOpen(false);
  };

  const handleDelete = () => {
    if (deletingAddressId) {
      onDeleteAddress(deletingAddressId);
      toast.success(language === 'en' ? 'Address deleted' : 'Adresse supprimée');
      setDeletingAddressId(null);
    }
  };

  const getRegionName = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    return region ? (language === 'en' ? region.name : region.nameFr) : regionId;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl">{text.title}</h1>
                <p className="text-sm text-gray-500">
                  {addresses.length} {language === 'en' ? 'saved' : 'enregistrées'}
                </p>
              </div>
            </div>
            <Button onClick={openAddDialog} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              {text.addAddress}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {addresses.length === 0 ? (
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg mb-2">{text.noAddresses}</h3>
              <p className="text-gray-500 mb-6">{text.noAddressesMessage}</p>
              <Button onClick={openAddDialog} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                {text.addAddress}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {addresses.map((address) => (
              <Card
                key={address.id}
                className={`border-0 shadow-md hover:shadow-lg transition-shadow rounded-2xl overflow-hidden ${
                  address.isDefault ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg">{address.name}</h3>
                          {address.isDefault && (
                            <Badge className="bg-green-100 text-green-700">
                              <Check className="h-3 w-3 mr-1" />
                              {text.default}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{address.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(address)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingAddressId(address.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>{address.address}</p>
                    <p>{address.city}, {getRegionName(address.region)}</p>
                  </div>

                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSetDefaultAddress(address.id)}
                      className="mt-4"
                    >
                      {text.setDefault}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingAddress ? text.editAddress : text.addAddress}</DialogTitle>
            <DialogDescription>
              {language === 'en'
                ? 'Enter your delivery address details'
                : 'Entrez les détails de votre adresse de livraison'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{text.name}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={text.name}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{text.phone}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+237 6XX XXX XXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">{text.region}</Label>
              <Select
                value={formData.region}
                onValueChange={(value) => setFormData({ ...formData, region: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={text.region} />
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

            <div className="space-y-2">
              <Label htmlFor="city">{text.city}</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder={text.city}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{text.address}</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder={text.address}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {text.cancel}
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              {text.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingAddressId} onOpenChange={() => setDeletingAddressId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{text.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>{text.deleteMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{text.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              {text.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
