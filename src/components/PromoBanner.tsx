import { Sparkles, Gift, Zap } from 'lucide-react';
import { Button } from './ui/button';

interface PromoBannerProps {
  language: 'en' | 'fr';
}

export function PromoBanner({ language }: PromoBannerProps) {
  const promos = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      text: language === 'en' ? 'New Arrivals Daily' : 'Nouveautés Quotidiennes',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: <Gift className="h-5 w-5" />,
      text: language === 'en' ? 'Free Shipping on Orders 50,000+ FCFA' : 'Livraison Gratuite dès 50,000 FCFA',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: <Zap className="h-5 w-5" />,
      text: language === 'en' ? 'Flash Deals Every Week' : 'Ventes Flash Chaque Semaine',
      color: 'from-orange-600 to-red-600'
    }
  ];

  return (
    <section className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {promos.map((promo, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 text-white animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`p-2 rounded-full bg-gradient-to-br ${promo.color}`}>
                {promo.icon}
              </div>
              <span className="text-sm hidden sm:inline">{promo.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
