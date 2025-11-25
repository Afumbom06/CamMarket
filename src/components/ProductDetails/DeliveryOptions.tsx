import { Truck, Home, MapPin, Clock, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface DeliveryOptionsProps {
  options: string[];
  language: 'en' | 'fr';
  deliveryFee?: number;
  estimatedDays?: string;
}

export function DeliveryOptions({ 
  options, 
  language,
  deliveryFee = 2000,
  estimatedDays = '1-3'
}: DeliveryOptionsProps) {
  const deliveryMethods = {
    'home-delivery': {
      icon: Home,
      label: language === 'en' ? 'Home Delivery' : 'Livraison à Domicile',
      description: language === 'en' 
        ? `Delivered to your doorstep in ${estimatedDays} days` 
        : `Livré à votre porte en ${estimatedDays} jours`,
      fee: deliveryFee,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    'pickup': {
      icon: MapPin,
      label: language === 'en' ? 'Pickup at Seller Location' : 'Retrait au Point de Vente',
      description: language === 'en' 
        ? 'Free pickup available' 
        : 'Retrait gratuit disponible',
      fee: 0,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    'inter-region': {
      icon: Truck,
      label: language === 'en' ? 'Inter-Region Delivery' : 'Livraison Inter-Régionale',
      description: language === 'en' 
        ? 'Delivery to other regions available' 
        : 'Livraison vers d\'autres régions disponible',
      fee: deliveryFee + 2000,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-green-600" />
          {language === 'en' ? 'Delivery Options' : 'Options de Livraison'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {options.map((option) => {
          const method = deliveryMethods[option as keyof typeof deliveryMethods];
          if (!method) return null;

          const Icon = method.icon;

          return (
            <div 
              key={option}
              className={`flex items-start gap-3 p-3 rounded-lg border ${method.bgColor} border-gray-200 transition-all hover:border-gray-300`}
            >
              <div className={`p-2 rounded-full bg-white ${method.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className={method.color}>{method.label}</p>
                  {method.fee === 0 ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {language === 'en' ? 'FREE' : 'GRATUIT'}
                    </Badge>
                  ) : (
                    <span className="text-sm text-gray-600">
                      {method.fee.toLocaleString('fr-FR')} FCFA
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>{method.description}</span>
                </div>
              </div>
            </div>
          );
        })}

        <div className="pt-3 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Coins className="h-4 w-4 text-amber-600" />
            <span>
              {language === 'en' 
                ? 'Cash on delivery available for local orders' 
                : 'Paiement à la livraison disponible pour les commandes locales'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
