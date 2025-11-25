import { useState } from 'react';
import { MapPin, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { regions } from '../../lib/mock-data';
import { toast } from 'sonner@2.0.3';

interface StoreRegionsProps {
  language: 'en' | 'fr';
  activeRegions: string[];
  onSave: (regions: string[]) => void;
}

export function StoreRegions({ language, activeRegions: initialActiveRegions, onSave }: StoreRegionsProps) {
  const [selectedRegions, setSelectedRegions] = useState<string[]>(initialActiveRegions);

  const toggleRegion = (regionId: string) => {
    setSelectedRegions(prev =>
      prev.includes(regionId)
        ? prev.filter(r => r !== regionId)
        : [...prev, regionId]
    );
  };

  const handleSave = () => {
    if (selectedRegions.length === 0) {
      toast.error(
        language === 'en' 
          ? 'Please select at least one region' 
          : 'Veuillez sélectionner au moins une région'
      );
      return;
    }

    onSave(selectedRegions);
    toast.success(
      language === 'en' 
        ? 'Store regions updated successfully' 
        : 'Régions du magasin mises à jour avec succès'
    );
  };

  const selectAll = () => {
    setSelectedRegions(regions.map(r => r.id));
  };

  const clearAll = () => {
    setSelectedRegions([]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl mb-1">
            {language === 'en' ? 'Store Regions' : 'Régions du Magasin'}
          </h2>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Select the regions where your store operates' 
              : 'Sélectionnez les régions où votre magasin opère'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={selectAll}>
            {language === 'en' ? 'Select All' : 'Tout Sélectionner'}
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            {language === 'en' ? 'Clear All' : 'Tout Effacer'}
          </Button>
        </div>
      </div>

      {/* Selected Regions Summary */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                {language === 'en' ? 'Active Regions' : 'Régions Actives'}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedRegions.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'No regions selected' : 'Aucune région sélectionnée'}
                  </p>
                ) : (
                  selectedRegions.map(regionId => {
                    const region = regions.find(r => r.id === regionId);
                    if (!region) return null;
                    return (
                      <Badge 
                        key={regionId} 
                        className="bg-green-600 hover:bg-green-700 gap-2"
                      >
                        <MapPin className="h-3 w-3" />
                        {language === 'en' ? region.name : region.nameFr}
                      </Badge>
                    );
                  })
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl text-green-700">{selectedRegions.length}</p>
              <p className="text-xs text-gray-600">
                {language === 'en' ? 'of 10 regions' : 'sur 10 régions'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regions Grid */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Select Regions' : 'Sélectionner les Régions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regions.map(region => {
              const isSelected = selectedRegions.includes(region.id);
              
              return (
                <div
                  key={region.id}
                  onClick={() => toggleRegion(region.id)}
                  className={`
                    relative p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md
                    ${isSelected 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={region.id}
                      checked={isSelected}
                      onCheckedChange={() => toggleRegion(region.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label 
                        htmlFor={region.id} 
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: region.color }}
                          />
                          <p className="text-sm">
                            {language === 'en' ? region.name : region.nameFr}
                          </p>
                        </div>
                      </Label>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                        <span>{region.vendorCount} {language === 'en' ? 'vendors' : 'vendeurs'}</span>
                        <span>•</span>
                        <span>{region.productCount} {language === 'en' ? 'products' : 'produits'}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <Badge className="bg-green-600">
                        {language === 'en' ? 'Active' : 'Actif'}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 gap-2"
          disabled={selectedRegions.length === 0}
        >
          <Save className="h-4 w-4" />
          {language === 'en' ? 'Save Regions' : 'Enregistrer les Régions'}
        </Button>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-blue-900">
            <strong>{language === 'en' ? 'Note:' : 'Remarque:'}</strong>{' '}
            {language === 'en'
              ? 'Your products will be visible to customers in the selected regions. You can change this anytime.'
              : 'Vos produits seront visibles par les clients dans les régions sélectionnées. Vous pouvez changer cela à tout moment.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
