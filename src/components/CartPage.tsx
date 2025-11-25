import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { regions, products } from '../lib/mock-data';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartPageProps {
  language: 'en' | 'fr';
  cartItems: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  onViewProduct: (productId: number) => void;
}

export function CartPage({ 
  language, 
  cartItems, 
  onBack, 
  onUpdateQuantity,
  onRemoveFromCart,
  onViewProduct
}: CartPageProps) {
  const cartProducts = cartItems.map(item => ({
    ...products.find(p => p.id === item.productId)!,
    quantity: item.quantity
  }));

  const subtotal = cartProducts.reduce((sum, item) => {
    const price = item.discount 
      ? item.price - (item.price * item.discount) / 100 
      : item.price;
    return sum + (price * item.quantity);
  }, 0);

  const deliveryFee = 2000; // Fixed delivery fee
  const total = subtotal + deliveryFee;
  const savings = cartProducts.reduce((sum, item) => {
    return sum + (item.discount ? (item.price * item.discount / 100) * item.quantity : 0);
  }, 0);

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

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-5 w-5" />
                {language === 'en' ? 'Back' : 'Retour'}
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
              {cartProducts.map((product) => {
                const regionData = regions.find(r => r.id === product.region);
                const finalPrice = product.discount
                  ? product.price - (product.price * product.discount) / 100
                  : product.price;
                const itemTotal = finalPrice * product.quantity;

                return (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div 
                          className="relative w-24 h-24 flex-shrink-0 cursor-pointer"
                          onClick={() => onViewProduct(product.id)}
                        >
                          <ImageWithFallback
                            src={product.image}
                            alt={language === 'en' ? product.name : product.nameFr}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div 
                            className="cursor-pointer mb-2"
                            onClick={() => onViewProduct(product.id)}
                          >
                            <h3 className="line-clamp-2 mb-1">
                              {language === 'en' ? product.name : product.nameFr}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {product.seller} • {language === 'en' ? regionData?.name : regionData?.nameFr}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-lg text-green-600">
                                  {finalPrice.toLocaleString()} FCFA
                                </span>
                                {product.discount && (
                                  <Badge variant="destructive" className="text-xs">
                                    -{product.discount}%
                                  </Badge>
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
                                <span className="w-8 text-center">{product.quantity}</span>
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
                                  className="h-8 w-8 text-red-600 hover:text-red-700 ml-2"
                                  onClick={() => onRemoveFromCart(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

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
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl mb-4">
                    {language === 'en' ? 'Order Summary' : 'Résumé de la Commande'}
                  </h2>

                  {/* Coupon Code */}
                  <div className="mb-4">
                    <label className="block text-sm mb-2">
                      {language === 'en' ? 'Coupon Code' : 'Code Promo'}
                    </label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder={language === 'en' ? 'Enter code' : 'Entrer le code'}
                        className="flex-1"
                      />
                      <Button variant="outline">
                        {language === 'en' ? 'Apply' : 'Appliquer'}
                      </Button>
                    </div>
                  </div>

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
                      <span>{deliveryFee.toLocaleString()} FCFA</span>
                    </div>

                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          {language === 'en' ? 'Savings' : 'Économies'}
                        </span>
                        <span>-{savings.toLocaleString()} FCFA</span>
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

                  <Button size="lg" className="w-full mb-3">
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
                      <Badge variant="outline">MTN Momo</Badge>
                      <Badge variant="outline">Orange Money</Badge>
                      <Badge variant="outline">PayPal</Badge>
                      <Badge variant="outline">Card</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
