import { Checkbox } from './ui/checkbox';
import { Home, MapPin, Truck } from 'lucide-react';

interface DeliveryFilterProps {
  language: 'en' | 'fr';
  selectedOptions: string[];
  onToggle: (option: string) => void;
}

export function DeliveryFilter({ language, selectedOptions, onToggle }: DeliveryFilterProps) {
  const deliveryOptions = [
    { 
      value: 'home-delivery', 
      label: language === 'en' ? 'Home Delivery' : 'Livraison à Domicile',
      icon: Home
    },
    { 
      value: 'pickup', 
      label: language === 'en' ? 'Pickup' : 'Ramassage',
      icon: MapPin
    },
    { 
      value: 'inter-region', 
      label: language === 'en' ? 'Inter-Region Delivery' : 'Livraison Inter-Régions',
      icon: Truck
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-medium">
        {language === 'en' ? 'Delivery Options' : 'Options de Livraison'}
      </h3>
      
      <div className="space-y-2">
        {deliveryOptions.map((option) => (
          <label 
            key={option.value}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          >
            <Checkbox
              checked={selectedOptions.includes(option.value)}
              onCheckedChange={() => onToggle(option.value)}
            />
            <option.icon className="h-4 w-4 text-gray-600" />
            <span className="text-sm flex-1">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
