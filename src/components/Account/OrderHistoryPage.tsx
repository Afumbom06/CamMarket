import { useState } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle2, XCircle, Search, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { products } from '../../lib/mock-data';

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'cancelled';
  total: number;
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
  trackingNumber?: string;
}

interface OrderHistoryPageProps {
  orders: Order[];
  language: 'en' | 'fr';
  onBack: () => void;
  onViewOrderDetails: (orderId: string) => void;
}

export function OrderHistoryPage({
  orders,
  language,
  onBack,
  onViewOrderDetails,
}: OrderHistoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'delivered' | 'processing' | 'cancelled'>('all');

  const t = {
    en: {
      title: 'Order History',
      searchPlaceholder: 'Search orders...',
      all: 'All Orders',
      delivered: 'Delivered',
      processing: 'Processing',
      cancelled: 'Cancelled',
      orderId: 'Order',
      items: 'items',
      total: 'Total',
      viewDetails: 'View Details',
      noOrders: 'No orders found',
      noOrdersMessage: 'Start shopping to see your orders here',
      tracking: 'Tracking',
    },
    fr: {
      title: 'Historique des Commandes',
      searchPlaceholder: 'Rechercher des commandes...',
      all: 'Toutes',
      delivered: 'Livrées',
      processing: 'En Cours',
      cancelled: 'Annulées',
      orderId: 'Commande',
      items: 'articles',
      total: 'Total',
      viewDetails: 'Voir Détails',
      noOrders: 'Aucune commande trouvée',
      noOrdersMessage: 'Commencez vos achats pour voir vos commandes ici',
      tracking: 'Suivi',
    },
  };

  const text = t[language];

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      delivered: {
        icon: CheckCircle2,
        label: text.delivered,
        className: 'bg-green-100 text-green-700 border-green-200',
      },
      processing: {
        icon: Clock,
        label: text.processing,
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      },
      cancelled: {
        icon: XCircle,
        label: text.cancelled,
        className: 'bg-red-100 text-red-700 border-red-200',
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={`gap-1 ${config.className}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredOrders = orders
    .filter(order => {
      if (activeFilter !== 'all' && order.status !== activeFilter) return false;
      if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const orderCounts = {
    all: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    processing: orders.filter(o => o.status === 'processing').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl">{text.title}</h1>
              <p className="text-sm text-gray-500">
                {orderCounts.all} {text.all.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder={text.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Filter Tabs */}
        <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as any)} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              {text.all} ({orderCounts.all})
            </TabsTrigger>
            <TabsTrigger value="delivered">
              {text.delivered} ({orderCounts.delivered})
            </TabsTrigger>
            <TabsTrigger value="processing">
              {text.processing} ({orderCounts.processing})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              {text.cancelled} ({orderCounts.cancelled})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg mb-2">{text.noOrders}</h3>
              <p className="text-gray-500">{text.noOrdersMessage}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const orderProducts = order.items.map(item => ({
                ...products.find(p => p.id === item.productId),
                quantity: item.quantity,
                price: item.price,
              }));

              return (
                <Card
                  key={order.id}
                  className="border-0 shadow-md hover:shadow-lg transition-shadow rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => onViewOrderDetails(order.id)}
                >
                  <CardContent className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg">{text.orderId} #{order.id}</h3>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-sm text-gray-500">{text.total}</p>
                        <p className="text-xl text-green-600">
                          {order.total.toLocaleString('fr-FR')} FCFA
                        </p>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {orderProducts.slice(0, 3).map((product, index) => (
                        product && (
                          <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                            <img
                              src={product.image}
                              alt={language === 'en' ? product.name : product.nameFr}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="text-sm line-clamp-1">
                                {language === 'en' ? product.name : product.nameFr}
                              </p>
                              <p className="text-xs text-gray-500">
                                x{product.quantity}
                              </p>
                            </div>
                          </div>
                        )
                      ))}
                      {order.items.length > 3 && (
                        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-2 px-4">
                          <p className="text-sm text-gray-600">
                            +{order.items.length - 3} {language === 'en' ? 'more' : 'plus'}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Tracking Number */}
                    {order.trackingNumber && (
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg mb-4">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-700">{text.tracking}: {order.trackingNumber}</span>
                        </div>
                      </div>
                    )}

                    {/* View Details Button */}
                    <Button variant="outline" className="w-full group">
                      {text.viewDetails}
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
