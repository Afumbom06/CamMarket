import { 
  LayoutDashboard, 
  Package, 
  Plus, 
  ShoppingBag, 
  BarChart3, 
  Wallet, 
  Settings, 
  LogOut,
  MapPin,
  Store,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { cn } from '../ui/utils';

interface SellerSidebarProps {
  language: 'en' | 'fr';
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onBackToWebsite?: () => void;
  className?: string;
}

export function SellerSidebar({ 
  language, 
  activePage, 
  onNavigate,
  onLogout,
  onBackToWebsite,
  className 
}: SellerSidebarProps) {
  const menuItems = [
    {
      id: 'overview',
      icon: LayoutDashboard,
      label: language === 'en' ? 'Dashboard' : 'Tableau de bord',
    },
    {
      id: 'products',
      icon: Package,
      label: language === 'en' ? 'My Products' : 'Mes Produits',
    },
    {
      id: 'add-product',
      icon: Plus,
      label: language === 'en' ? 'Add Product' : 'Ajouter Produit',
    },
    {
      id: 'orders',
      icon: ShoppingBag,
      label: language === 'en' ? 'Orders' : 'Commandes',
    },
    {
      id: 'analytics',
      icon: BarChart3,
      label: language === 'en' ? 'Analytics' : 'Analytique',
    },
    {
      id: 'payments',
      icon: Wallet,
      label: language === 'en' ? 'Payments' : 'Paiements',
    },
    {
      id: 'regions',
      icon: MapPin,
      label: language === 'en' ? 'Store Regions' : 'Régions du Magasin',
    },
    {
      id: 'profile',
      icon: Store,
      label: language === 'en' ? 'Store Settings' : 'Paramètres du Magasin',
    },
  ];

  return (
    <div className={cn("flex flex-col h-full bg-white border-r", className)}>
      {/* Logo Area */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
            <Store className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg">
              {language === 'en' ? 'Seller Hub' : 'Espace Vendeur'}
            </h2>
            <p className="text-xs text-gray-500">
              {language === 'en' ? 'Manage your store' : 'Gérez votre boutique'}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                "w-full justify-start gap-3 transition-all",
                isActive 
                  ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                  : 'hover:bg-gray-50'
              )}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </nav>

      {/* Back to Website & Logout */}
      <div className="p-4 border-t space-y-2">
        {onBackToWebsite && (
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            onClick={onBackToWebsite}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{language === 'en' ? 'Back to Website' : 'Retour au Site'}</span>
          </Button>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>{language === 'en' ? 'Logout' : 'Déconnexion'}</span>
        </Button>
      </div>
    </div>
  );
}
