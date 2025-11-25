import { TrendingUp, ShoppingBag, Package, DollarSign, Eye, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesOverviewProps {
  language: 'en' | 'fr';
  analytics: {
    totalSales: number;
    totalOrders: number;
    totalProducts: number;
    productsSold: number;
  };
  recentOrders: Array<{
    id: string;
    customerName: string;
    total: number;
    status: string;
    date: string;
  }>;
  bestSellers: Array<{
    product: string;
    sales: number;
    units: number;
  }>;
}

export function SalesOverview({ language, analytics, recentOrders, bestSellers }: SalesOverviewProps) {
  // Mock sales data for the graph
  const salesData = [
    { day: language === 'en' ? 'Mon' : 'Lun', sales: 245000 },
    { day: language === 'en' ? 'Tue' : 'Mar', sales: 312000 },
    { day: language === 'en' ? 'Wed' : 'Mer', sales: 189000 },
    { day: language === 'en' ? 'Thu' : 'Jeu', sales: 428000 },
    { day: language === 'en' ? 'Fri' : 'Ven', sales: 567000 },
    { day: language === 'en' ? 'Sat' : 'Sam', sales: 623000 },
    { day: language === 'en' ? 'Sun' : 'Dim', sales: 451000 },
  ];

  const stats = [
    {
      title: language === 'en' ? 'Total Sales' : 'Ventes Totales',
      value: `${analytics.totalSales.toLocaleString()} FCFA`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+12.5%',
    },
    {
      title: language === 'en' ? 'Total Orders' : 'Commandes Totales',
      value: analytics.totalOrders.toString(),
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+8.2%',
    },
    {
      title: language === 'en' ? 'Products Sold' : 'Produits Vendus',
      value: analytics.productsSold.toString(),
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: '+15.3%',
    },
    {
      title: language === 'en' ? 'Total Products' : 'Produits Totaux',
      value: analytics.totalProducts.toString(),
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: '+3',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: language === 'en' ? 'Pending' : 'En attente', className: 'bg-yellow-100 text-yellow-700' },
      processing: { label: language === 'en' ? 'Processing' : 'En cours', className: 'bg-blue-100 text-blue-700' },
      shipped: { label: language === 'en' ? 'Shipped' : 'Expédié', className: 'bg-purple-100 text-purple-700' },
      delivered: { label: language === 'en' ? 'Delivered' : 'Livré', className: 'bg-green-100 text-green-700' },
      cancelled: { label: language === 'en' ? 'Cancelled' : 'Annulé', className: 'bg-red-100 text-red-700' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl mb-2">{stat.value}</p>
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <ArrowUpRight className="h-4 w-4" />
                      <span>{stat.trend}</span>
                      <span className="text-gray-500 text-xs ml-1">
                        {language === 'en' ? 'vs last week' : 'vs semaine dernière'}
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sales Graph */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Revenue This Week' : 'Revenus Cette Semaine'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `${value.toLocaleString()} FCFA`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#00843D" 
                strokeWidth={2}
                name={language === 'en' ? 'Sales' : 'Ventes'}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Sellers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {language === 'en' ? 'Best Selling Products' : 'Produits les Plus Vendus'}
            </CardTitle>
            <Badge variant="outline">
              {language === 'en' ? 'Top 3' : 'Top 3'}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bestSellers.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm">{product.product}</p>
                      <p className="text-xs text-gray-500">
                        {product.units} {language === 'en' ? 'units sold' : 'unités vendues'}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-green-600">
                    {product.sales.toLocaleString()} FCFA
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {language === 'en' ? 'Recent Orders' : 'Commandes Récentes'}
            </CardTitle>
            <Button variant="link" size="sm">
              {language === 'en' ? 'View All' : 'Voir Tout'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.slice(0, 4).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm mb-1">{order.customerName}</p>
                    <p className="text-xs text-gray-500">
                      {order.id} • {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm">{order.total.toLocaleString()} FCFA</p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
