import { User, LogIn, UserPlus, Package, Heart, Settings, LogOut, Store, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface UserMenuProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  language: 'en' | 'fr';
  onLanguageChange: (lang: 'en' | 'fr') => void;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onMyAccount?: () => void;
  onOrders?: () => void;
  onWishlist?: () => void;
  onBecomeSeller?: () => void;
  onSellerDashboard?: () => void;
  onSettings?: () => void;
  onSignOut?: () => void;
}

export function UserMenu({ 
  isLoggedIn = false,
  userName = 'Guest',
  userAvatar,
  language,
  onLanguageChange,
  onSignIn,
  onSignUp,
  onMyAccount,
  onOrders,
  onWishlist,
  onBecomeSeller,
  onSellerDashboard,
  onSettings,
  onSignOut,
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {isLoggedIn ? (
            <Avatar className="h-8 w-8">
              {userAvatar && <AvatarImage src={userAvatar} alt={userName} />}
              <AvatarFallback className="bg-green-100 text-green-700">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {isLoggedIn ? (
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none">{userName}</p>
                <p className="text-xs leading-none text-gray-500">
                  {language === 'en' ? 'Manage your account' : 'Gérer votre compte'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={onMyAccount} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              {language === 'en' ? 'My Account' : 'Mon Compte'}
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={onOrders} className="cursor-pointer">
              <Package className="mr-2 h-4 w-4" />
              {language === 'en' ? 'My Orders' : 'Mes Commandes'}
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={onWishlist} className="cursor-pointer">
              <Heart className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Wishlist' : 'Favoris'}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            {onSellerDashboard ? (
              <DropdownMenuItem onClick={onSellerDashboard} className="cursor-pointer bg-purple-50 text-purple-700">
                <Store className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Seller Dashboard' : 'Tableau de Bord Vendeur'}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={onBecomeSeller} className="cursor-pointer">
                <Store className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Become a Seller' : 'Devenir Vendeur'}
              </DropdownMenuItem>
            )}
            
            <DropdownMenuItem onClick={onSettings} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Settings' : 'Paramètres'}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={() => onLanguageChange(language === 'en' ? 'fr' : 'en')}
              className="cursor-pointer"
            >
              <Globe className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Language: English' : 'Langue: Français'}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={onSignOut} className="cursor-pointer text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Sign Out' : 'Déconnexion'}
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>
              {language === 'en' ? 'Welcome to CamMarket' : 'Bienvenue sur CamMarket'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={onSignIn} className="cursor-pointer">
              <LogIn className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Sign In' : 'Se Connecter'}
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={onSignUp} className="cursor-pointer">
              <UserPlus className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Create Account' : 'Créer un Compte'}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={() => onLanguageChange(language === 'en' ? 'fr' : 'en')}
              className="cursor-pointer"
            >
              <Globe className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Language: English' : 'Langue: Français'}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
