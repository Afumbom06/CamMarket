import { useState } from 'react';
import { CreditCard, Smartphone, Wallet, Banknote, Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { paymentMethods } from '../../lib/mock-data';

interface PaymentMethodSelectorProps {
  language: 'en' | 'fr';
  selectedMethod: string;
  onSelectMethod: (method: string) => void;
  onPaymentDetailsChange: (details: any) => void;
  total: number;
}

export function PaymentMethodSelector({
  language,
  selectedMethod,
  onSelectMethod,
  onPaymentDetailsChange,
  total,
}: PaymentMethodSelectorProps) {
  const [momoNumber, setMomoNumber] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const handleMethodSelect = (methodId: string) => {
    onSelectMethod(methodId);
    onPaymentDetailsChange({});
  };

  const handleMomoNumberChange = (value: string) => {
    setMomoNumber(value);
    onPaymentDetailsChange({ phoneNumber: value });
  };

  const handleCardDetailsChange = (field: string, value: string) => {
    const updated = { ...cardDetails, [field]: value };
    setCardDetails(updated);
    onPaymentDetailsChange(updated);
  };

  const getMethodIcon = (methodId: string) => {
    switch (methodId) {
      case 'mtn-momo':
        return <Smartphone className="h-5 w-5" style={{ color: '#FFCC00' }} />;
      case 'orange-money':
        return <Smartphone className="h-5 w-5" style={{ color: '#FF6600' }} />;
      case 'card':
        return <CreditCard className="h-5 w-5 text-blue-600" />;
      case 'cash-on-delivery':
        return <Banknote className="h-5 w-5 text-green-600" />;
      default:
        return <Wallet className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedMethod} onValueChange={handleMethodSelect}>
        {paymentMethods.filter(m => m.available).map((method) => (
          <div key={method.id}>
            <div
              className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedMethod === method.id ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
              <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getMethodIcon(method.id)}
                    <div>
                      <p className="">{language === 'en' ? method.name : method.nameFr}</p>
                      {method.id === 'cash-on-delivery' && (
                        <p className="text-xs text-gray-500 mt-1">
                          {language === 'en' ? 'Pay when you receive your order' : 'Payez à la réception de votre commande'}
                        </p>
                      )}
                    </div>
                  </div>
                  {selectedMethod === method.id && (
                    <Check className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </Label>
            </div>

            {/* Payment Details Forms */}
            {selectedMethod === method.id && (
              <div className="mt-3 ml-11 mr-4">
                {(method.id === 'mtn-momo' || method.id === 'orange-money') && (
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <Label className="text-sm">
                          {language === 'en' ? 'Mobile Money Number' : 'Numéro Mobile Money'}
                        </Label>
                        <Input
                          type="tel"
                          placeholder="+237 6XX XXX XXX"
                          value={momoNumber}
                          onChange={(e) => handleMomoNumberChange(e.target.value)}
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {language === 'en'
                            ? 'You will receive a payment prompt on your phone'
                            : 'Vous recevrez une invite de paiement sur votre téléphone'}
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                        <p className="text-blue-700">
                          💡 {language === 'en' ? 'Amount to pay:' : 'Montant à payer:'} <strong>{total.toLocaleString()} FCFA</strong>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {method.id === 'card' && (
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <Label className="text-sm">
                          {language === 'en' ? 'Card Number' : 'Numéro de Carte'}
                        </Label>
                        <Input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => handleCardDetailsChange('number', e.target.value)}
                          maxLength={19}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">
                          {language === 'en' ? 'Cardholder Name' : 'Nom du Titulaire'}
                        </Label>
                        <Input
                          type="text"
                          placeholder={language === 'en' ? 'Name on card' : 'Nom sur la carte'}
                          value={cardDetails.name}
                          onChange={(e) => handleCardDetailsChange('name', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm">
                            {language === 'en' ? 'Expiry Date' : 'Date d\'Expiration'}
                          </Label>
                          <Input
                            type="text"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => handleCardDetailsChange('expiry', e.target.value)}
                            maxLength={5}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">CVV</Label>
                          <Input
                            type="text"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) => handleCardDetailsChange('cvv', e.target.value)}
                            maxLength={3}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        🔒 {language === 'en' ? 'Your payment information is secure and encrypted' : 'Vos informations de paiement sont sécurisées et cryptées'}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {method.id === 'cash-on-delivery' && (
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                        <p className="text-yellow-700">
                          ⚠️ {language === 'en'
                            ? 'Please have exact cash amount ready when receiving your order.'
                            : 'Veuillez préparer le montant exact en espèces lors de la réception de votre commande.'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
