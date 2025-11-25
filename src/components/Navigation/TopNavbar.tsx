import { Flag, Globe, Bell, Store } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { RegionSelector } from './RegionSelector';
import { CategoriesDropdown } from './CategoriesDropdown';
import { CartIcon } from './CartIcon';
import { WishlistIcon } from './WishlistIcon';
import { UserMenu } from './UserMenu';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';

interface TopNavbarProps {
  language: 'en' | 'fr';
  onLanguageChange: (lang: 'en' | 'fr') => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  wishlistCount?: number;
  cartCount?: number;
  notificationCount?: number;
  onWishlistClick?: () => void;
  onCartClick?: () => void;
  onLogoClick?: () => void;
  onProductSelect?: (productId: number) => void;
  onCategorySelect?: (categoryId: string) => void;
  onRegionSelect?: (regionId: string) => void;
  isLoggedIn?: boolean;
  isSellerMode?: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
  onAccountClick?: () => void;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onLogout?: () => void;
  onBecomeSeller?: () => void;
  onSellerDashboard?: () => void;
  // Legacy props for backwards compatibility
  userName?: string;
  userAvatar?: string;
}

export function TopNavbar({ 
  language, 
  onLanguageChange, 
  selectedRegion, 
  onRegionChange,
  wishlistCount = 0,
  cartCount = 0,
  notificationCount = 0,
  onWishlistClick,
  onCartClick,
  onLogoClick,
  onProductSelect,
  onCategorySelect,
  onRegionSelect,
  isLoggedIn = false,
  isSellerMode = false,
  user,
  onAccountClick,
  onSignIn,
  onSignUp,
  onLogout,
  onBecomeSeller,
  onSellerDashboard,
  userName,
  userAvatar,
}: TopNavbarProps) {
  // Support both new user object and legacy userName/userAvatar props
  const displayName = user?.name || userName || 'Guest';
  const displayAvatar = user?.avatar || userAvatar;

  const handleRegionChange = (regionId: string) => {
    onRegionChange(regionId);
    onRegionSelect?.(regionId);
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect?.(categoryId);
  };

  return (
    <>
      {/* Top Bar - Cameroon Colors */}
      <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white py-2 px-4 animate-in slide-in-from-top duration-300">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">
              {language === 'en' 
                ? "Welcome to CamMarket - Cameroon's #1 Marketplace" 
                : 'Bienvenue sur CamMarket - Le Marché #1 du Cameroun'}
            </span>
            <span className="text-sm sm:hidden">
              {language === 'en' ? 'Welcome to CamMarket' : 'Bienvenue sur CamMarket'}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 gap-2 transition-all hover:scale-105"
            onClick={() => onLanguageChange(language === 'en' ? 'fr' : 'en')}
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'Français' : 'English'}
            </span>
            <span className="sm:hidden">
              {language === 'en' ? 'FR' : 'EN'}
            </span>
          </Button>
        </div>
      </div>

      {/* Main Navbar - Sticky */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm animate-in slide-in-from-top duration-300">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Menu */}
            <MobileHamburgerMenu
              language={language}
              isLoggedIn={isLoggedIn}
              userName={displayName}
              userAvatar={displayAvatar}
              onCategorySelect={handleCategoryClick}
              onRegionSelect={handleRegionChange}
            />

            {/* Logo */}
            <Logo onClick={onLogoClick} language={language} />

            {/* Region Selector - Tablet & Desktop */}
            <div className="hidden md:block">
              <RegionSelector
                selectedRegion={selectedRegion}
                onRegionChange={handleRegionChange}
                language={language}
              />
            </div>

            {/* Search Bar */}
            <SearchBar
              language={language}
              onProductSelect={onProductSelect}
              onCategorySelect={handleCategoryClick}
              onRegionSelect={handleRegionChange}
            />

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Seller Hub / Dashboard Button - Always show */}
              {isSellerMode && onSellerDashboard ? (
                /* Seller Dashboard Button - Show if in seller mode */
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onSellerDashboard}
                  className="flex gap-1 sm:gap-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <Store className="h-4 w-4" />
                  <span className="hidden sm:inline">{language === 'en' ? 'Dashboard' : 'Tableau de Bord'}</span>
                  <span className="sm:hidden">{language === 'en' ? 'Seller' : 'Vendeur'}</span>
                </Button>
              ) : onBecomeSeller ? (
                /* Become a Seller Button - Show if not in seller mode */
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onBecomeSeller}
                  className="flex gap-1 sm:gap-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <Store className="h-4 w-4" />
                  <span className="hidden sm:inline">{language === 'en' ? 'Seller Hub' : 'Espace Vendeur'}</span>
                  <span className="sm:hidden">{language === 'en' ? 'Sell' : 'Vendre'}</span>
                </Button>
              ) : null}

              {/* Sign In / Sign Up Buttons - Show if not logged in */}
              {!isLoggedIn && (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onSignIn}
                    className="hidden sm:flex"
                  >
                    {language === 'en' ? 'Sign In' : 'Se Connecter'}
                  </Button>
                  <Button 
                    size="sm"
                    onClick={onSignUp}
                    className="hidden sm:flex bg-green-600 hover:bg-green-700"
                  >
                    {language === 'en' ? 'Sign Up' : "S'inscrire"}
                  </Button>
                </>
              )}

              {/* Notifications - Hidden on small screens */}
              <Button variant="ghost" size="icon" className="relative hidden md:flex">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Badge>
                )}
              </Button>

              {/* Wishlist */}
              <WishlistIcon
                count={wishlistCount}
                onClick={onWishlistClick || (() => {})}
                language={language}
              />

              {/* Cart */}
              <CartIcon
                count={cartCount}
                onClick={onCartClick || (() => {})}
                language={language}
              />

              {/* User Menu */}
              <UserMenu
                isLoggedIn={isLoggedIn}
                userName={displayName}
                userAvatar={displayAvatar}
                language={language}
                onLanguageChange={onLanguageChange}
                onSignIn={onSignIn || onAccountClick}
                onSignUp={onSignUp || onAccountClick}
                onMyAccount={onAccountClick}
                onOrders={onAccountClick}
                onWishlist={onWishlistClick}
                onBecomeSeller={onBecomeSeller}
                onSellerDashboard={isSellerMode ? onSellerDashboard : undefined}
                onSettings={onAccountClick}
                onSignOut={onLogout}
              />
            </div>
          </div>

          {/* Categories Bar - Desktop Only */}
          <div className="hidden lg:flex items-center gap-3 mt-3 pt-3 border-t">
            <CategoriesDropdown
              onCategorySelect={handleCategoryClick}
              language={language}
            />
            <div className="h-6 w-px bg-gray-200" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500">
                {language === 'en' ? 'Quick Links:' : 'Liens Rapides:'}
              </span>
              <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                {language === 'en' ? 'Flash Sales' : 'Ventes Flash'}
              </Button>
              <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                {language === 'en' ? 'New Arrivals' : 'Nouveautés'}
              </Button>
              <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                {language === 'en' ? 'Best Sellers' : 'Meilleures Ventes'}
              </Button>
              <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                {language === 'en' ? 'Deals' : 'Offres'}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
