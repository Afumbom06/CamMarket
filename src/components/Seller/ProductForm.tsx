import { useState } from 'react';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { regions } from '../../lib/mock-data';
import { toast } from 'sonner@2.0.3';

interface ProductFormProps {
  language: 'en' | 'fr';
  mode: 'add' | 'edit';
  initialData?: {
    name: string;
    nameFr: string;
    category: string;
    subcategory: string;
    price: number;
    stock: number;
    description: string;
    descriptionFr: string;
    images: string[];
    regions: string[];
    deliveryOptions: string[];
  };
  onBack: () => void;
  onSave: (data: any) => void;
}

export function ProductForm({ language, mode, initialData, onBack, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    nameFr: initialData?.nameFr || '',
    category: initialData?.category || '',
    subcategory: initialData?.subcategory || '',
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    description: initialData?.description || '',
    descriptionFr: initialData?.descriptionFr || '',
    images: initialData?.images || [],
    regions: initialData?.regions || [],
    deliveryOptions: initialData?.deliveryOptions || [],
  });

  const [imagePreview, setImagePreview] = useState<string[]>(initialData?.images || []);

  const categories = [
    { id: 'electronics', label: language === 'en' ? 'Electronics' : 'Électronique' },
    { id: 'fashion', label: language === 'en' ? 'Fashion' : 'Mode' },
    { id: 'food', label: language === 'en' ? 'Food & Beverages' : 'Alimentation' },
    { id: 'home', label: language === 'en' ? 'Home & Garden' : 'Maison & Jardin' },
    { id: 'beauty', label: language === 'en' ? 'Beauty & Health' : 'Beauté & Santé' },
    { id: 'crafts', label: language === 'en' ? 'Handicrafts' : 'Artisanat' },
  ];

  const deliveryOptionsList = [
    { id: 'standard', label: language === 'en' ? 'Standard Delivery (3-5 days)' : 'Livraison Standard (3-5 jours)' },
    { id: 'express', label: language === 'en' ? 'Express Delivery (1-2 days)' : 'Livraison Express (1-2 jours)' },
    { id: 'pickup', label: language === 'en' ? 'Store Pickup' : 'Retrait en Magasin' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you'd upload to a server here
      // For now, we'll create preview URLs
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImagePreview([...imagePreview, ...newImages]);
      setFormData({ ...formData, images: [...formData.images, ...newImages] });
    }
  };

  const removeImage = (index: number) => {
    const newImages = imagePreview.filter((_, i) => i !== index);
    setImagePreview(newImages);
    setFormData({ ...formData, images: newImages });
  };

  const toggleRegion = (regionId: string) => {
    const newRegions = formData.regions.includes(regionId)
      ? formData.regions.filter(r => r !== regionId)
      : [...formData.regions, regionId];
    setFormData({ ...formData, regions: newRegions });
  };

  const toggleDeliveryOption = (optionId: string) => {
    const newOptions = formData.deliveryOptions.includes(optionId)
      ? formData.deliveryOptions.filter(o => o !== optionId)
      : [...formData.deliveryOptions, optionId];
    setFormData({ ...formData, deliveryOptions: newOptions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.price || !formData.stock) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.images.length === 0) {
      toast.error(language === 'en' ? 'Please add at least one image' : 'Veuillez ajouter au moins une image');
      return;
    }

    if (formData.regions.length === 0) {
      toast.error(language === 'en' ? 'Please select at least one region' : 'Veuillez sélectionner au moins une région');
      return;
    }

    onSave(formData);
    toast.success(
      language === 'en'
        ? mode === 'add' ? 'Product added successfully' : 'Product updated successfully'
        : mode === 'add' ? 'Produit ajouté avec succès' : 'Produit mis à jour avec succès'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl">
            {mode === 'add'
              ? language === 'en' ? 'Add New Product' : 'Ajouter un Nouveau Produit'
              : language === 'en' ? 'Edit Product' : 'Modifier le Produit'}
          </h2>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Fill in the details below to list your product' 
              : 'Remplissez les détails ci-dessous pour lister votre produit'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Basic Information' : 'Informations de Base'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {language === 'en' ? 'Product Name (English)' : 'Nom du Produit (Anglais)'} *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Samsung Galaxy A54"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameFr">
                  {language === 'en' ? 'Product Name (French)' : 'Nom du Produit (Français)'}
                </Label>
                <Input
                  id="nameFr"
                  value={formData.nameFr}
                  onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
                  placeholder="Samsung Galaxy A54"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">{language === 'en' ? 'Category' : 'Catégorie'} *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'Select category' : 'Sélectionner la catégorie'} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subcategory">{language === 'en' ? 'Subcategory' : 'Sous-catégorie'}</Label>
                <Input
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  placeholder={language === 'en' ? 'Smartphones' : 'Smartphones'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">{language === 'en' ? 'Price (FCFA)' : 'Prix (FCFA)'} *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="285000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">{language === 'en' ? 'Stock Quantity' : 'Quantité en Stock'} *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  placeholder="15"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="description">
                  {language === 'en' ? 'Description (English)' : 'Description (Anglais)'}
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={language === 'en' ? 'Describe your product...' : 'Décrivez votre produit...'}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionFr">
                  {language === 'en' ? 'Description (French)' : 'Description (Français)'}
                </Label>
                <Textarea
                  id="descriptionFr"
                  value={formData.descriptionFr}
                  onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                  placeholder={language === 'en' ? 'Describe your product...' : 'Décrivez votre produit...'}
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Images */}
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Product Images' : 'Images du Produit'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imagePreview.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-green-600 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">{language === 'en' ? 'Upload' : 'Télécharger'}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Regions & Delivery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Target Regions */}
          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Target Regions' : 'Régions Cibles'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {regions.map(region => (
                  <div key={region.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={region.id}
                      checked={formData.regions.includes(region.id)}
                      onCheckedChange={() => toggleRegion(region.id)}
                    />
                    <Label htmlFor={region.id} className="cursor-pointer flex-1">
                      {language === 'en' ? region.name : region.nameFr}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Options */}
          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Delivery Options' : 'Options de Livraison'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deliveryOptionsList.map(option => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={formData.deliveryOptions.includes(option.id)}
                      onCheckedChange={() => toggleDeliveryOption(option.id)}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer flex-1">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={onBack}>
            {language === 'en' ? 'Cancel' : 'Annuler'}
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            {mode === 'add'
              ? language === 'en' ? 'Add Product' : 'Ajouter Produit'
              : language === 'en' ? 'Save Changes' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
