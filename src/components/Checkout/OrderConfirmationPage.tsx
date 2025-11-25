import { CheckCircle2, Package, Truck, Home, ShoppingBag, MapPin, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';
import { products, regions } from '../../lib/mock-data';

interface OrderConfirmationPageProps {
  language: 'en' | 'fr';
  orderDetails: {
    orderId: string;
    items: { productId: number; quantity: number }[];
    deliveryAddress?: any;
    deliveryMethod: 'home' | 'pickup';
    paymentMethod: string;
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    estimatedDelivery: string;
  };
  onTrackOrder: () => void;
  onReturnHome: () => void;
  onContinueShopping: () => void;
}

export function OrderConfirmationPage({
  language,
  orderDetails,
  onTrackOrder,
  onReturnHome,
  onContinueShopping,
}: OrderConfirmationPageProps) {
  const cartProducts = orderDetails.items.map(item => ({
    ...products.find(p => p.id === item.productId)!,
    quantity: item.quantity
  }));

  const getPaymentMethodName = (method: string) => {
    const methods: Record<string, { en: string; fr: string }> = {
      'mtn-momo': { en: 'MTN Mobile Money', fr: 'MTN Mobile Money' },
      'orange-money': { en: 'Orange Money', fr: 'Orange Money' },
      'card': { en: 'Credit/Debit Card', fr: 'Carte Bancaire' },
      'cash-on-delivery': { en: 'Cash on Delivery', fr: 'Paiement à la Livraison' },
    };
    return methods[method]?.[language] || method;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-600 to-green-700 rounded-full mb-4 shadow-lg">
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl mb-2"
          >
            {language === 'en' ? '🎉 Order Placed Successfully!' : '🎉 Commande Passée avec Succès !'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            {language === 'en'
              ? 'Thank you for your order! We\'re processing it now.'
              : 'Merci pour votre commande ! Nous la traitons maintenant.'}
          </motion.p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-6">
            <CardContent className="p-6">
              {/* Order ID */}
              <div className="text-center mb-6 pb-6 border-b">
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'en' ? 'Order Number' : 'Numéro de Commande'}
                </p>
                <p className="text-2xl text-green-600">{orderDetails.orderId}</p>
              </div>

              {/* Delivery Estimate */}
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                <Truck className="h-8 w-8 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Estimated Delivery' : 'Livraison Estimée'}
                  </p>
                  <p className="text-green-700">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="mb-6">
                <h3 className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-green-600" />
                  {language === 'en' ? 'Delivery Information' : 'Informations de Livraison'}
                </h3>
                {orderDetails.deliveryMethod === 'pickup' ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Package className="h-5 w-5 inline mr-2 text-green-600" />
                    <span className="text-sm">
                      {language === 'en'
                        ? 'Pickup from seller locations (details will be sent to you)'
                        : 'Retrait aux emplacements des vendeurs (les détails vous seront envoyés)'}
                    </span>
                  </div>
                ) : orderDetails.deliveryAddress ? (
                  <div className="p-4 bg-gray-50 rounded-lg text-sm">
                    <p>{orderDetails.deliveryAddress.name}</p>
                    <p className="text-gray-600">{orderDetails.deliveryAddress.address}</p>
                    <p className="text-gray-600">
                      {orderDetails.deliveryAddress.city}, {regions.find(r => r.id === orderDetails.deliveryAddress.region)?.[language === 'en' ? 'name' : 'nameFr']}
                    </p>
                    <p className="text-gray-600">{orderDetails.deliveryAddress.phone}</p>
                  </div>
                ) : null}
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  {language === 'en' ? 'Payment Method' : 'Mode de Paiement'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg text-sm">
                  {getPaymentMethodName(orderDetails.paymentMethod)}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="flex items-center gap-2 mb-3">
                  <ShoppingBag className="h-5 w-5 text-green-600" />
                  {language === 'en' ? 'Order Items' : 'Articles Commandés'}
                </h3>
                <div className="space-y-2">
                  {cartProducts.map((product) => {
                    const finalPrice = product.discount
                      ? product.price - (product.price * product.discount) / 100
                      : product.price;
                    const itemTotal = finalPrice * product.quantity;

                    return (
                      <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                        <div className="flex-1">
                          <p>{language === 'en' ? product.name : product.nameFr}</p>
                          <p className="text-gray-600">
                            {language === 'en' ? 'Qty:' : 'Qté:'} {product.quantity} × {finalPrice.toLocaleString()} FCFA
                          </p>
                        </div>
                        <p>{itemTotal.toLocaleString()} FCFA</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Price Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{language === 'en' ? 'Subtotal' : 'Sous-total'}</span>
                  <span>{orderDetails.subtotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{language === 'en' ? 'Delivery Fee' : 'Frais de Livraison'}</span>
                  <span>
                    {orderDetails.deliveryFee === 0 ? (
                      <Badge variant="secondary" className="text-xs">{language === 'en' ? 'FREE' : 'GRATUIT'}</Badge>
                    ) : (
                      `${orderDetails.deliveryFee.toLocaleString()} FCFA`
                    )}
                  </span>
                </div>
                {orderDetails.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>{language === 'en' ? 'Discount' : 'Réduction'}</span>
                    <span>-{orderDetails.discount.toLocaleString()} FCFA</span>
                  </div>
                )}
                <Separator className="my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-lg">{language === 'en' ? 'Total Paid' : 'Total Payé'}</span>
                  <span className="text-2xl text-green-600">{orderDetails.total.toLocaleString()} FCFA</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          <Button size="lg" onClick={onTrackOrder} className="gap-2">
            <Package className="h-5 w-5" />
            {language === 'en' ? 'Track Order' : 'Suivre la Commande'}
          </Button>
          <Button size="lg" variant="outline" onClick={onContinueShopping} className="gap-2">
            <ShoppingBag className="h-5 w-5" />
            {language === 'en' ? 'Continue Shopping' : 'Continuer les Achats'}
          </Button>
        </motion.div>

        {/* Return Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-6"
        >
          <Button variant="ghost" onClick={onReturnHome} className="gap-2 text-gray-600">
            <Home className="h-4 w-4" />
            {language === 'en' ? 'Return to Home' : 'Retour à l\'Accueil'}
          </Button>
        </motion.div>

        {/* Support Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-sm text-gray-600"
        >
          <p>
            {language === 'en'
              ? '📧 Order confirmation has been sent to your email'
              : '📧 La confirmation de commande a été envoyée à votre email'}
          </p>
          <p className="mt-2">
            {language === 'en'
              ? 'Need help? Contact our support team'
              : 'Besoin d\'aide ? Contactez notre équipe de support'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
