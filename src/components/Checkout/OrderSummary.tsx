import { ShoppingBag, Tag, Truck, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { products } from '../../lib/mock-data';

interface CartItem {
  productId: number;
  quantity: number;
}

interface OrderSummaryProps {
  language: 'en' | 'fr';
  cartItems: CartItem[];
  checkoutData: {
    subtotal: number;
    deliveryFee: number;
    couponDiscount: number;
    total: number;
    deliveryMethod: 'home' | 'pickup';
    appliedCoupon?: string;
  };
}

export function OrderSummary({ language, cartItems, checkoutData }: OrderSummaryProps) {
  const cartProducts = cartItems.map(item => ({
    ...products.find(p => p.id === item.productId)!,
    quantity: item.quantity
  }));

  const totalSavings = cartProducts.reduce((sum, item) => {
    return sum + (item.discount ? (item.price * item.discount / 100) * item.quantity : 0);
  }, 0) + checkoutData.couponDiscount;

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-green-600" />
          {language === 'en' ? 'Order Summary' : 'Résumé de la Commande'}
        </h2>

        {/* Items Preview */}
        <div className="space-y-3 mb-4">
          {cartProducts.map((product) => {
            const finalPrice = product.discount
              ? product.price - (product.price * product.discount) / 100
              : product.price;

            return (
              <div key={product.id} className="flex gap-3">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={language === 'en' ? product.name : product.nameFr}
                    className="w-full h-full object-cover rounded"
                  />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {product.quantity}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm line-clamp-2">
                    {language === 'en' ? product.name : product.nameFr}
                  </p>
                  <p className="text-sm text-green-600">
                    {finalPrice.toLocaleString()} FCFA
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Separator className="my-4" />

        {/* Savings Alert */}
        {totalSavings > 0 && (
          <>
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
              <TrendingDown className="h-4 w-4 text-green-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-green-700">
                  {language === 'en' ? 'Total Savings' : 'Économies Totales'}
                </p>
                <p className="text-green-600">{totalSavings.toLocaleString()} FCFA</p>
              </div>
            </div>
          </>
        )}

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {language === 'en' ? 'Subtotal' : 'Sous-total'}
            </span>
            <span>{checkoutData.subtotal.toLocaleString()} FCFA</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <Truck className="h-4 w-4" />
              {language === 'en' ? 'Delivery' : 'Livraison'}
            </span>
            <span>
              {checkoutData.deliveryFee === 0 ? (
                <Badge variant="secondary" className="text-xs">
                  {language === 'en' ? 'FREE' : 'GRATUIT'}
                </Badge>
              ) : (
                `${checkoutData.deliveryFee.toLocaleString()} FCFA`
              )}
            </span>
          </div>

          {checkoutData.couponDiscount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                {checkoutData.appliedCoupon}
              </span>
              <span>-{checkoutData.couponDiscount.toLocaleString()} FCFA</span>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg">
            {language === 'en' ? 'Total' : 'Total'}
          </span>
          <div className="text-right">
            <span className="text-2xl text-green-600 block">
              {checkoutData.total.toLocaleString()} FCFA
            </span>
            {totalSavings > 0 && (
              <span className="text-xs text-gray-400 line-through">
                {(checkoutData.total + totalSavings).toLocaleString()} FCFA
              </span>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-600 mb-2">
            {language === 'en' ? 'We Accept:' : 'Nous Acceptons:'}
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">💛 MTN</Badge>
            <Badge variant="outline" className="text-xs">🧡 Orange</Badge>
            <Badge variant="outline" className="text-xs">💳 Card</Badge>
            <Badge variant="outline" className="text-xs">💵 COD</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
