import { useState } from 'react';
import { Home, Grid3x3, MapPin, ShoppingCart, User } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { regions } from '../../lib/mock-data';
import { ScrollArea } from '../ui/scroll-area';

interface MobileBottomNavProps {
  language: 'en' | 'fr';
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount?: number;
  selectedRegion?: string;
  onRegionChange?: (regionId: string) => void;
}

export function MobileBottomNav({ 
  language, 
  activeTab, 
  onTabChange,
  cartCount = 0,
  selectedRegion = 'all',
  onRegionChange,
}: MobileBottomNavProps) {
  const [isRegionSheetOpen, setIsRegionSheetOpen] = useState(false);

  const tabs = [
    { 
      id: 'home', 
      icon: Home, 
      label: language === 'en' ? 'Home' : 'Accueil' 
    },
    { 
      id: 'categories', 
      icon: Grid3x3, 
      label: language === 'en' ? 'Categories' : 'Catégories' 
    },
    { 
      id: 'regions', 
      icon: MapPin, 
      label: language === 'en' ? 'Regions' : 'Régions',
      special: true 
    },
    { 
      id: 'cart', 
      icon: ShoppingCart, 
      label: language === 'en' ? 'Cart' : 'Panier', 
      badge: cartCount 
    },
    { 
      id: 'account', 
      icon: User, 
      label: language === 'en' ? 'Account' : 'Compte' 
    },
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === 'regions') {
      setIsRegionSheetOpen(true);
    } else {
      onTabChange(tabId);
    }
  };

  const handleRegionSelect = (regionId: string) => {
    onRegionChange?.(regionId);
    setIsRegionSheetOpen(false);
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 lg:hidden animate-in slide-in-from-bottom duration-300">
        <div className="grid grid-cols-5 h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 transition-all relative ${
                  isActive 
                    ? 'text-green-600 scale-105' 
                    : 'text-gray-600 hover:text-green-500'
                }`}
              >
                <div className="relative">
                  <Icon className={`h-5 w-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  {tab.badge && tab.badge > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs animate-in zoom-in duration-200">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </Badge>
                  )}
                </div>
                <span className={`text-xs transition-all ${isActive ? '' : ''}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-green-600 rounded-b animate-in slide-in-from-top duration-200" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Region Selector Sheet */}
      <Sheet open={isRegionSheetOpen} onOpenChange={setIsRegionSheetOpen}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>
              {language === 'en' ? 'Select Region' : 'Sélectionner la Région'}
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100%-60px)] mt-4">
            <div className="space-y-2">
              {/* All Regions Option */}
              <button
                onClick={() => handleRegionSelect('all')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                  selectedRegion === 'all'
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className={selectedRegion === 'all' ? 'text-green-700' : 'text-gray-900'}>
                    {language === 'en' ? 'All Regions' : 'Toutes les Régions'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {language === 'en' ? 'Browse all products' : 'Parcourir tous les produits'}
                  </p>
                </div>
                {selectedRegion === 'all' && (
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </button>

              {/* Individual Regions */}
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleRegionSelect(region.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    selectedRegion === region.id
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${region.color}20` }}
                  >
                    <MapPin 
                      className="h-6 w-6" 
                      style={{ color: region.color }} 
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={selectedRegion === region.id ? 'text-green-700' : 'text-gray-900'}>
                      {language === 'en' ? region.name : region.nameFr}
                    </p>
                    <p className="text-xs text-gray-500">
                      {region.vendorCount} {language === 'en' ? 'vendors' : 'vendeurs'} • {region.productCount} {language === 'en' ? 'products' : 'produits'}
                    </p>
                  </div>
                  {selectedRegion === region.id && (
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: region.color }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
