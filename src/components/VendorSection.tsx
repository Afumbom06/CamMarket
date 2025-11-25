import { useRef } from 'react';
import { Star, Package, CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { vendors, regions } from '../lib/mock-data';

interface VendorSectionProps {
  language: 'en' | 'fr';
}

export function VendorSection({ language }: VendorSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl mb-2">
              {language === 'en' ? 'Top Vendors by Region' : 'Meilleurs Vendeurs par Région'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Verified sellers from across Cameroon' 
                : 'Vendeurs vérifiés de tout le Cameroun'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => scroll('left')}
              className="hidden md:flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => scroll('right')}
              className="hidden md:flex"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2 hidden sm:flex">
              {language === 'en' ? 'All Vendors' : 'Tous les Vendeurs'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {vendors.map((vendor) => {
            const regionData = regions.find(r => r.id === vendor.region);
            
            return (
              <Card 
                key={vendor.id} 
                className="flex-shrink-0 w-80 hover:shadow-xl transition-all duration-300 snap-start group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-16 w-16 ring-2 ring-offset-2 group-hover:ring-4 transition-all" style={{ ringColor: regionData?.color }}>
                      <AvatarFallback className="text-lg" style={{ backgroundColor: regionData?.color }}>
                        {vendor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="group-hover:text-green-600 transition-colors">{vendor.name}</h3>
                        {vendor.verified && (
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-500">
                          {language === 'en' ? regionData?.name : regionData?.nameFr}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {vendor.badge}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{vendor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Package className="h-4 w-4" />
                          <span>{vendor.products} products</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full group-hover:bg-green-600 group-hover:text-white transition-colors">
                    {language === 'en' ? 'Visit Store' : 'Visiter la Boutique'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Scroll Hint for Mobile */}
        <p className="text-center text-sm text-gray-500 mt-4 md:hidden">
          {language === 'en' ? '← Swipe to see more vendors →' : '← Glissez pour voir plus de vendeurs →'}
        </p>
      </div>
    </section>
  );
}
