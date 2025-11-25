import { TrendingUp, Users, Eye, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  language: 'en' | 'fr';
  analytics: {
    salesByRegion: Array<{
      region: string;
      regionName: string;
      sales: number;
      orders: number;
    }>;
    productPerformance: Array<{
      product: string;
      sales: number;
      units: number;
      views: number;
    }>;
    conversionRate: number;
    topViewedProducts: Array<{
      id: number;
      name: string;
      views: number;
    }>;
  };
}

export function Analytics({ language, analytics }: AnalyticsProps) {
  const COLORS = ['#00843D', '#FFCC00', '#4ECDC4', '#FF6B6B', '#96CEB4', '#45B7D1', '#FFA07A', '#9370DB'];

  const totalSales = analytics.salesByRegion.reduce((sum, region) => sum + region.sales, 0);
  const totalOrders = analytics.salesByRegion.reduce((sum, region) => sum + region.orders, 0);
  const totalViews = analytics.productPerformance.reduce((sum, product) => sum + product.views, 0);

  const stats = [
    {
      title: language === 'en' ? 'Conversion Rate' : 'Taux de Conversion',
      value: `${analytics.conversionRate}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: language === 'en' ? 'Total Views' : 'Vues Totales',
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: language === 'en' ? 'Active Regions' : 'Régions Actives',
      value: analytics.salesByRegion.length.toString(),
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: language === 'en' ? 'Total Orders' : 'Commandes Totales',
      value: totalOrders.toString(),
      icon: ShoppingCart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl mb-1">
          {language === 'en' ? 'Sales Analytics' : 'Analytique des Ventes'}
        </h2>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Deep insights into your store performance' 
            : 'Aperçus approfondis de la performance de votre magasin'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl">{stat.value}</p>
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Region - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Sales by Region' : 'Ventes par Région'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.salesByRegion}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.regionName}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {analytics.salesByRegion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} FCFA`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {analytics.salesByRegion.map((region, index) => (
                <div key={region.region} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs text-gray-600">
                    {region.regionName}: {region.orders} {language === 'en' ? 'orders' : 'commandes'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Performance - Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Product Performance' : 'Performance des Produits'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.productPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="product" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip formatter={(value: number) => value.toLocaleString()} />
                <Legend />
                <Bar 
                  dataKey="units" 
                  fill="#00843D" 
                  name={language === 'en' ? 'Units Sold' : 'Unités Vendues'}
                />
                <Bar 
                  dataKey="views" 
                  fill="#FFCC00" 
                  name={language === 'en' ? 'Views' : 'Vues'}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Viewed Products */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Most Viewed Products' : 'Produits les Plus Vus'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topViewedProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <p className="text-sm">{product.name}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Eye className="h-4 w-4" />
                  {product.views.toLocaleString()} {language === 'en' ? 'views' : 'vues'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Performance Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Detailed Product Stats' : 'Statistiques Détaillées des Produits'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-sm">{language === 'en' ? 'Product' : 'Produit'}</th>
                  <th className="text-right py-3 px-2 text-sm">{language === 'en' ? 'Sales' : 'Ventes'}</th>
                  <th className="text-right py-3 px-2 text-sm">{language === 'en' ? 'Units' : 'Unités'}</th>
                  <th className="text-right py-3 px-2 text-sm">{language === 'en' ? 'Views' : 'Vues'}</th>
                  <th className="text-right py-3 px-2 text-sm">{language === 'en' ? 'Conv. Rate' : 'Taux Conv.'}</th>
                </tr>
              </thead>
              <tbody>
                {analytics.productPerformance.map((product, index) => {
                  const convRate = product.views > 0 ? ((product.units / product.views) * 100).toFixed(1) : '0.0';
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm">{product.product}</td>
                      <td className="py-3 px-2 text-sm text-right text-green-600">
                        {product.sales.toLocaleString()} FCFA
                      </td>
                      <td className="py-3 px-2 text-sm text-right">{product.units}</td>
                      <td className="py-3 px-2 text-sm text-right">{product.views}</td>
                      <td className="py-3 px-2 text-sm text-right">{convRate}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
