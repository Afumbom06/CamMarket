import { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { ProductCard } from './ProductCard';
import { flashDeals } from '../lib/mock-data';

interface FlashSalesSectionProps {
  language: 'en' | 'fr';
  onViewProduct?: (productId: number) => void;
  onToggleWishlist?: (productId: number) => void;
  onAddToCart?: (productId: number) => void;
  wishlistItems?: number[];
}

export function FlashSalesSection({ 
  language,
  onViewProduct,
  onToggleWishlist,
  onAddToCart,
  wishlistItems = []
}: FlashSalesSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-2xl md:text-3xl text-red-600 animate-in fade-in slide-in-from-left-4">
              ⚡ {language === 'en' ? 'Flash Sales' : 'Ventes Flash'}
            </h2>
            <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg shadow-lg animate-in fade-in slide-in-from-left-8 delay-150">
              <Clock className="h-5 w-5 animate-pulse" />
              <span className="font-mono tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <div className="hidden sm:block text-sm text-gray-600 animate-in fade-in delay-300">
              {language === 'en' ? 'Hurry! Limited Time Offers' : 'Dépêchez-vous! Offres Limitées'}
            </div>
          </div>
          <Button variant="outline" className="gap-2 hover:bg-red-600 hover:text-white transition-colors">
            {language === 'en' ? 'View All' : 'Voir Tout'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {flashDeals.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              language={language}
              onViewProduct={onViewProduct}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              isInWishlist={wishlistItems.includes(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
