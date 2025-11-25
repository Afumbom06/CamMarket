import { Package, Heart, MapPin, Settings, ShoppingBag, Clock, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

interface UserDashboardProps {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    joinDate: string;
    verified: boolean;
  };
  language: 'en' | 'fr';
  onNavigateToOrders: () => void;
  onNavigateToWishlist: () => void;
  onNavigateToAddresses: () => void;
  onNavigateToSettings: () => void;
  onEditProfile: () => void;
  ordersCount?: number;
  wishlistCount?: number;
  addressesCount?: number;
  isLoading?: boolean;
}

export function UserDashboard({
  user,
  language,
  onNavigateToOrders,
  onNavigateToWishlist,
  onNavigateToAddresses,
  onNavigateToSettings,
  onEditProfile,
  ordersCount = 0,
  wishlistCount = 0,
  addressesCount = 0,
  isLoading = false,
}: UserDashboardProps) {
  const t = {
    en: {
      title: 'My Account',
      memberSince: 'Member since',
      verified: 'Verified',
      editProfile: 'Edit Profile',
      myOrders: 'My Orders',
      orders: 'Orders',
      wishlist: 'Wishlist',
      items: 'Items',
      addresses: 'Addresses',
      locations: 'Locations',
      settings: 'Settings',
      recentActivity: 'Recent Activity',
      quickActions: 'Quick Actions',
      viewAll: 'View All',
    },
    fr: {
      title: 'Mon Compte',
      memberSince: 'Membre depuis',
      verified: 'Vérifié',
      editProfile: 'Modifier le Profil',
      myOrders: 'Mes Commandes',
      orders: 'Commandes',
      wishlist: 'Favoris',
      items: 'Articles',
      addresses: 'Adresses',
      locations: 'Emplacements',
      settings: 'Paramètres',
      recentActivity: 'Activité Récente',
      quickActions: 'Actions Rapides',
      viewAll: 'Voir Tout',
    },
  };

  const text = t[language];

  const quickActions = [
    {
      id: 'orders',
      icon: Package,
      label: text.myOrders,
      count: ordersCount,
      color: 'from-blue-500 to-blue-600',
      onClick: onNavigateToOrders,
    },
    {
      id: 'wishlist',
      icon: Heart,
      label: text.wishlist,
      count: wishlistCount,
      color: 'from-red-500 to-red-600',
      onClick: onNavigateToWishlist,
    },
    {
      id: 'addresses',
      icon: MapPin,
      label: text.addresses,
      count: addressesCount,
      color: 'from-green-500 to-green-600',
      onClick: onNavigateToAddresses,
    },
    {
      id: 'settings',
      icon: Settings,
      label: text.settings,
      count: null,
      color: 'from-gray-500 to-gray-600',
      onClick: onNavigateToSettings,
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* User Profile Header */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                <AvatarFallback className="bg-white text-green-600 text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl">{user.name}</h1>
                  {user.verified && (
                    <Badge className="bg-white text-green-600 hover:bg-white/90 w-fit mx-auto md:mx-0">
                      {text.verified}
                    </Badge>
                  )}
                </div>
                <p className="text-green-100 mb-1">{user.email}</p>
                <p className="text-green-100 mb-3">{user.phone}</p>
                <p className="text-sm text-green-200">
                  {text.memberSince} {new Date(user.joinDate).toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>

              {/* Edit Button */}
              <Button
                onClick={onEditProfile}
                variant="secondary"
                className="bg-white text-green-600 hover:bg-green-50"
              >
                {text.editProfile}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Section */}
        <div>
          <h2 className="text-xl mb-6">{text.quickActions}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className="group text-left"
                >
                  <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105 rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        {action.count !== null && (
                          <Badge variant="secondary" className="text-lg px-3">
                            {action.count}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg mb-1">{action.label}</h3>
                      <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                        {text.viewAll} →
                      </p>
                    </CardContent>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Total Orders' : 'Total Commandes'}
                  </p>
                  <p className="text-2xl">{ordersCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Pending Orders' : 'Commandes en Cours'}
                  </p>
                  <p className="text-2xl">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Reward Points' : 'Points de Récompense'}
                  </p>
                  <p className="text-2xl">450</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
