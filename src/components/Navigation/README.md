# Navigation Module - CamMarket

A comprehensive navigation system for the CamMarket e-commerce platform featuring desktop top navigation, mobile bottom navigation, and advanced search functionality.

## 📦 Components Overview

### 1. **TopNavbar** - Main Desktop/Tablet Navigation
The primary navigation bar for desktop and tablet devices.

**Features:**
- Sticky behavior on scroll
- Cameroon flag colors top bar
- Logo with click-to-home functionality
- Advanced search with autocomplete
- Region selector dropdown
- Categories mega-menu
- Cart icon with badge count
- Wishlist icon with badge count
- User profile menu
- Language switcher (EN/FR)
- Mobile hamburger menu
- Quick links bar (desktop only)

**Usage:**
```tsx
import { TopNavbar } from './components/Navigation/TopNavbar';

<TopNavbar
  language="en"
  onLanguageChange={setLanguage}
  selectedRegion={selectedRegion}
  onRegionChange={setSelectedRegion}
  wishlistCount={5}
  cartCount={3}
  onWishlistClick={() => {}}
  onCartClick={() => {}}
  onLogoClick={() => {}}
  onProductSelect={(id) => {}}
  onCategorySelect={(id) => {}}
  onRegionSelect={(id) => {}}
  isLoggedIn={false}
  userName="John Doe"
/>
```

---

### 2. **MobileBottomNav** - Mobile Bottom Navigation
Modern floating bottom navigation for mobile devices.

**Features:**
- Fixed bottom positioning
- 5 main tabs: Home, Categories, Regions, Cart, Account
- Active tab indicator
- Cart badge count
- Region selector popup sheet
- Smooth animations
- Touch-friendly design

**Tabs:**
- 🏠 Home - Navigate to homepage
- 📱 Categories - Browse product categories
- 📍 Regions - Quick region selector
- 🛒 Cart - View shopping cart
- 👤 Account - User profile

**Usage:**
```tsx
import { MobileBottomNav } from './components/Navigation/MobileBottomNav';

<MobileBottomNav
  language="en"
  activeTab="home"
  onTabChange={setActiveTab}
  cartCount={3}
  selectedRegion="littoral"
  onRegionChange={setRegion}
/>
```

---

### 3. **SearchBar** - Advanced Search with Autocomplete
Smart search bar with real-time autocomplete suggestions.

**Features:**
- Real-time search as you type
- Debounced API calls (300ms)
- Autocomplete dropdown with:
  - Product suggestions (with images, prices)
  - Category suggestions
  - Region suggestions
- Highlighted search matches
- Clear button
- Loading spinner
- Keyboard navigation (ESC to close)
- Click outside to close

**Usage:**
```tsx
import { SearchBar } from './components/Navigation/SearchBar';

<SearchBar
  language="en"
  onProductSelect={(id) => navigateToProduct(id)}
  onCategorySelect={(id) => navigateToCategory(id)}
  onRegionSelect={(id) => setRegion(id)}
/>
```

---

### 4. **RegionSelector** - 10 Regions Dropdown
Dropdown for selecting from Cameroon's 10 regions.

**Features:**
- All regions option
- Color-coded regions
- Checkmark for selected region
- Scrollable list
- Compact and default variants
- Region names in EN/FR

**Regions:**
1. Far North (Extrême-Nord)
2. North (Nord)
3. Adamawa (Adamaoua)
4. East (Est)
5. Centre
6. Littoral
7. West (Ouest)
8. Northwest (Nord-Ouest)
9. Southwest (Sud-Ouest)
10. South (Sud)

**Usage:**
```tsx
import { RegionSelector } from './components/Navigation/RegionSelector';

<RegionSelector
  selectedRegion="littoral"
  onRegionChange={setRegion}
  language="en"
  variant="default"
/>
```

---

### 5. **CategoriesDropdown** - Product Categories Menu
Dropdown menu displaying all product categories.

**Features:**
- Category icons
- Category descriptions
- Hover effects
- Click to navigate
- Grid layout

**Categories:**
- 🍽️ Foodstuff
- 📱 Electronics
- 👕 Fashion
- 🌾 Agriculture
- 🔧 Services
- 🎨 Handcraft

**Usage:**
```tsx
import { CategoriesDropdown } from './components/Navigation/CategoriesDropdown';

<CategoriesDropdown
  onCategorySelect={(id) => navigateToCategory(id)}
  language="en"
/>
```

---

### 6. **CartIcon** - Shopping Cart Badge
Animated cart icon with item count badge.

**Features:**
- Animated badge on count change
- Shows 99+ for counts over 99
- Optional label text
- Responsive sizing

**Usage:**
```tsx
import { CartIcon } from './components/Navigation/CartIcon';

<CartIcon
  count={5}
  onClick={() => navigateToCart()}
  showLabel={false}
  language="en"
/>
```

---

### 7. **WishlistIcon** - Wishlist/Favorites Badge
Heart icon with wishlist count badge.

**Features:**
- Red badge color
- Animated badge on count change
- Shows 99+ for counts over 99
- Hidden on small screens
- Optional label text

**Usage:**
```tsx
import { WishlistIcon } from './components/Navigation/WishlistIcon';

<WishlistIcon
  count={3}
  onClick={() => navigateToWishlist()}
  showLabel={false}
  language="en"
/>
```

---

### 8. **UserMenu** - User Profile Dropdown
Comprehensive user account dropdown menu.

**Features:**
- Logged in state:
  - User avatar with initials
  - My Account
  - My Orders
  - Wishlist
  - Become a Seller
  - Settings
  - Language switcher
  - Sign Out
- Guest state:
  - Sign In
  - Create Account
  - Language switcher

**Usage:**
```tsx
import { UserMenu } from './components/Navigation/UserMenu';

<UserMenu
  isLoggedIn={true}
  userName="John Doe"
  userAvatar="https://..."
  language="en"
  onLanguageChange={setLanguage}
  onSignIn={() => {}}
  onSignOut={() => {}}
  onMyAccount={() => {}}
  onOrders={() => {}}
  onWishlist={() => {}}
  onBecomeSeller={() => {}}
  onSettings={() => {}}
/>
```

---

### 9. **MobileHamburgerMenu** - Mobile Side Menu
Slide-out side menu for mobile navigation.

**Features:**
- User profile section
- Categories list with icons
- Regions list with colors
- Account actions (if logged in)
- Become a Seller CTA
- Sign Out button
- Scrollable content
- Smooth slide-in animation

**Usage:**
```tsx
import { MobileHamburgerMenu } from './components/Navigation/MobileHamburgerMenu';

<MobileHamburgerMenu
  language="en"
  isLoggedIn={true}
  userName="John Doe"
  userAvatar="https://..."
  onCategorySelect={(id) => {}}
  onRegionSelect={(id) => {}}
  onMyAccount={() => {}}
  onOrders={() => {}}
  onSettings={() => {}}
  onBecomeSeller={() => {}}
  onSignOut={() => {}}
  onSignIn={() => {}}
/>
```

---

### 10. **Logo** - CamMarket Logo Component
Clickable logo with Cameroon flag.

**Features:**
- Gradient background (Cameroon colors)
- Tagline text
- Click handler for navigation
- Responsive sizing

**Usage:**
```tsx
import { Logo } from './components/Navigation/Logo';

<Logo
  onClick={() => navigateHome()}
  language="en"
/>
```

---

## 🎨 Design Features

### Colors
- **Primary Green:** `#10b981` - Main brand color
- **Cameroon Flag:** Green, Yellow, Red gradient
- **Region Colors:** Each region has unique color coding

### Animations
- **Fade-in:** Dropdown menus and modals
- **Slide-in:** Mobile navigation bars
- **Zoom-in:** Badge counts
- **Scale:** Active states and hover effects

### Responsive Breakpoints
- **Mobile:** < 768px - Bottom nav, hamburger menu
- **Tablet:** 768px - 1024px - Compact top nav
- **Desktop:** > 1024px - Full top nav with categories bar

---

## 🔧 State Management

### Required State
```tsx
const [language, setLanguage] = useState<'en' | 'fr'>('en');
const [selectedRegion, setSelectedRegion] = useState('all');
const [wishlistCount, setWishlistCount] = useState(0);
const [cartCount, setCartCount] = useState(0);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [activeTab, setActiveTab] = useState('home');
```

---

## 📱 Mobile-First Approach

The navigation system is built mobile-first with progressive enhancement:

1. **Mobile (< 768px)**
   - Bottom navigation bar
   - Hamburger menu
   - Simplified top bar

2. **Tablet (768px - 1024px)**
   - Full top navigation
   - Hidden bottom nav
   - Compact region selector

3. **Desktop (> 1024px)**
   - Full navigation with categories bar
   - Quick links
   - Expanded search

---

## ♿ Accessibility

- Keyboard navigation support
- ARIA labels on all interactive elements
- Focus states for all buttons
- Screen reader friendly
- Color contrast compliance (WCAG AA)

---

## 🚀 Performance Optimizations

- Debounced search (300ms)
- Lazy loading of dropdown content
- Click outside detection with cleanup
- Optimized re-renders with memo
- Efficient event handlers

---

## 📦 Dependencies

- **lucide-react** - Icons
- **@radix-ui** - UI components (via shadcn/ui)
- **tailwindcss** - Styling
- **react** - Core framework

---

## 🔄 Integration Example

```tsx
import { TopNavbar, MobileBottomNav } from './components/Navigation';

function App() {
  const [language, setLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [activeTab, setActiveTab] = useState('home');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  return (
    <div>
      {/* Desktop/Tablet Navigation */}
      <TopNavbar
        language={language}
        onLanguageChange={setLanguage}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        wishlistCount={wishlistCount}
        cartCount={cartCount}
        onWishlistClick={() => navigateToWishlist()}
        onCartClick={() => navigateToCart()}
        onLogoClick={() => navigateHome()}
        onProductSelect={(id) => navigateToProduct(id)}
        onCategorySelect={(id) => navigateToCategory(id)}
        onRegionSelect={(id) => setSelectedRegion(id)}
      />

      {/* Main Content */}
      <main>{/* Your pages here */}</main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        language={language}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={cartCount}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
      />
    </div>
  );
}
```

---

## 🐛 Troubleshooting

### Search not working?
- Check that mock-data.ts is properly imported
- Verify debounce timing (default 300ms)
- Ensure onClick handlers are passed correctly

### Navigation not sticky?
- Check z-index values (default: 50)
- Verify `sticky top-0` classes are applied
- Check for parent container overflow issues

### Mobile nav not showing?
- Verify `lg:hidden` class is applied
- Check viewport width breakpoints
- Ensure z-index is high enough (50)

---

## 📝 Notes

- All components support both English and French
- Region colors are configurable in mock-data.ts
- Cart and wishlist counts update in real-time
- Search is optimized for performance with debouncing
- All components are fully responsive

---

## 🎯 Future Enhancements

- [ ] Voice search integration
- [ ] Recent searches history
- [ ] Search suggestions based on trending items
- [ ] Notification bell with real-time updates
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Advanced search filters in dropdown
