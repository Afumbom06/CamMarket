// PWA Utility Functions

// Check if service workers are supported and available
export function isServiceWorkerSupported(): boolean {
  return 'serviceWorker' in navigator && 
         typeof navigator.serviceWorker !== 'undefined';
}

// Register service worker
export function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  // Check if we're in a secure context (required for service workers)
  if (!window.isSecureContext && window.location.hostname !== 'localhost') {
    console.warn('[PWA] Service Workers require HTTPS or localhost');
    return Promise.resolve(null);
  }

  if (!isServiceWorkerSupported()) {
    console.warn('[PWA] Service Workers not supported');
    return Promise.resolve(null);
  }

  return navigator.serviceWorker
    .register('/service-worker.js')
    .then((registration) => {
      console.log('[PWA] Service Worker registered:', registration);

      // Check for updates every hour
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);

      return registration;
    })
    .catch((error) => {
      // Service worker registration failed - this is okay in preview environments
      console.info('[PWA] Service Worker not available (this is normal in preview/development)');
      return null;
    });
}

// Check if app is running in production
export function isProduction(): boolean {
  return window.location.hostname !== 'localhost' && 
         window.location.hostname !== '127.0.0.1' &&
         !window.location.hostname.includes('figma');
}

// Unregister service worker
export function unregisterServiceWorker(): Promise<boolean> {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker
      .getRegistration()
      .then((registration) => {
        if (registration) {
          return registration.unregister();
        }
        return false;
      })
      .catch((error) => {
        console.error('[PWA] Service Worker unregistration failed:', error);
        return false;
      });
  }
  return Promise.resolve(false);
}

// Check if app is installed
export function isAppInstalled(): boolean {
  // Check if running in standalone mode
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isIOSStandalone = (window.navigator as any).standalone === true;
  
  return isStandalone || isIOSStandalone;
}

// Request push notification permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.info('[PWA] Notifications not supported in this environment');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.info('[PWA] Notification permission request not available');
      return 'denied';
    }
  }

  return Notification.permission;
}

// Subscribe to push notifications
export async function subscribeToPushNotifications(
  registration: ServiceWorkerRegistration
): Promise<PushSubscription | null> {
  if (!registration) {
    console.info('[PWA] No service worker registration available');
    return null;
  }

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        // This is a placeholder VAPID public key - replace with your actual key
        'BEl62iUYgUivxIkv69yViEuiBIa-Ib37J8xQmrGCuGbqMcZdUkz0V2f8MxQYwB4rH5G0cJm0Gw3eHR8h6gOXzUs'
      ),
    });

    console.log('[PWA] Push subscription:', subscription);

    // Send subscription to your backend
    // await fetch('/api/push-subscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(subscription),
    // });

    return subscription;
  } catch (error) {
    console.info('[PWA] Push subscription not available in this environment');
    return null;
  }
}

// Convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Show local notification
export function showNotification(
  title: string,
  options?: NotificationOptions
): Promise<void> {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    console.info('[PWA] Notifications not available');
    return Promise.resolve();
  }

  if (!isServiceWorkerSupported()) {
    console.info('[PWA] Service Worker not available for notifications');
    return Promise.resolve();
  }

  return navigator.serviceWorker.ready
    .then((registration) => {
      return registration.showNotification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-96x96.png',
        vibrate: [200, 100, 200],
        ...options,
      });
    })
    .catch((error) => {
      console.info('[PWA] Notification display not available');
      return Promise.resolve();
    });
}

// Get network status
export function getNetworkStatus(): {
  online: boolean;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
} {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  return {
    online: navigator.onLine,
    effectiveType: connection?.effectiveType,
    downlink: connection?.downlink,
    rtt: connection?.rtt,
  };
}

// Cache important URLs for offline access
export function cacheUrls(urls: string[]): void {
  if (!isServiceWorkerSupported()) {
    return;
  }
  
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_URLS',
      urls: urls,
    });
  }
}

// Clear all caches
export async function clearAllCaches(): Promise<void> {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
    console.log('[PWA] All caches cleared');
  }
}

// Get cache size (approximate)
export async function getCacheSize(): Promise<number> {
  if ('caches' in window && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return estimate.usage || 0;
  }
  return 0;
}

// Format bytes to human readable
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Check if update available
export function checkForUpdates(
  registration: ServiceWorkerRegistration
): Promise<boolean> {
  return registration.update().then(() => {
    return registration.waiting !== null;
  });
}

// Skip waiting and activate new service worker
export function skipWaiting(): void {
  if (!isServiceWorkerSupported()) {
    return;
  }
  
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
  }
}
