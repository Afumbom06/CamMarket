import { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { motion, AnimatePresence } from 'motion/react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallPromptProps {
  language: 'en' | 'fr';
}

export function InstallPrompt({ language }: InstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as any).standalone === true;
    
    if (isStandalone || isIOSStandalone) {
      setIsInstalled(true);
      return;
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 30 seconds, unless user dismissed it before
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setTimeout(() => {
          setShowPrompt(true);
        }, 30000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('[PWA] User accepted install');
    } else {
      console.log('[PWA] User dismissed install');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // iOS-specific install instructions
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

  if (isInstalled || (!showPrompt && !deferredPrompt)) {
    return null;
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:max-w-md z-50"
        >
          <Card className="border-2 border-green-600 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Smartphone className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1">
                    {language === 'en' ? 'Install CamMarket App' : 'Installer l\'App CamMarket'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'en'
                      ? 'Get faster access and offline browsing by installing our app!'
                      : 'Accès plus rapide et navigation hors ligne en installant notre app !'}
                  </p>

                  {isIOS ? (
                    <div className="text-sm text-gray-600 mb-3 p-3 bg-blue-50 rounded-lg">
                      <p className="mb-2">
                        {language === 'en' ? 'To install on iOS:' : 'Pour installer sur iOS:'}
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-xs">
                        <li>
                          {language === 'en'
                            ? 'Tap the Share button'
                            : 'Appuyez sur le bouton Partager'}{' '}
                          <span className="inline-block">📤</span>
                        </li>
                        <li>
                          {language === 'en'
                            ? 'Scroll down and tap "Add to Home Screen"'
                            : 'Faites défiler et appuyez sur "Ajouter à l\'écran d\'accueil"'}
                        </li>
                        <li>
                          {language === 'en' ? 'Tap "Add"' : 'Appuyez sur "Ajouter"'}
                        </li>
                      </ol>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleInstall}
                        className="gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <Download className="h-4 w-4" />
                        {language === 'en' ? 'Install' : 'Installer'}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleDismiss}>
                        {language === 'en' ? 'Not Now' : 'Plus Tard'}
                      </Button>
                    </div>
                  )}
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
  );
}
