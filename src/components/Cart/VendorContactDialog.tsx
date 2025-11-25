import { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Send, X, User, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';
import { regions } from '../../lib/mock-data';

interface VendorContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'en' | 'fr';
  vendor: {
    name: string;
    storeName?: string;
    region: string;
    phone?: string;
    email?: string;
  };
  product?: {
    id: number;
    name: string;
    nameFr: string;
    image: string;
  };
}

export function VendorContactDialog({
  open,
  onOpenChange,
  language,
  vendor,
  product,
}: VendorContactDialogProps) {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');

  const regionData = regions.find(r => r.id === vendor.region);

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error(language === 'en' ? 'Please enter a message' : 'Veuillez entrer un message');
      return;
    }

    // Simulate sending message
    toast.success(
      language === 'en'
        ? '✉️ Message sent to seller!'
        : '✉️ Message envoyé au vendeur !'
    );
    setMessage('');
    onOpenChange(false);
  };

  const handleCall = () => {
    if (vendor.phone) {
      window.location.href = `tel:${vendor.phone}`;
    } else {
      toast.info(language === 'en' ? 'Phone number not available' : 'Numéro de téléphone non disponible');
    }
  };

  const handleEmail = () => {
    if (vendor.email) {
      window.location.href = `mailto:${vendor.email}?subject=${encodeURIComponent(
        language === 'en' 
          ? `Inquiry about ${product?.name || 'your product'}` 
          : `Demande concernant ${product?.nameFr || 'votre produit'}`
      )}`;
    } else {
      toast.info(language === 'en' ? 'Email not available' : 'Email non disponible');
    }
  };

  // Suggested quick messages
  const quickMessages = [
    {
      en: 'Is this product still available?',
      fr: 'Ce produit est-il toujours disponible ?',
    },
    {
      en: 'Can you offer a discount for bulk orders?',
      fr: 'Pouvez-vous offrir une réduction pour les commandes en gros ?',
    },
    {
      en: 'When can I expect delivery?',
      fr: 'Quand puis-je m\'attendre à la livraison ?',
    },
    {
      en: 'Do you have other colors/sizes available?',
      fr: 'Avez-vous d\'autres couleurs/tailles disponibles ?',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            {language === 'en' ? 'Contact Seller' : 'Contacter le Vendeur'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Vendor Info */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-full">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{vendor.storeName || vendor.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    <Badge variant="outline" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {language === 'en' ? regionData?.name : regionData?.nameFr}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {language === 'en' ? 'Usually responds in 24h' : 'Répond généralement en 24h'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Context (if provided) */}
          {product && (
            <Card>
              <CardContent className="p-3">
                <p className="text-xs text-gray-600 mb-2">
                  {language === 'en' ? 'Inquiry about:' : 'Demande concernant :'}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <p className="text-sm flex-1">{language === 'en' ? product.name : product.nameFr}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">
                <MessageCircle className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Send Message' : 'Envoyer un Message'}
              </TabsTrigger>
              <TabsTrigger value="contact">
                <Phone className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Contact Info' : 'Infos Contact'}
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-4">
              {/* Quick Messages */}
              <div>
                <label className="text-sm mb-2 block">
                  {language === 'en' ? 'Quick messages:' : 'Messages rapides :'}
                </label>
                <div className="space-y-2">
                  {quickMessages.map((msg, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => setMessage(language === 'en' ? msg.en : msg.fr)}
                    >
                      {language === 'en' ? msg.en : msg.fr}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Custom Message */}
              <div>
                <label className="text-sm mb-2 block">
                  {language === 'en' ? 'Your message:' : 'Votre message :'}
                </label>
                <Textarea
                  placeholder={
                    language === 'en'
                      ? 'Type your message here...'
                      : 'Tapez votre message ici...'
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {message.length}/500 {language === 'en' ? 'characters' : 'caractères'}
                </p>
              </div>

              <Button
                className="w-full gap-2"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" />
                {language === 'en' ? 'Send Message' : 'Envoyer le Message'}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                {language === 'en'
                  ? 'The seller will receive your message and respond via your registered email'
                  : 'Le vendeur recevra votre message et répondra via votre email enregistré'}
              </p>
            </TabsContent>

            {/* Contact Info Tab */}
            <TabsContent value="contact" className="space-y-3">
              <Card>
                <CardContent className="p-4 space-y-3">
                  {/* Phone */}
                  {vendor.phone ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <Phone className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">
                            {language === 'en' ? 'Phone' : 'Téléphone'}
                          </p>
                          <p className="text-sm">{vendor.phone}</p>
                        </div>
                      </div>
                      <Button size="sm" onClick={handleCall} className="gap-2">
                        <Phone className="h-3 w-3" />
                        {language === 'en' ? 'Call' : 'Appeler'}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-gray-400">
                      <Phone className="h-4 w-4" />
                      <p className="text-sm">
                        {language === 'en' ? 'Phone not available' : 'Téléphone non disponible'}
                      </p>
                    </div>
                  )}

                  <Separator />

                  {/* Email */}
                  {vendor.email ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Email</p>
                          <p className="text-sm">{vendor.email}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={handleEmail} className="gap-2">
                        <Mail className="h-3 w-3" />
                        {language === 'en' ? 'Email' : 'Envoyer'}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-gray-400">
                      <Mail className="h-4 w-4" />
                      <p className="text-sm">
                        {language === 'en' ? 'Email not available' : 'Email non disponible'}
                      </p>
                    </div>
                  )}

                  <Separator />

                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <MapPin className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">
                        {language === 'en' ? 'Location' : 'Localisation'}
                      </p>
                      <p className="text-sm">
                        {language === 'en' ? regionData?.name : regionData?.nameFr}, Cameroon
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 {language === 'en'
                    ? 'Tip: For faster response, include your order number in your message'
                    : 'Astuce : Pour une réponse plus rapide, incluez votre numéro de commande dans votre message'}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
