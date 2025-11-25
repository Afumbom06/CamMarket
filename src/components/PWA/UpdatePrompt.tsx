import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { motion, AnimatePresence } from 'motion/react';
import { skipWaiting, isServiceWorkerSupported } from '../../lib/pwa-utils';

interface UpdatePromptProps {
  language: 'en' | 'fr';
}

export function UpdatePrompt({ language }: UpdatePromptProps) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!isServiceWorkerSupported()) {
      return;
    }

    navigator.serviceWorker.ready
      .then((reg) => {
        setRegistration(reg);

        // Check for updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              setShowUpdate(true);
            }
          });
        });
      })
      .catch(() => {
        // Service worker not available
      });

    // Listen for controller change (new SW activated)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      skipWaiting();
      setShowUpdate(false);
    }
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  return (
    <AnimatePresence>
      {showUpdate && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-4 left-4 right-4 lg:left-auto lg:right-6 lg:max-w-md z-50"
        >
          <Card className="border-2 border-blue-600 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <RefreshCw className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1">
                    {language === 'en' ? 'Update Available' : 'Mise à Jour Disponible'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'en'
                      ? 'A new version of CamMarket is available. Update now to get the latest features!'
                      : 'Une nouvelle version de CamMarket est disponible. Mettez à jour maintenant pour obtenir les dernières fonctionnalités !'}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleUpdate}
                      className="gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <RefreshCw className="h-4 w-4" />
                      {language === 'en' ? 'Update Now' : 'Mettre à Jour'}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleDismiss}>
                      {language === 'en' ? 'Later' : 'Plus Tard'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
