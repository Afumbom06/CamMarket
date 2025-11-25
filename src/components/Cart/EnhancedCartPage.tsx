import { useState } from 'react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Tag, TrendingDown, AlertCircle, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { regions, products } from '../../lib/mock-data';
import { DeliveryCostCalculator } from './DeliveryCostCalculator';
import { CouponInput } from './CouponInput';
import { VendorContactDialog } from './VendorContactDialog';

interface CartItem {
  productId: number;
  quantity: number;
}

interface EnhancedCartPageProps {
  language: 'en' | 'fr';
  cartItems: CartItem[];
  userRegion: string;
  onBack: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  onViewProduct: (productId: number) => void;
  onProceedToCheckout: (checkoutData: any) => void;
}

export function EnhancedCartPage({
  language,
  cartItems,
  userRegion,
  onBack,
  onUpdateQuantity,
  onRemoveFromCart,
  onViewProduct,
  onProceedToCheckout,
}: EnhancedCartPageProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<'home' | 'pickup'>('home');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | undefined>();
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const cartProducts = cartItems.map(item => ({
    ...products.find(p => p.id === item.productId)!,
    quantity: item.quantity
  }));

  // Get unique seller regions
  const sellerRegions = Array.from(new Set(cartProducts.map(p => p.region)));

  // Calculate subtotal
  const subtotal = cartProducts.reduce((sum, item) => {
    const price = item.discount
      ? item.price - (item.price * item.discount) / 100
      : item.price;
    return sum + (price * item.quantity);
  }, 0);

  // Calculate delivery fee
  const deliveryFee = deliveryMethod === 'pickup' ? 0 : (() => {
    let totalCost = 0;
    const deliveryPricing = { sameRegion: 1500, interRegion: { adjacent: 3000, far: 5000 } };
    const regionDistances: Record<string, string[]> = {
      centre: ['littoral', 'east', 'south', 'adamawa'],
      littoral: ['centre', 'west', 'southwest'],
      west: ['littoral', 'northwest', 'southwest'],
      northwest: ['west', 'adamawa'],
      southwest: ['littoral', 'west', 'south'],
      south: ['centre', 'east', 'southwest'],
      east: ['centre', 'south', 'adamawa'],
      adamawa: ['centre', 'north', 'east', 'northwest'],
      north: ['adamawa', 'far-north'],
      'far-north': ['north'],
    };

    sellerRegions.forEach(sellerRegion => {
      if (sellerRegion === userRegion) {
        totalCost += deliveryPricing.sameRegion;
      } else {
        const adjacentRegions = regionDistances[userRegion] || [];
        if (adjacentRegions.includes(sellerRegion)) {
          totalCost += deliveryPricing.interRegion.adjacent;
        } else {
          totalCost += deliveryPricing.interRegion.far;
        }
      }
    });
    return totalCost;
  })();

  // Calculate savings
  const productDiscountSavings = cartProducts.reduce((sum, item) => {
    return sum + (item.discount ? (item.price * item.discount / 100) * item.quantity : 0);
  }, 0);

  const couponSavings = appliedCoupon?.discount || 0;
  const totalSavings = productDiscountSavings + couponSavings;

  // Calculate total
  const total = subtotal + deliveryFee - couponSavings;

  const handleQuantityChange = (productId: number, delta: number) => {
    const item = cartItems.find(i => i.productId === productId);
    const product = products.find(p => p.id === productId);
    if (item && product) {
      const newQuantity = item.quantity + delta;
      if (newQuantity >= 1 && newQuantity <= product.stock) {
        onUpdateQuantity(productId, newQuantity);
      }
    }
  };

  const handleCouponApplied = (discount: number, code: string) => {
    setAppliedCoupon({ code, discount });
  };

  const handleCouponRemoved = () => {
    setAppliedCoupon(undefined);
  };

  const handleProceedToCheckout = () => {
    onProceedToCheckout({
      items: cartItems,
      subtotal,
      deliveryFee,
      couponDiscount: couponSavings,
      total,
      deliveryMethod,
      appliedCoupon: appliedCoupon?.code,
    });
  };

  const handleContactSeller = (product: any) => {
    setSelectedProduct({
      id: product.id,
      name: product.name,
      nameFr: product.nameFr,
      image: product.image,
    });
    setSelectedVendor({
      name: product.seller,
      storeName: product.seller,
      region: product.region,
      phone: '+237 677 123 456', // Mock phone
      email: `${product.seller.toLowerCase().replace(/\s/g, '')}@cammarket.cm`, // Mock email
    });
    setContactDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">
                  {language === 'en' ? 'Back' : 'Retour'}
                </span>
              </Button>
              <div>
                <h1 className="text-xl">
                  <ShoppingBag className="h-5 w-5 inline mr-2" />
                  {language === 'en' ? 'Shopping Cart' : 'Panier d\'Achats'}
                </h1>
                <p className="text-sm text-gray-500">
                  {cartProducts.length} {language === 'en' ? 'items' : 'articles'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {cartProducts.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-2xl mb-2">
                {language === 'en' ? 'Your cart is empty' : 'Votre panier est vide'}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === 'en'
                  ? 'Add items to your cart to get started'
                  : 'Ajoutez des articles à votre panier pour commencer'}
              </p>
              <Button onClick={onBack}>
                {language === 'en' ? 'Continue Shopping' : 'Continuer les Achats'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Savings Alert */}
              {totalSavings > 0 && (
                <Alert className="bg-green-50 border-green-200">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    {language === 'en' ? '🎉 You\'re saving' : '🎉 Vous économisez'} <strong>{totalSavings.toLocaleString()} FCFA</strong> {language === 'en' ? 'on your order!' : 'sur votre commande !'}
                  </AlertDescription>
                </Alert>
              )}

              {/* Cart Items List */}
              {cartProducts.map((product) => {
                const regionData = regions.find(r => r.id === product.region);
                const finalPrice = product.discount
                  ? product.price - (product.price * product.discount) / 100
                  : product.price;
                const itemTotal = finalPrice * product.quantity;
                const isLowStock = product.stock <= 5;

                return (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div
                          className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 cursor-pointer group"
                          onClick={() => onViewProduct(product.id)}
                        >
                          <ImageWithFallback
                            src={product.image}
                            alt={language === 'en' ? product.name : product.nameFr}
                            className="w-full h-full object-cover rounded-lg group-hover:opacity-75 transition-opacity"
                          />
                          {product.discount && (
                            <Badge className="absolute top-1 right-1 bg-red-600">
                              -{product.discount}%
                            </Badge>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div
                            className="cursor-pointer mb-2"
                            onClick={() => onViewProduct(product.id)}
                          >
                            <h3 className="line-clamp-2 mb-1 hover:text-green-600 transition-colors">
                              {language === 'en' ? product.name : product.nameFr}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {product.seller} • {language === 'en' ? regionData?.name : regionData?.nameFr}
                            </p>
                          </div>

                          {/* Stock Warning */}
                          {isLowStock && (
                            <div className="flex items-center gap-1 text-xs text-orange-600 mb-2">
                              <AlertCircle className="h-3 w-3" />
                              {language === 'en' ? 'Only' : 'Seulement'} {product.stock} {language === 'en' ? 'left in stock' : 'en stock'}
                            </div>
                          )}

                          {/* Contact Seller Button */}
                          <div className="mb-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={() => handleContactSeller(product)}
                            >
                              <MessageCircle className="h-3 w-3" />
                              {language === 'en' ? 'Chat with Seller' : 'Contacter le Vendeur'}
                            </Button>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            {/* Price & Quantity */}
                            <div>
                              <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-lg text-green-600">
                                  {finalPrice.toLocaleString()} FCFA
                                </span>
                                {product.discount && (
                                  <span className="text-sm text-gray-400 line-through">
                                    {product.price.toLocaleString()} FCFA
                                  </span>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(product.id, -1)}
                                  disabled={product.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-10 text-center">{product.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(product.id, 1)}
                                  disabled={product.quantity >= product.stock}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
                                  onClick={() => onRemoveFromCart(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <p className="text-lg">
                                {itemTotal.toLocaleString()} FCFA
                              </p>
                              {product.discount && (
                                <p className="text-xs text-gray-400 line-through">
                                  {(product.price * product.quantity).toLocaleString()} FCFA
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Delivery Options */}
              <DeliveryCostCalculator
                language={language}
                userRegion={userRegion}
                sellerRegions={sellerRegions}
                deliveryMethod={deliveryMethod}
                onDeliveryMethodChange={setDeliveryMethod}
              />
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl mb-4">
                    {language === 'en' ? 'Order Summary' : 'Résumé de la Commande'}
                  </h2>

                  {/* Coupon Code */}
                  <CouponInput
                    language={language}
                    subtotal={subtotal}
                    onCouponApplied={handleCouponApplied}
                    onCouponRemoved={handleCouponRemoved}
                    appliedCoupon={appliedCoupon}
                  />

                  <Separator className="my-4" />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'en' ? 'Subtotal' : 'Sous-total'}
                      </span>
                      <span>{subtotal.toLocaleString()} FCFA</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'en' ? 'Delivery Fee' : 'Frais de Livraison'}
                      </span>
                      <span>
                        {deliveryFee === 0 ? (
                          <Badge variant="secondary" className="text-xs">
                            {language === 'en' ? 'FREE' : 'GRATUIT'}
                          </Badge>
                        ) : (
                          `${deliveryFee.toLocaleString()} FCFA`
                        )}
                      </span>
                    </div>

                    {couponSavings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          {language === 'en' ? 'Coupon Discount' : 'Réduction Promo'}
                        </span>
                        <span>-{couponSavings.toLocaleString()} FCFA</span>
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between mb-6">
                    <span className="text-lg">
                      {language === 'en' ? 'Total' : 'Total'}
                    </span>
                    <span className="text-2xl text-green-600">
                      {total.toLocaleString()} FCFA
                    </span>
                  </div>

                  <Button size="lg" className="w-full mb-3" onClick={handleProceedToCheckout}>
                    {language === 'en' ? 'Proceed to Checkout' : 'Passer à la Commande'}
                  </Button>

                  <Button size="lg" variant="outline" className="w-full" onClick={onBack}>
                    {language === 'en' ? 'Continue Shopping' : 'Continuer les Achats'}
                  </Button>

                  {/* Payment Methods */}
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-gray-600 mb-2">
                      {language === 'en' ? 'We Accept:' : 'Nous Acceptons:'}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">💛 MTN</Badge>
                      <Badge variant="outline">🧡 Orange</Badge>
                      <Badge variant="outline">💳 Card</Badge>
                      <Badge variant="outline">💵 COD</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Vendor Contact Dialog */}
      {selectedVendor && selectedProduct && (
        <VendorContactDialog
          open={contactDialogOpen}
          onOpenChange={setContactDialogOpen}
          language={language}
          vendor={selectedVendor}
          product={selectedProduct}
        />
      )}
    </div>
  );
}
