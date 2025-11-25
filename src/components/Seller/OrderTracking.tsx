import { useState } from 'react';
import { Search, Eye, Package, Truck, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { toast } from 'sonner@2.0.3';
import { regions } from '../../lib/mock-data';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    name: string;
    phone: string;
    region: string;
    city: string;
    address: string;
  };
  paymentMethod: string;
  trackingNumber?: string | null;
}

interface OrderTrackingProps {
  language: 'en' | 'fr';
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: string) => void;
}

export function OrderTracking({ language, orders, onUpdateOrderStatus }: OrderTrackingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock className="h-4 w-4" />,
      processing: <Package className="h-4 w-4" />,
      shipped: <Truck className="h-4 w-4" />,
      delivered: <CheckCircle2 className="h-4 w-4" />,
      cancelled: <XCircle className="h-4 w-4" />,
    };
    return icons[status as keyof typeof icons] || icons.pending;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { 
        label: language === 'en' ? 'Pending' : 'En attente', 
        className: 'bg-yellow-100 text-yellow-700' 
      },
      processing: { 
        label: language === 'en' ? 'Processing' : 'En cours', 
        className: 'bg-blue-100 text-blue-700' 
      },
      shipped: { 
        label: language === 'en' ? 'Shipped' : 'Expédié', 
        className: 'bg-purple-100 text-purple-700' 
      },
      delivered: { 
        label: language === 'en' ? 'Delivered' : 'Livré', 
        className: 'bg-green-100 text-green-700' 
      },
      cancelled: { 
        label: language === 'en' ? 'Cancelled' : 'Annulé', 
        className: 'bg-red-100 text-red-700' 
      },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    onUpdateOrderStatus(orderId, newStatus);
    toast.success(
      language === 'en' 
        ? `Order ${orderId} status updated to ${newStatus}` 
        : `Statut de commande ${orderId} mis à jour`
    );
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const getRegionName = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    return region ? (language === 'en' ? region.name : region.nameFr) : regionId;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl mb-1">
          {language === 'en' ? 'Order Management' : 'Gestion des Commandes'}
        </h2>
        <p className="text-gray-600">
          {language === 'en' 
            ? `Track and manage your ${orders.length} orders` 
            : `Suivez et gérez vos ${orders.length} commandes`}
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder={language === 'en' ? 'Search by order ID or customer...' : 'Rechercher par ID ou client...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'en' ? 'All Status' : 'Tous les Statuts'}</SelectItem>
              <SelectItem value="pending">{language === 'en' ? 'Pending' : 'En attente'}</SelectItem>
              <SelectItem value="processing">{language === 'en' ? 'Processing' : 'En cours'}</SelectItem>
              <SelectItem value="shipped">{language === 'en' ? 'Shipped' : 'Expédié'}</SelectItem>
              <SelectItem value="delivered">{language === 'en' ? 'Delivered' : 'Livré'}</SelectItem>
              <SelectItem value="cancelled">{language === 'en' ? 'Cancelled' : 'Annulé'}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === 'en' ? 'Order ID' : 'ID Commande'}</TableHead>
                <TableHead>{language === 'en' ? 'Customer' : 'Client'}</TableHead>
                <TableHead>{language === 'en' ? 'Date' : 'Date'}</TableHead>
                <TableHead>{language === 'en' ? 'Total' : 'Total'}</TableHead>
                <TableHead>{language === 'en' ? 'Status' : 'Statut'}</TableHead>
                <TableHead>{language === 'en' ? 'Update Status' : 'Mettre à Jour'}</TableHead>
                <TableHead className="text-right">{language === 'en' ? 'Actions' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.customerPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm">
                    {order.total.toLocaleString()} FCFA
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusUpdate(order.id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">{language === 'en' ? 'Pending' : 'En attente'}</SelectItem>
                        <SelectItem value="processing">{language === 'en' ? 'Processing' : 'En cours'}</SelectItem>
                        <SelectItem value="shipped">{language === 'en' ? 'Shipped' : 'Expédié'}</SelectItem>
                        <SelectItem value="delivered">{language === 'en' ? 'Delivered' : 'Livré'}</SelectItem>
                        <SelectItem value="cancelled">{language === 'en' ? 'Cancelled' : 'Annulé'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewOrderDetails(order)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      {language === 'en' ? 'View' : 'Voir'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Order Details' : 'Détails de la Commande'} - {selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-sm mb-3">
                  {language === 'en' ? 'Customer Information' : 'Informations Client'}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="text-sm"><span className="text-gray-600">{language === 'en' ? 'Name:' : 'Nom:'}</span> {selectedOrder.customerName}</p>
                  <p className="text-sm"><span className="text-gray-600">{language === 'en' ? 'Phone:' : 'Téléphone:'}</span> {selectedOrder.customerPhone}</p>
                  <p className="text-sm"><span className="text-gray-600">{language === 'en' ? 'Payment:' : 'Paiement:'}</span> {selectedOrder.paymentMethod}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-sm mb-3">
                  {language === 'en' ? 'Shipping Address' : 'Adresse de Livraison'}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="text-sm">{selectedOrder.shippingAddress.address}</p>
                  <p className="text-sm">{selectedOrder.shippingAddress.city}, {getRegionName(selectedOrder.shippingAddress.region)}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-sm mb-3">
                  {language === 'en' ? 'Order Items' : 'Articles Commandés'}
                </h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm">{item.productName}</p>
                        <p className="text-xs text-gray-500">
                          {language === 'en' ? 'Quantity:' : 'Quantité:'} {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm">{item.price.toLocaleString()} FCFA</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 border-t">
                    <p className="text-sm">{language === 'en' ? 'Total' : 'Total'}</p>
                    <p className="text-lg text-green-600">{selectedOrder.total.toLocaleString()} FCFA</p>
                  </div>
                </div>
              </div>

              {/* Tracking */}
              {selectedOrder.trackingNumber && (
                <div>
                  <h3 className="text-sm mb-3">
                    {language === 'en' ? 'Tracking Number' : 'Numéro de Suivi'}
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono">{selectedOrder.trackingNumber}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
