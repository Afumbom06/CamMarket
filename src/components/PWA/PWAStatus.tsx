import { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { isServiceWorkerSupported, isProduction } from '../../lib/pwa-utils';

interface PWAStatusProps {
  language: 'en' | 'fr';
}

export function PWAStatus({ language }: PWAStatusProps) {
  const [showDevInfo, setShowDevInfo] = useState(false);

  useEffect(() => {
    // Only show in non-production environments
    if (!isProduction() && !isServiceWorkerSupported()) {
      setShowDevInfo(true);
    }
  }, []);

  if (!showDevInfo) {
    return null;
  }

  return (
    <Alert className="fixed bottom-4 right-4 max-w-md z-[60] bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-sm text-blue-700">
        {language === 'en' ? (
          <>
            <strong>Development Mode:</strong> PWA features (offline mode, push notifications) 
            require HTTPS in production. The app will work fully when deployed.
          </>
        ) : (
          <>
            <strong>Mode Développement:</strong> Les fonctionnalités PWA (mode hors ligne, 
            notifications push) nécessitent HTTPS en production. L'application fonctionnera 
            pleinement lors du déploiement.
          </>
        )}
      </AlertDescription>
    </Alert>
  );
}
