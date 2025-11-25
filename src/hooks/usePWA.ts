import { useEffect, useState } from 'react';
import { registerServiceWorker, isAppInstalled, getNetworkStatus, isServiceWorkerSupported } from '../lib/pwa-utils';

export function usePWA() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Check if app is installed
    setIsInstalled(isAppInstalled());

    // Register service worker only if supported
    if (isServiceWorkerSupported()) {
      registerServiceWorker()
        .then((reg) => {
          setRegistration(reg);
        })
        .catch((error) => {
          // Service worker not available - this is fine
          console.info('[PWA] Running without service worker support');
        });
    }

    // Monitor network status
    const updateOnlineStatus = () => {
      const status = getNetworkStatus();
      setIsOnline(status.online);
    };

    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return {
    isInstalled,
    isOnline,
    registration,
  };
}
