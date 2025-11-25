# CamMarket PWA Module Documentation

## Overview
The CamMarket PWA (Progressive Web App) Module provides a native app-like experience with offline capabilities, push notifications, and installability across all devices.

## ⚠️ Important Note for Preview/Development
PWA features (Service Workers, Push Notifications) require HTTPS or localhost to function. In preview environments (like Figma previews), these features are gracefully disabled but the UI remains functional for demonstration. The full PWA experience will be available when deployed to a production HTTPS environment.

## Features

### 1. **Installable App** ✅
- **Auto-detection**: Detects when the app can be installed
- **Install Prompt**: Shows a customized install prompt after 30 seconds
- **iOS Support**: Provides step-by-step instructions for iOS users
- **Standalone Mode**: Runs as a standalone app when installed
- **App Shortcuts**: Quick access to Products, Cart, and Flash Sales

### 2. **Offline Mode** 🔌
- **Service Worker**: Caches essential assets and pages
- **Offline Page**: Custom offline fallback page
- **Cache Strategy**: 
  - Cache-first for static assets
  - Network-first for API calls with cache fallback
- **Smart Caching**: Automatically caches viewed products and pages
- **Offline Indicator**: Visual indicator when connection is lost

### 3. **Push Notifications** 🔔
- **Permission Management**: Smart permission request flow
- **Notification Preferences**: Granular control over notification types:
  - Order Updates
  - Flash Sales
  - New Arrivals
  - Price Drops
- **Background Notifications**: Receive notifications even when app is closed
- **Interactive Notifications**: Click to navigate to relevant pages
- **Vibration Support**: Haptic feedback for notifications

### 4. **Mobile Optimization** 📱
- **Responsive Design**: Optimized for all screen sizes
- **Touch Gestures**: Swipe, tap, and scroll optimizations
- **Performance**: Fast loading with code splitting
- **Battery Efficient**: Optimized background tasks
- **Network Detection**: Adapts to connection quality

### 5. **Update Management** 🔄
- **Auto Update Detection**: Checks for new versions
- **Update Prompt**: Non-intrusive update notification
- **Seamless Updates**: One-click update installation
- **Version Control**: Proper cache versioning

## File Structure

```
/public/
  ├── manifest.json          # PWA manifest configuration
  ├── service-worker.js      # Service worker for offline & caching
  ├── offline.html           # Offline fallback page
  └── icons/                 # App icons (72x72 to 512x512)

/components/PWA/
  ├── InstallPrompt.tsx           # App installation prompt
  ├── PushNotificationManager.tsx # Push notification settings
  ├── OfflineIndicator.tsx        # Network status indicator
  ├── UpdatePrompt.tsx            # App update prompt
  └── index.tsx                   # Exports

/lib/
  └── pwa-utils.ts               # PWA utility functions

/hooks/
  └── usePWA.ts                  # PWA React hook
```

## Installation

### Prerequisites
The PWA module is already integrated into CamMarket. No additional installation needed.

### Browser Requirements
- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari (iOS 11.3+)**: Full support
- **Samsung Internet**: Full support

## Usage

### 1. Installing the App

#### Android/Chrome
1. Visit CamMarket on your mobile browser
2. Wait for the install prompt (appears after 30 seconds)
3. Click "Install" button
4. App will be added to home screen

#### iOS/Safari
1. Visit CamMarket on Safari
2. Tap the Share button (📤)
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"

### 2. Enabling Push Notifications

#### Method 1: From Prompt
1. Wait for notification prompt (appears after 2 minutes)
2. Click "Enable" when prompted
3. Allow notifications in browser popup

#### Method 2: From Settings
1. Navigate to Account → Settings
2. Find "Push Notifications" section
3. Toggle the switch to enable
4. Select your notification preferences

### 3. Offline Browsing
1. Browse products while online (automatically cached)
2. If connection is lost, you'll see an offline indicator
3. Continue browsing previously viewed pages
4. Connection will auto-restore when back online

### 4. Updating the App
1. When an update is available, you'll see a prompt at the top
2. Click "Update Now" to install
3. App will refresh with new version

## Configuration

### Manifest Configuration (`/public/manifest.json`)
```json
{
  "name": "CamMarket - Cameroon's #1 Marketplace",
  "short_name": "CamMarket",
  "theme_color": "#00843D",
  "background_color": "#00843D",
  "display": "standalone",
  "start_url": "/",
  "scope": "/"
}
```

### Service Worker Cache (`/public/service-worker.js`)
```javascript
const CACHE_NAME = 'cammarket-v1.0.0';
// Update version to force cache refresh
```

## API Reference

### usePWA Hook
```typescript
import { usePWA } from './hooks/usePWA';

function Component() {
  const { isInstalled, isOnline, registration } = usePWA();
  
  // isInstalled: boolean - Is app installed?
  // isOnline: boolean - Is device online?
  // registration: ServiceWorkerRegistration | null
}
```

### PWA Utilities
```typescript
import {
  registerServiceWorker,
  requestNotificationPermission,
  subscribeToPushNotifications,
  showNotification,
  cacheUrls,
  clearAllCaches,
  getCacheSize,
  formatBytes,
} from './lib/pwa-utils';

// Register service worker
await registerServiceWorker();

// Request notification permission
const permission = await requestNotificationPermission();

// Show notification
await showNotification('Hello!', {
  body: 'New flash sale available!',
  icon: '/icons/icon-192x192.png',
  data: { url: '/sales' }
});

// Cache specific URLs
cacheUrls(['/product/123', '/category/electronics']);

// Get cache size
const size = await getCacheSize();
console.log(formatBytes(size)); // "2.5 MB"
```

## Testing

### Testing Offline Mode
1. Open DevTools → Network tab
2. Select "Offline" from throttling dropdown
3. Navigate the app - cached pages should still work
4. Try navigating to a new page - offline page should appear

### Testing Install Prompt
1. Open DevTools → Application → Manifest
2. Click "Add to home screen"
3. Or wait 30 seconds for auto-prompt

### Testing Notifications
1. Open DevTools → Application → Service Workers
2. Check "Update on reload"
3. In Service Worker section, click "Push" to send test notification

### Testing Updates
1. Change `CACHE_NAME` in service-worker.js
2. Reload the page
3. Update prompt should appear

## Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Progressive Web App**: 100
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### Cache Strategy
- **Static Assets**: Cache-first (instant load)
- **API Calls**: Network-first with cache fallback
- **Images**: Cache with size limit (50MB max)
- **Cache Lifetime**: 7 days or until version update

## Security

### HTTPS Requirement
PWA features require HTTPS in production. Development works on localhost.

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' https: data:;">
```

### Permissions
- **Notifications**: Required for push notifications
- **Storage**: Required for offline caching
- **Service Worker**: Auto-granted

## Troubleshooting

### Service Worker Registration Failed (404 Error)
**This is expected in preview/development environments!**

The error `Failed to register a ServiceWorker... 404` occurs when:
- Running in preview environment (Figma, Netlify preview, etc.)
- Not using HTTPS (required for Service Workers)
- Service worker file not accessible at root

**Solution:**
- **For Development**: This is normal - PWA features are disabled but the app works fine
- **For Production**: Deploy to HTTPS environment and service worker will register automatically
- **Local Development**: Use `localhost` which allows service workers
- **Testing**: The app gracefully handles missing service workers - all features still work

The app is designed to work with or without service workers. When unavailable:
- ✅ App still functions normally
- ✅ UI shows appropriate messages
- ✅ Notification preferences are saved locally
- ✅ Install prompt still works (browser-dependent)
- ❌ Offline mode unavailable (requires HTTPS)
- ❌ Push notifications unavailable (requires HTTPS)

### App Won't Install
- **Check HTTPS**: PWA requires HTTPS (or localhost for dev)
- **Check Manifest**: Validate manifest.json is accessible
- **Clear Cache**: Clear browser cache and try again
- **Browser Support**: Ensure browser supports PWA

### Notifications Not Working
- **Check Permission**: Browser must have notification permission
- **Check Service Worker**: Ensure SW is registered and active
- **Check HTTPS**: Push notifications require HTTPS
- **Browser Support**: Not all browsers support push
- **Preview Mode**: Notifications disabled in preview - will work in production

### Offline Mode Not Working
- **Check HTTPS**: Offline mode requires HTTPS or localhost
- **Check Service Worker**: Verify SW is registered (won't work in preview)
- **Check Cache**: Open DevTools → Application → Cache Storage
- **Hard Refresh**: Try Ctrl+Shift+R to bypass cache
- **Production Only**: Full offline support requires production deployment

### Update Not Applying
- **Close All Tabs**: Close all app tabs and reopen
- **Clear Cache**: Manually clear cache storage
- **Force Update**: DevTools → Application → Service Workers → "Update"

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge | Samsung |
|---------|--------|---------|--------|------|---------|
| Install | ✅ | ✅ | ✅* | ✅ | ✅ |
| Offline | ✅ | ✅ | ✅ | ✅ | ✅ |
| Push | ✅ | ✅ | ✅** | ✅ | ✅ |
| Badges | ✅ | ❌ | ❌ | ✅ | ✅ |

*iOS uses "Add to Home Screen" instead of install prompt
**iOS 16.4+ only

## Future Enhancements

### Planned Features
- [ ] Background Sync for failed orders
- [ ] Periodic Background Sync for updates
- [ ] Web Share API integration
- [ ] Contacts Picker API for sharing
- [ ] File System Access for downloads
- [ ] Badge API for notification counts
- [ ] App Shortcuts customization

### Performance Optimizations
- [ ] Implement workbox for advanced caching
- [ ] Add IndexedDB for offline data
- [ ] Implement virtual scrolling for large lists
- [ ] Add image lazy loading
- [ ] Optimize bundle splitting

## Support

For PWA-related issues:
1. Check this documentation
2. Review browser console for errors
3. Test in multiple browsers
4. Contact development team

## Resources

- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev PWA](https://web.dev/progressive-web-apps/)
- [Can I Use - Service Worker](https://caniuse.com/serviceworkers)
- [Push API Compatibility](https://caniuse.com/push-api)

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Maintained By**: CamMarket Development Team
