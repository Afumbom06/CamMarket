import { useState } from 'react';
import { ArrowLeft, ShoppingBag, CreditCard, MapPin, Package, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { DeliveryInformation } from './DeliveryInformation';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { OrderSummary } from './OrderSummary';
import { products } from '../../lib/mock-data';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CheckoutPageProps {
  language: 'en' | 'fr';
  cartItems: CartItem[];
  userRegion: string;
  checkoutData: {
    subtotal: number;
    deliveryFee: number;
    couponDiscount: number;
    total: number;
    deliveryMethod: 'home' | 'pickup';
    appliedCoupon?: string;
  };
  onBack: () => void;
  onPlaceOrder: (orderDetails: any) => void;
  isLoggedIn: boolean;
  userAddresses?: any[];
}

export function CheckoutPage({
  language,
  cartItems,
  userRegion,
  checkoutData,
  onBack,
  onPlaceOrder,
  isLoggedIn,
  userAddresses = [],
}: CheckoutPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<any>(userAddresses.find(a => a.isDefault) || null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const cartProducts = cartItems.map(item => ({
    ...products.find(p => p.id === item.productId)!,
    quantity: item.quantity
  }));

  const steps = [
    { id: 1, name: language === 'en' ? 'Delivery' : 'Livraison', icon: MapPin },
    { id: 2, name: language === 'en' ? 'Payment' : 'Paiement', icon: CreditCard },
    { id: 3, name: language === 'en' ? 'Review' : 'Revue', icon: CheckCircle2 },
  ];

  const handleContinueToPayment = () => {
    if (!selectedAddress && checkoutData.deliveryMethod === 'home') {
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueToReview = () => {
    if (!paymentMethod) {
      return;
    }
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      const orderDetails = {
        items: cartItems,
        deliveryAddress: selectedAddress,
        deliveryMethod: checkoutData.deliveryMethod,
        paymentMethod,
        paymentDetails,
        subtotal: checkoutData.subtotal,
        deliveryFee: checkoutData.deliveryFee,
        discount: checkoutData.couponDiscount,
        total: checkoutData.total,
        coupon: checkoutData.appliedCoupon,
      };

      onPlaceOrder(orderDetails);
    }, 2000);
  };

  const progressValue = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Back to Cart' : 'Retour au Panier'}
              </span>
            </Button>
            <div>
              <h1 className="text-xl">
                <ShoppingBag className="h-5 w-5 inline mr-2" />
                {language === 'en' ? 'Checkout' : 'Paiement'}
              </h1>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Step' : 'Étape'} {currentStep} {language === 'en' ? 'of' : 'de'} {steps.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Progress value={progressValue} className="mb-4 h-2" />
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 ${
                    isActive ? 'text-green-600' : isCompleted ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-green-600 text-white'
                        : isCompleted
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className="hidden sm:inline text-sm">{step.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Delivery Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    {language === 'en' ? 'Delivery Information' : 'Informations de Livraison'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DeliveryInformation
                    language={language}
                    deliveryMethod={checkoutData.deliveryMethod}
                    userAddresses={userAddresses}
                    selectedAddress={selectedAddress}
                    onSelectAddress={setSelectedAddress}
                    isLoggedIn={isLoggedIn}
                    userRegion={userRegion}
                  />
                  <div className="mt-6">
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleContinueToPayment}
                      disabled={!selectedAddress && checkoutData.deliveryMethod === 'home'}
                    >
                      {language === 'en' ? 'Continue to Payment' : 'Continuer au Paiement'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    {language === 'en' ? 'Payment Method' : 'Mode de Paiement'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentMethodSelector
                    language={language}
                    selectedMethod={paymentMethod}
                    onSelectMethod={setPaymentMethod}
                    onPaymentDetailsChange={setPaymentDetails}
                    total={checkoutData.total}
                  />
                  <div className="mt-6 flex gap-3">
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setCurrentStep(1)}
                    >
                      {language === 'en' ? 'Back' : 'Retour'}
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={handleContinueToReview}
                      disabled={!paymentMethod}
                    >
                      {language === 'en' ? 'Review Order' : 'Vérifier la Commande'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review & Place Order */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    {language === 'en' ? 'Review Your Order' : 'Vérifier Votre Commande'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Delivery Summary */}
                  <div>
                    <h4 className="text-sm mb-2">{language === 'en' ? 'Delivery Address' : 'Adresse de Livraison'}</h4>
                    {checkoutData.deliveryMethod === 'pickup' ? (
                      <div className="p-3 bg-gray-50 rounded-lg text-sm">
                        <Package className="h-4 w-4 inline mr-2 text-green-600" />
                        {language === 'en' ? 'Pickup from seller locations' : 'Retrait aux emplacements des vendeurs'}
                      </div>
                    ) : selectedAddress ? (
                      <div className="p-3 bg-gray-50 rounded-lg text-sm">
                        <p>{selectedAddress.name}</p>
                        <p className="text-gray-600">{selectedAddress.address}</p>
                        <p className="text-gray-600">{selectedAddress.city}</p>
                        <p className="text-gray-600">{selectedAddress.phone}</p>
                      </div>
                    ) : null}
                  </div>

                  <Separator />

                  {/* Payment Summary */}
                  <div>
                    <h4 className="text-sm mb-2">{language === 'en' ? 'Payment Method' : 'Mode de Paiement'}</h4>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm flex items-center gap-2">
                      {paymentMethod === 'mtn-momo' && '💛 MTN Mobile Money'}
                      {paymentMethod === 'orange-money' && '🧡 Orange Money'}
                      {paymentMethod === 'card' && '💳 Credit/Debit Card'}
                      {paymentMethod === 'cash-on-delivery' && '💵 Cash on Delivery'}
                    </div>
                  </div>

                  <Separator />

                  {/* Items Summary */}
                  <div>
                    <h4 className="text-sm mb-2">{language === 'en' ? 'Order Items' : 'Articles de la Commande'}</h4>
                    <div className="space-y-2">
                      {cartProducts.map(product => (
                        <div key={product.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {language === 'en' ? product.name : product.nameFr} x {product.quantity}
                          </span>
                          <span>
                            {((product.discount
                              ? product.price - (product.price * product.discount) / 100
                              : product.price) * product.quantity).toLocaleString()} FCFA
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setCurrentStep(2)}
                      disabled={isProcessing}
                    >
                      {language === 'en' ? 'Back' : 'Retour'}
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing 
                        ? (language === 'en' ? 'Processing...' : 'Traitement...') 
                        : (language === 'en' ? 'Place Order' : 'Passer la Commande')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary
              language={language}
              cartItems={cartItems}
              checkoutData={checkoutData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
