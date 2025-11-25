import { useState, useEffect } from 'react';
import { Bell, BellOff, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { requestNotificationPermission, subscribeToPushNotifications } from '../../lib/pwa-utils';
import { toast } from 'sonner@2.0.3';

interface PushNotificationManagerProps {
  language: 'en' | 'fr';
}

export function PushNotificationManager({ language }: PushNotificationManagerProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    flashSales: true,
    newArrivals: false,
    priceDrops: true,
  });

  useEffect(() => {
    // Check current permission status
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Load saved preferences
    const saved = localStorage.getItem('notification-preferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load notification preferences');
      }
    }

    // Check if user should see prompt
    const shouldShowPrompt =
      Notification.permission === 'default' &&
      !localStorage.getItem('notification-prompt-dismissed') &&
      !sessionStorage.getItem('notification-prompt-shown');

    if (shouldShowPrompt) {
      // Show prompt after 2 minutes
      setTimeout(() => {
        setShowPrompt(true);
        sessionStorage.setItem('notification-prompt-shown', 'true');
      }, 120000);
    }

    // Check subscription status
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(subscription !== null);
      } catch (error) {
        // Service worker not available
        setIsSubscribed(false);
      }
    }
  };

  const handleEnableNotifications = async () => {
    try {
      const result = await requestNotificationPermission();
      setPermission(result);

      if (result === 'granted') {
        // Subscribe to push notifications
        if ('serviceWorker' in navigator) {
          try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await subscribeToPushNotifications(registration);

            if (subscription) {
              setIsSubscribed(true);
              toast.success(
                language === 'en'
                  ? '🔔 Notifications enabled!'
                  : '🔔 Notifications activées !'
              );
              setShowPrompt(false);
            } else {
              // In preview mode, just mark as enabled for demo purposes
              setIsSubscribed(true);
              toast.success(
                language === 'en'
                  ? '🔔 Notification preferences saved!'
                  : '🔔 Préférences de notification enregistrées !'
              );
              setShowPrompt(false);
            }
          } catch (error) {
            // Service worker not available - still save preferences
            setIsSubscribed(true);
            toast.success(
              language === 'en'
                ? '🔔 Notification preferences saved!'
                : '🔔 Préférences de notification enregistrées !'
            );
            setShowPrompt(false);
          }
        } else {
          // No service worker support - just save preferences
          setIsSubscribed(true);
          toast.success(
            language === 'en'
              ? '🔔 Notification preferences saved!'
              : '🔔 Préférences de notification enregistrées !'
          );
          setShowPrompt(false);
        }
      } else {
        toast.info(
          language === 'en'
            ? 'Notification permission denied'
            : 'Permission de notification refusée'
        );
      }
    } catch (error) {
      console.info('Notification setup:', error);
      toast.info(
        language === 'en'
          ? 'Notification preferences saved (push notifications not available in preview)'
          : 'Préférences enregistrées (notifications push non disponibles en aperçu)'
      );
    }
  };

  const handleDisableNotifications = async () => {
    try {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.getSubscription();
          
          if (subscription) {
            await subscription.unsubscribe();
          }
        } catch (error) {
          // Service worker not available - just update state
        }
      }
      
      setIsSubscribed(false);
      toast.success(
        language === 'en'
          ? 'Notifications disabled'
          : 'Notifications désactivées'
      );
    } catch (error) {
      console.info('Notification disable:', error);
      setIsSubscribed(false);
      toast.success(
        language === 'en'
          ? 'Notification preferences updated'
          : 'Préférences de notification mises à jour'
      );
    }
  };

  const handlePreferenceChange = (key: keyof typeof preferences, value: boolean) => {
    const updated = { ...preferences, [key]: value };
    setPreferences(updated);
    localStorage.setItem('notification-preferences', JSON.stringify(updated));
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('notification-prompt-dismissed', 'true');
  };

  if (!('Notification' in window)) {
    return null; // Browser doesn't support notifications
  }

  return (
    <>
      {/* Notification Prompt */}
      <AnimatePresence>
        {showPrompt && permission === 'default' && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:max-w-md z-50"
          >
            <Card className="border-2 border-yellow-500 shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Bell className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1">
                      {language === 'en'
                        ? 'Stay Updated!'
                        : 'Restez Informé !'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {language === 'en'
                        ? 'Get notified about order updates, flash sales, and exclusive deals!'
                        : 'Soyez notifié des mises à jour de commande, ventes flash et offres exclusives !'}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleEnableNotifications}
                        className="gap-2 bg-yellow-500 hover:bg-yellow-600"
                      >
                        <Bell className="h-4 w-4" />
                        {language === 'en' ? 'Enable' : 'Activer'}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleDismiss}>
                        {language === 'en' ? 'Not Now' : 'Plus Tard'}
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDismiss}
                    className="h-8 w-8 flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Preferences (shown in settings) */}
      {permission === 'granted' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {isSubscribed ? (
                  <Bell className="h-5 w-5 text-green-600" />
                ) : (
                  <BellOff className="h-5 w-5 text-gray-400" />
                )}
                <h3 className="">
                  {language === 'en'
                    ? 'Push Notifications'
                    : 'Notifications Push'}
                </h3>
              </div>
              <Switch
                checked={isSubscribed}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleEnableNotifications();
                  } else {
                    handleDisableNotifications();
                  }
                }}
              />
            </div>

            {isSubscribed && (
              <div className="space-y-3 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">
                  {language === 'en'
                    ? 'Choose what you want to be notified about:'
                    : 'Choisissez vos préférences de notification :'}
                </p>

                <div className="flex items-center justify-between">
                  <Label htmlFor="order-updates" className="text-sm">
                    {language === 'en' ? 'Order Updates' : 'Mises à Jour Commande'}
                  </Label>
                  <Switch
                    id="order-updates"
                    checked={preferences.orderUpdates}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange('orderUpdates', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="flash-sales" className="text-sm">
                    {language === 'en' ? 'Flash Sales' : 'Ventes Flash'}
                  </Label>
                  <Switch
                    id="flash-sales"
                    checked={preferences.flashSales}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange('flashSales', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="new-arrivals" className="text-sm">
                    {language === 'en' ? 'New Arrivals' : 'Nouveautés'}
                  </Label>
                  <Switch
                    id="new-arrivals"
                    checked={preferences.newArrivals}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange('newArrivals', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="price-drops" className="text-sm">
                    {language === 'en' ? 'Price Drops' : 'Baisses de Prix'}
                  </Label>
                  <Switch
                    id="price-drops"
                    checked={preferences.priceDrops}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange('priceDrops', checked)
                    }
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
