import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OfflineIndicatorProps {
  language: 'en' | 'fr';
}

export function OfflineIndicator({ language }: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineMessage(true);
      setTimeout(() => setShowOnlineMessage(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {/* Offline Banner */}
      {showOfflineMessage && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white py-3 px-4 shadow-lg"
        >
          <div className="container mx-auto flex items-center justify-center gap-2">
            <WifiOff className="h-5 w-5" />
            <span className="text-sm">
              {language === 'en'
                ? 'No internet connection. You can browse cached pages.'
                : 'Pas de connexion Internet. Vous pouvez parcourir les pages en cache.'}
            </span>
          </div>
        </motion.div>
      )}

      {/* Back Online Banner */}
      {showOnlineMessage && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-green-600 text-white py-3 px-4 shadow-lg"
        >
          <div className="container mx-auto flex items-center justify-center gap-2">
            <Wifi className="h-5 w-5" />
            <span className="text-sm">
              {language === 'en'
                ? 'Back online! 🎉'
                : 'De retour en ligne ! 🎉'}
            </span>
          </div>
        </motion.div>
      )}

      {/* Persistent Offline Indicator (small badge) */}
      {!isOnline && !showOfflineMessage && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 z-50 bg-red-600 text-white rounded-full p-3 shadow-lg"
        >
          <WifiOff className="h-5 w-5" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
