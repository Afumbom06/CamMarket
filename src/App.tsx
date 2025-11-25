import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PromoBanner } from './components/PromoBanner';
import { FlashSalesSection } from './components/FlashSalesSection';
import { CategorySection } from './components/CategorySection';
import { RegionGrid } from './components/RegionGrid';
import { VendorSection } from './components/VendorSection';
import { TrendingProductsCarousel } from './components/TrendingProductsCarousel';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { WishlistPage } from './components/WishlistPage';
import { CartPage } from './components/CartPage';
import { RegionDetailsPage } from './components/RegionDetailsPage';
import { RegionsPage } from './components/RegionsPage';
import { CategoryPage } from './components/CategoryPage';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { Button } from './components/ui/button';
import { ArrowRight, Globe, CheckCircle2, Truck, CreditCard } from 'lucide-react';
import { 
  products, 
  mockUser, 
  mockOrders, 
  mockAddresses,
  mockVendor,
  mockSellerProducts,
  mockSellerOrders,
  mockSellerAnalytics,
  mockSellerPayments,
} from './lib/mock-data';
import { toast, Toaster } from 'sonner@2.0.3';

// Account Module Components
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  UserDashboard,
  OrderHistoryPage,
  AddressesPage,
  SettingsPage,
  ProfileEditPage,
} from './components/Account';

// Seller Dashboard Module
import { SellerDashboard } from './components/Seller';

// Cart & Checkout Module
import { EnhancedCartPage } from './components/Cart';
import { CheckoutPage, OrderConfirmationPage } from './components/Checkout';

// PWA Module
import { InstallPrompt, PushNotificationManager, OfflineIndicator, UpdatePrompt } from './components/PWA';
import { usePWA } from './hooks/usePWA';

// Map & Location Module
import { LocationsPage } from './components/LocationsPage';

type Page = 'home' | 'product-detail' | 'wishlist' | 'cart' | 'region-details' | 'regions' | 'category' | 
  'login' | 'signup' | 'forgot-password' | 'user-dashboard' | 'orders' | 'addresses' | 'settings' | 'profile-edit' |
  'seller-dashboard' | 'checkout' | 'order-confirmation' | 'locations';

interface CartItem {
  productId: number;
  quantity: number;
}

function App() {
  // Initialize PWA
  const { isInstalled, isOnline, registration } = usePWA();

  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedRegionForDetails, setSelectedRegionForDetails] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState('home');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // User Account State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<typeof mockUser | null>(null);
  const [userOrders, setUserOrders] = useState(mockOrders);
  const [userAddresses, setUserAddresses] = useState(mockAddresses);

  // Seller Dashboard State
  const [isSellerMode, setIsSellerMode] = useState(false);
  const [currentVendor, setCurrentVendor] = useState<typeof mockVendor | null>(null);
  const [sellerProducts, setSellerProducts] = useState(mockSellerProducts);
  const [sellerOrders, setSellerOrders] = useState(mockSellerOrders);
  const [sellerAnalytics] = useState(mockSellerAnalytics);
  const [sellerPayments, setSellerPayments] = useState(mockSellerPayments);

  // Cart & Checkout State
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [lastOrder, setLastOrder] = useState<any>(null);

  const handleRegionClick = (regionId: string) => {
    setSelectedRegionForDetails(regionId);
    setCurrentPage('region-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromRegion = () => {
    setSelectedRegionForDetails(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromCategory = () => {
    setSelectedCategoryId(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProduct = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlistItems(prev => {
      if (prev.includes(productId)) {
        toast.success(language === 'en' ? 'Removed from wishlist' : 'Retiré de la liste de souhaits');
        return prev.filter(id => id !== productId);
      } else {
        toast.success(language === 'en' ? 'Added to wishlist' : 'Ajouté à la liste de souhaits');
        return [...prev, productId];
      }
    });
  };

  const handleAddToCart = (productId: number, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        toast.success(language === 'en' ? 'Cart updated' : 'Panier mis à jour');
        return prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(language === 'en' ? 'Added to cart' : 'Ajouté au panier');
        return [...prev, { productId, quantity }];
      }
    });
  };

  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
    toast.success(language === 'en' ? 'Removed from cart' : 'Retiré du panier');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMobileTabChange = (tab: string) => {
    setMobileTab(tab);
    if (tab === 'home') {
      setCurrentPage('home');
    } else if (tab === 'cart') {
      setCurrentPage('cart');
    } else if (tab === 'account') {
      if (isLoggedIn) {
        setCurrentPage('user-dashboard');
      } else {
        setCurrentPage('login');
      }
    }
  };

  // Account Management Functions
  const handleLoginSuccess = (user: typeof mockUser) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setCurrentPage('user-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentPage('home');
    toast.success(language === 'en' ? 'Logged out successfully' : 'Déconnecté avec succès');
  };

  const handleProfileUpdate = (updatedUser: Partial<typeof mockUser>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updatedUser });
    }
  };

  const handleAddAddress = (address: Omit<typeof mockAddresses[0], 'id'>) => {
    const newAddress = { ...address, id: userAddresses.length + 1 };
    setUserAddresses([...userAddresses, newAddress]);
  };

  const handleUpdateAddress = (id: number, address: Omit<typeof mockAddresses[0], 'id'>) => {
    setUserAddresses(userAddresses.map(addr => addr.id === id ? { ...address, id } : addr));
  };

  const handleDeleteAddress = (id: number) => {
    setUserAddresses(userAddresses.filter(addr => addr.id !== id));
  };

  const handleSetDefaultAddress = (id: number) => {
    setUserAddresses(userAddresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  // Seller Management Functions
  const handleEnterSellerMode = () => {
    setCurrentVendor(mockVendor);
    setIsSellerMode(true);
    setCurrentPage('seller-dashboard');
  };

  const handleExitSellerMode = () => {
    setIsSellerMode(false);
    setCurrentVendor(null);
    setCurrentPage('home');
    toast.success(language === 'en' ? 'Exited seller mode' : 'Mode vendeur quitté');
  };

  const handleBackToWebsite = () => {
    setCurrentPage('home');
    toast.info(language === 'en' ? 'Returned to website' : 'Retour au site');
  };

  // Cart & Checkout Handlers
  const handleProceedToCheckout = (data: any) => {
    setCheckoutData(data);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = (orderDetails: any) => {
    // Generate order ID
    const orderId = `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    
    // Calculate estimated delivery
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + (orderDetails.deliveryMethod === 'pickup' ? 2 : 5));
    const estimatedDelivery = estimatedDate.toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const order = {
      ...orderDetails,
      orderId,
      estimatedDelivery,
      orderDate: new Date().toISOString(),
    };

    setLastOrder(order);
    
    // Add to user orders
    if (isLoggedIn) {
      setUserOrders(prev => [{
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        status: 'processing' as 'delivered' | 'processing' | 'cancelled',
        total: orderDetails.total,
        items: orderDetails.items,
        shippingAddress: orderDetails.deliveryAddress,
        trackingNumber: `CAM${new Date().getFullYear()}${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
      }, ...prev]);
    }

    // Clear cart
    setCartItems([]);
    
    // Navigate to confirmation page
    setCurrentPage('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    toast.success(language === 'en' ? 'Order placed successfully!' : 'Commande passée avec succès !');
  };

  const handleTrackOrder = () => {
    if (isLoggedIn) {
      setCurrentPage('orders');
    } else {
      setCurrentPage('login');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateVendor = (data: any) => {
    if (currentVendor) {
      setCurrentVendor({ ...currentVendor, ...data });
    }
  };

  const handleUpdateStoreRegions = (regions: string[]) => {
    if (currentVendor) {
      setCurrentVendor({ ...currentVendor, activeRegions: regions });
    }
  };

  const handleAddSellerProduct = (data: any) => {
    const newProduct = {
      ...data,
      id: sellerProducts.length + 1,
      views: 0,
      sales: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setSellerProducts([...sellerProducts, newProduct]);
  };

  const handleEditSellerProduct = (id: number, data: any) => {
    setSellerProducts(sellerProducts.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const handleDeleteSellerProduct = (id: number) => {
    setSellerProducts(sellerProducts.filter(p => p.id !== id));
  };

  const handleUpdateSellerOrderStatus = (orderId: string, status: string) => {
    setSellerOrders(sellerOrders.map(order => 
      order.id === orderId ? { ...order, status: status as any } : order
    ));
  };

  const handleSellerWithdraw = (data: any) => {
    const newTransaction = {
      id: `TXN-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amount: data.amount,
      status: 'pending' as 'pending' | 'completed' | 'failed',
      method: data.provider === 'mtn' ? 'MTN Mobile Money' : 'Orange Money',
      type: 'withdrawal' as 'withdrawal',
      reference: data.phone,
    };
    setSellerPayments({
      ...sellerPayments,
      walletBalance: sellerPayments.walletBalance - data.amount,
      pendingBalance: sellerPayments.pendingBalance + data.amount,
      transactions: [newTransaction, ...sellerPayments.transactions],
    });
  };

  const featuredProducts = products.filter(p => !p.isFlashSale).slice(0, 4);

  // Render different pages

  // Seller Dashboard
  if (currentPage === 'seller-dashboard' && isSellerMode && currentVendor) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <SellerDashboard
          language={language}
          vendor={currentVendor}
          products={sellerProducts}
          orders={sellerOrders}
          analytics={sellerAnalytics}
          payments={sellerPayments}
          onLogout={handleExitSellerMode}
          onBackToWebsite={handleBackToWebsite}
          onUpdateVendor={handleUpdateVendor}
          onUpdateRegions={handleUpdateStoreRegions}
          onAddProduct={handleAddSellerProduct}
          onEditProduct={handleEditSellerProduct}
          onDeleteProduct={handleDeleteSellerProduct}
          onUpdateOrderStatus={handleUpdateSellerOrderStatus}
          onWithdraw={handleSellerWithdraw}
        />
      </>
    );
  }
  
  // Authentication Pages
  if (currentPage === 'login') {
    return (
      <>
        <Toaster position="top-center" richColors />
        <LoginPage
          language={language}
          onLanguageChange={setLanguage}
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignup={() => setCurrentPage('signup')}
          onNavigateToForgotPassword={() => setCurrentPage('forgot-password')}
          onBack={() => setCurrentPage('home')}
        />
      </>
    );
  }

  if (currentPage === 'signup') {
    return (
      <>
        <Toaster position="top-center" richColors />
        <SignupPage
          language={language}
          onLanguageChange={setLanguage}
          onSignupSuccess={() => setCurrentPage('login')}
          onNavigateToLogin={() => setCurrentPage('login')}
          onBack={() => setCurrentPage('home')}
        />
      </>
    );
  }

  if (currentPage === 'forgot-password') {
    return (
      <>
        <Toaster position="top-center" richColors />
        <ForgotPasswordPage
          language={language}
          onBack={() => setCurrentPage('login')}
        />
      </>
    );
  }

  // User Account Pages
  if (currentPage === 'user-dashboard' && isLoggedIn && currentUser) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <div className="min-h-screen bg-gray-50">
          <Navbar 
            language={language}
            onLanguageChange={setLanguage}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            wishlistCount={wishlistItems.length}
            cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            onWishlistClick={() => setCurrentPage('wishlist')}
            onCartClick={() => setCurrentPage('cart')}
            onLogoClick={handleBackToHome}
            onProductSelect={handleViewProduct}
            onCategorySelect={handleCategoryClick}
            onRegionSelect={handleRegionClick}
            isLoggedIn={isLoggedIn}
            isSellerMode={isSellerMode}
            user={currentUser}
            onAccountClick={() => setCurrentPage('user-dashboard')}
            onSignIn={() => setCurrentPage('login')}
            onSignUp={() => setCurrentPage('signup')}
            onSellerDashboard={() => setCurrentPage('seller-dashboard')}
            onLogout={handleLogout}
          />
          <UserDashboard
            user={currentUser}
            language={language}
            onNavigateToOrders={() => setCurrentPage('orders')}
            onNavigateToWishlist={() => setCurrentPage('wishlist')}
            onNavigateToAddresses={() => setCurrentPage('addresses')}
            onNavigateToSettings={() => setCurrentPage('settings')}
            onEditProfile={() => setCurrentPage('profile-edit')}
            ordersCount={userOrders.length}
            wishlistCount={wishlistItems.length}
            addressesCount={userAddresses.length}
          />
          <Footer language={language} />
          <MobileBottomNav 
            language={language}
            activeTab="account"
            onTabChange={handleMobileTabChange}
            cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
        </div>
      </>
    );
  }

  if (currentPage === 'orders' && isLoggedIn) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <OrderHistoryPage
          orders={userOrders}
          language={language}
          onBack={() => setCurrentPage('user-dashboard')}
          onViewOrderDetails={(orderId) => {
            toast.info(language === 'en' ? `Order #${orderId} details` : `Détails de la commande #${orderId}`);
          }}
        />
      </>
    );
  }

  if (currentPage === 'addresses' && isLoggedIn) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <AddressesPage
          addresses={userAddresses}
          language={language}
          onBack={() => setCurrentPage('user-dashboard')}
          onAddAddress={handleAddAddress}
          onUpdateAddress={handleUpdateAddress}
          onDeleteAddress={handleDeleteAddress}
          onSetDefaultAddress={handleSetDefaultAddress}
        />
      </>
    );
  }

  if (currentPage === 'settings' && isLoggedIn) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <SettingsPage
          language={language}
          onLanguageChange={setLanguage}
          onBack={() => setCurrentPage('user-dashboard')}
          onLogout={handleLogout}
        />
      </>
    );
  }

  if (currentPage === 'profile-edit' && isLoggedIn && currentUser) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <ProfileEditPage
          user={currentUser}
          language={language}
          onBack={() => setCurrentPage('user-dashboard')}
          onSave={handleProfileUpdate}
        />
      </>
    );
  }

  if (currentPage === 'category' && selectedCategoryId) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <CategoryPage
          categoryId={selectedCategoryId}
          language={language}
          onBack={handleBackFromCategory}
          onViewProduct={handleViewProduct}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={(id) => handleAddToCart(id, 1)}
          wishlistItems={wishlistItems}
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistCount={wishlistItems.length}
        />
      </>
    );
  }

  if (currentPage === 'locations') {
    return (
      <>
        <Toaster position="top-center" richColors />
        <div className="min-h-screen bg-white">
          <LocationsPage
            language={language}
            onBack={handleBackToHome}
            userRegion={currentUser?.region || selectedRegion || 'centre'}
          />
          <MobileBottomNav 
            language={language}
            activeTab={mobileTab}
            onTabChange={handleMobileTabChange}
            cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
        </div>
      </>
    );
  }

  if (currentPage === 'regions') {
    return (
      <>
        <Toaster position="top-center" richColors />
        <div className="min-h-screen bg-white">
          <Navbar 
            language={language}
            onLanguageChange={setLanguage}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            wishlistCount={wishlistItems.length}
            cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            onWishlistClick={() => setCurrentPage('wishlist')}
            onCartClick={() => setCurrentPage('cart')}
            isLoggedIn={isLoggedIn}
            isSellerMode={isSellerMode}
            user={currentUser ? { name: currentUser.name, avatar: currentUser.avatar } : undefined}
            onAccountClick={() => {
              if (isLoggedIn) {
                setCurrentPage('user-dashboard');
              } else {
                setCurrentPage('login');
              }
            }}
            onSignIn={() => setCurrentPage('login')}
            onSignUp={() => setCurrentPage('signup')}
            onBecomeSeller={handleEnterSellerMode}
            onSellerDashboard={() => setCurrentPage('seller-dashboard')}
            onLogout={handleLogout}
          />
          <RegionsPage 
            language={language} 
            onRegionClick={handleRegionClick}
          />
          <Footer language={language} />
          <MobileBottomNav 
            language={language}
            activeTab={mobileTab}
            onTabChange={handleMobileTabChange}
            cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
        </div>
      </>
    );
  }

  if (currentPage === 'region-details' && selectedRegionForDetails) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <div className="min-h-screen bg-white">
          <RegionDetailsPage
            regionId={selectedRegionForDetails}
            language={language}
            onBack={handleBackFromRegion}
            onViewProduct={handleViewProduct}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(id) => handleAddToCart(id, 1)}
            wishlistItems={wishlistItems}
          />
        </div>
      </>
    );
  }

  if (currentPage === 'product-detail' && selectedProductId) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <div className="min-h-screen bg-white">
          <ProductDetailPage
            productId={selectedProductId}
            language={language}
            onBack={handleBackToHome}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={wishlistItems.includes(selectedProductId)}
          />
        </div>
      </>
    );
  }

  if (currentPage === 'wishlist') {
    return (
      <>
        <Toaster position="top-center" richColors />
        <div className="min-h-screen bg-white">
          <WishlistPage
            language={language}
            wishlistItems={wishlistItems}
            onBack={handleBackToHome}
            onRemoveFromWishlist={handleToggleWishlist}
            onAddToCart={(productId) => handleAddToCart(productId, 1)}
            onViewProduct={handleViewProduct}
          />
          <MobileBottomNav 
            language={language}
            activeTab={mobileTab}
            onTabChange={handleMobileTabChange}
            cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
        </div>
      </>
    );
  }

  if (currentPage === 'cart') {
    return (
      <>
        <Toaster position="top-center" richColors />
        <div className="min-h-screen bg-white">
          <EnhancedCartPage
            language={language}
            cartItems={cartItems}
            userRegion={currentUser?.region || selectedRegion || 'centre'}
            onBack={handleBackToHome}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onViewProduct={handleViewProduct}
            onProceedToCheckout={handleProceedToCheckout}
          />
          <MobileBottomNav 
            language={language}
            activeTab={mobileTab}
            onTabChange={handleMobileTabChange}
            cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
        </div>
      </>
    );
  }

  if (currentPage === 'checkout') {
    return (
      <>
        <Toaster position="top-center" richColors />
        <div className="min-h-screen bg-white">
          <CheckoutPage
            language={language}
            cartItems={cartItems}
            userRegion={currentUser?.region || selectedRegion || 'centre'}
            checkoutData={checkoutData}
            onBack={() => setCurrentPage('cart')}
            onPlaceOrder={handlePlaceOrder}
            isLoggedIn={isLoggedIn}
            userAddresses={userAddresses}
          />
        </div>
      </>
    );
  }

  if (currentPage === 'order-confirmation') {
    return (
      <>
        <Toaster position="top-center" richColors />
        <div className="min-h-screen bg-white">
          <OrderConfirmationPage
            language={language}
            orderDetails={lastOrder}
            onTrackOrder={handleTrackOrder}
            onReturnHome={handleBackToHome}
            onContinueShopping={handleBackToHome}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      
      {/* PWA Components */}
      <OfflineIndicator language={language} />
      <UpdatePrompt language={language} />
      <InstallPrompt language={language} />
      
      <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar 
        language={language}
        onLanguageChange={setLanguage}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        wishlistCount={wishlistItems.length}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onWishlistClick={() => setCurrentPage('wishlist')}
        onCartClick={() => setCurrentPage('cart')}
        onLogoClick={handleBackToHome}
        onProductSelect={handleViewProduct}
        onCategorySelect={handleCategoryClick}
        onRegionSelect={handleRegionClick}
        isLoggedIn={isLoggedIn}
        isSellerMode={isSellerMode}
        user={currentUser ? { name: currentUser.name, avatar: currentUser.avatar } : undefined}
        onAccountClick={() => {
          if (isLoggedIn) {
            setCurrentPage('user-dashboard');
          } else {
            setCurrentPage('login');
          }
        }}
        onSignIn={() => setCurrentPage('login')}
        onSignUp={() => setCurrentPage('signup')}
        onBecomeSeller={handleEnterSellerMode}
        onSellerDashboard={() => setCurrentPage('seller-dashboard')}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <HeroSection language={language} />

      {/* Promo Banner */}
      <PromoBanner language={language} />

      {/* Flash Sales */}
      <FlashSalesSection 
        language={language}
        onViewProduct={handleViewProduct}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(id) => handleAddToCart(id, 1)}
        wishlistItems={wishlistItems}
      />

      {/* Categories */}
      <CategorySection language={language} onCategoryClick={handleCategoryClick} />

      {/* Trending Products Carousel */}
      <TrendingProductsCarousel 
        language={language}
        onViewProduct={handleViewProduct}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(id) => handleAddToCart(id, 1)}
        wishlistItems={wishlistItems}
      />

      {/* Regional Explorer */}
      <section className="py-12 bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="text-center flex-1">
              <h2 className="text-2xl md:text-3xl mb-3">
                {language === 'en' ? 'Explore by Region' : 'Explorer par Région'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'en' 
                  ? 'Discover unique products from all 10 regions of Cameroon. Each region offers its own special treasures.'
                  : 'Découvrez des produits uniques des 10 régions du Cameroun. Chaque région offre ses propres trésors.'}
              </p>
            </div>
            <Button 
              variant="outline" 
              className="gap-2 hidden lg:flex shrink-0"
              onClick={() => setCurrentPage('regions')}
            >
              {language === 'en' ? 'View All Regions' : 'Voir Toutes les Régions'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <RegionGrid language={language} onRegionClick={handleRegionClick} />
          <div className="text-center mt-6 lg:hidden">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setCurrentPage('regions')}
            >
              {language === 'en' ? 'View All Regions' : 'Voir Toutes les Régions'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl mb-2">
                {language === 'en' ? 'Featured Products' : 'Produits en Vedette'}
              </h2>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Handpicked items from verified sellers'
                  : 'Articles sélectionnés de vendeurs vérifiés'}
              </p>
            </div>
            <Button variant="outline" className="gap-2 hidden sm:flex">
              {language === 'en' ? 'View All' : 'Voir Tout'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                language={language}
                onViewProduct={handleViewProduct}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={(id) => handleAddToCart(id, 1)}
                isInWishlist={wishlistItems.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Top Vendors */}
      <VendorSection language={language} />

      {/* Why Choose CamMarket */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center mb-12">
            {language === 'en' ? 'Why Choose CamMarket?' : 'Pourquoi Choisir CamMarket?'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl">
                  <Globe className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="mb-2">
                {language === 'en' ? 'All Regions' : 'Toutes les Régions'}
              </h3>
              <p className="text-gray-400 text-sm">
                {language === 'en' 
                  ? 'Access products from all 10 regions of Cameroon in one place'
                  : 'Accédez aux produits des 10 régions du Cameroun en un seul endroit'}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-2xl">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="mb-2">
                {language === 'en' ? 'Verified Sellers' : 'Vendeurs Vérifiés'}
              </h3>
              <p className="text-gray-400 text-sm">
                {language === 'en' 
                  ? 'All vendors are verified for your safety and trust'
                  : 'Tous les vendeurs sont vérifiés pour votre sécurité'}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl">
                  <Truck className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="mb-2">
                {language === 'en' ? 'Fast Delivery' : 'Livraison Rapide'}
              </h3>
              <p className="text-gray-400 text-sm">
                {language === 'en' 
                  ? 'Quick delivery across all regions with tracking'
                  : 'Livraison rapide dans toutes les régions avec suivi'}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl">
                  <CreditCard className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="mb-2">
                {language === 'en' ? 'Secure Payment' : 'Paiement Sécurisé'}
              </h3>
              <p className="text-gray-400 text-sm">
                {language === 'en' 
                  ? 'MTN Momo, Orange Money, and more payment options'
                  : 'MTN Momo, Orange Money et plus d\'options de paiement'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl mb-4">
            {language === 'en' 
              ? 'Get the Best Deals Delivered to Your Inbox' 
              : 'Recevez les Meilleures Offres dans Votre Boîte Mail'}
          </h2>
          <p className="mb-8 opacity-90">
            {language === 'en' 
              ? 'Subscribe to our newsletter for exclusive offers and updates'
              : 'Abonnez-vous à notre newsletter pour des offres exclusives'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={language === 'en' ? 'Enter your email' : 'Entrez votre email'}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              {language === 'en' ? 'Subscribe' : 'S\'abonner'}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        language={language}
        activeTab={mobileTab}
        onTabChange={handleMobileTabChange}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
      />
      </div>
    </>
  );
}

export default App;
