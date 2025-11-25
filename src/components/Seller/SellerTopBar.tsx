import { Bell, Plus, Menu, X, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';

interface SellerTopBarProps {
  language: 'en' | 'fr';
  vendor: {
    storeName: string;
    ownerName: string;
    storeLogo?: string;
  };
  notificationCount?: number;
  onAddProduct: () => void;
  onViewProfile: () => void;
  onBackToWebsite?: () => void;
  onToggleMobileSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
}

export function SellerTopBar({ 
  language, 
  vendor,
  notificationCount = 0,
  onAddProduct,
  onViewProfile,
  onBackToWebsite,
  onToggleMobileSidebar,
  isMobileSidebarOpen = false,
}: SellerTopBarProps) {
  return (
    <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left: Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleMobileSidebar}
          >
            {isMobileSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          
          <div className="hidden md:block">
            <h1 className="text-xl">
              {vendor.storeName}
            </h1>
            <p className="text-xs text-gray-500">
              {language === 'en' ? 'Seller Dashboard' : 'Tableau de Bord Vendeur'}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Back to Website Button (Desktop only) */}
          {onBackToWebsite && (
            <Button 
              onClick={onBackToWebsite}
              variant="outline"
              className="gap-2 hidden md:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{language === 'en' ? 'Back to Website' : 'Retour au Site'}</span>
            </Button>
          )}

          {/* Add Product Button */}
          <Button 
            onClick={onAddProduct}
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'Add Product' : 'Ajouter'}
            </span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                {notificationCount > 9 ? '9+' : notificationCount}
              </Badge>
            )}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  {vendor.storeLogo && (
                    <AvatarImage src={vendor.storeLogo} alt={vendor.storeName} />
                  )}
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {vendor.storeName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none">{vendor.storeName}</p>
                  <p className="text-xs leading-none text-gray-500">{vendor.ownerName}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onViewProfile} className="cursor-pointer">
                {language === 'en' ? 'Store Settings' : 'Paramètres du Magasin'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
