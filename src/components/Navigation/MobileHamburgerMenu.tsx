import { Menu, X, Grid3x3, MapPin, User, Package, Settings, LogOut, Store, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '../ui/sheet';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { categories, regions } from '../../lib/mock-data';
import { getCategoryIcon } from '../../lib/category-icons';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';

interface MobileHamburgerMenuProps {
  language: 'en' | 'fr';
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  onCategorySelect?: (categoryId: string) => void;
  onRegionSelect?: (regionId: string) => void;
  onMyAccount?: () => void;
  onOrders?: () => void;
  onSettings?: () => void;
  onBecomeSeller?: () => void;
  onSignOut?: () => void;
  onSignIn?: () => void;
}

export function MobileHamburgerMenu({
  language,
  isLoggedIn = false,
  userName = 'Guest',
  userAvatar,
  onCategorySelect,
  onRegionSelect,
  onMyAccount,
  onOrders,
  onSettings,
  onBecomeSeller,
  onSignOut,
  onSignIn,
}: MobileHamburgerMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <ScrollArea className="h-full">
          <div className="flex flex-col h-full">
            {/* User Section */}
            <SheetHeader className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-white">
                  {userAvatar && <AvatarImage src={userAvatar} alt={userName} />}
                  <AvatarFallback className="bg-white text-green-600">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <SheetTitle className="text-white">{userName}</SheetTitle>
                  {isLoggedIn ? (
                    <p className="text-xs text-green-100">
                      {language === 'en' ? 'Verified Member' : 'Membre Vérifié'}
                    </p>
                  ) : (
                    <button 
                      onClick={onSignIn}
                      className="text-xs text-green-100 hover:text-white underline"
                    >
                      {language === 'en' ? 'Sign In' : 'Se Connecter'}
                    </button>
                  )}
                </div>
              </div>
            </SheetHeader>

            <div className="flex-1 p-4 space-y-6">
              {/* Categories Section */}
              <div>
                <div className="flex items-center gap-2 mb-3 px-2">
                  <Grid3x3 className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm text-gray-500">
                    {language === 'en' ? 'CATEGORIES' : 'CATÉGORIES'}
                  </h3>
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => {
                    const Icon = getCategoryIcon(cat.icon);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => onCategorySelect?.(cat.id)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-left"
                      >
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="flex-1">
                          {language === 'en' ? cat.name : cat.nameFr}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Regions Section */}
              <div>
                <div className="flex items-center gap-2 mb-3 px-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm text-gray-500">
                    {language === 'en' ? 'REGIONS' : 'RÉGIONS'}
                  </h3>
                </div>
                <div className="space-y-1">
                  {regions.slice(0, 5).map((region) => (
                    <button
                      key={region.id}
                      onClick={() => onRegionSelect?.(region.id)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-left"
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: region.color }}
                      />
                      <span className="flex-1 text-sm">
                        {language === 'en' ? region.name : region.nameFr}
                      </span>
                    </button>
                  ))}
                  <button
                    onClick={() => onRegionSelect?.('all')}
                    className="w-full text-sm text-green-600 hover:text-green-700 p-2 text-left"
                  >
                    {language === 'en' ? 'View all regions →' : 'Voir toutes les régions →'}
                  </button>
                </div>
              </div>

              {isLoggedIn && (
                <>
                  <Separator />

                  {/* Account Actions */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 px-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <h3 className="text-sm text-gray-500">
                        {language === 'en' ? 'MY ACCOUNT' : 'MON COMPTE'}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <button
                        onClick={onMyAccount}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-left"
                      >
                        <User className="h-5 w-5 text-gray-600" />
                        <span className="flex-1">
                          {language === 'en' ? 'My Profile' : 'Mon Profil'}
                        </span>
                      </button>
                      <button
                        onClick={onOrders}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-left"
                      >
                        <Package className="h-5 w-5 text-gray-600" />
                        <span className="flex-1">
                          {language === 'en' ? 'My Orders' : 'Mes Commandes'}
                        </span>
                        <Badge variant="secondary" className="text-xs">3</Badge>
                      </button>
                      <button
                        onClick={onSettings}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-left"
                      >
                        <Settings className="h-5 w-5 text-gray-600" />
                        <span className="flex-1">
                          {language === 'en' ? 'Settings' : 'Paramètres'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <Separator />

                  {/* Seller Section */}
                  <div>
                    <button
                      onClick={onBecomeSeller}
                      className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left border border-green-200"
                    >
                      <Store className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm text-green-700">
                          {language === 'en' ? 'Become a Seller' : 'Devenir Vendeur'}
                        </p>
                        <p className="text-xs text-green-600">
                          {language === 'en' ? 'Start selling today' : 'Commencez à vendre'}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-green-600" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Sign Out Button */}
            {isLoggedIn && (
              <div className="p-4 border-t">
                <button
                  onClick={onSignOut}
                  className="w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{language === 'en' ? 'Sign Out' : 'Déconnexion'}</span>
                </button>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
