import { useState } from 'react';
import { SellerSidebar } from './SellerSidebar';
import { SellerTopBar } from './SellerTopBar';
import { SalesOverview } from './SalesOverview';
import { ProductsList } from './ProductsList';
import { ProductForm } from './ProductForm';
import { OrderTracking } from './OrderTracking';
import { Analytics } from './Analytics';
import { PaymentsTracking } from './PaymentsTracking';
import { StoreRegions } from './StoreRegions';
import { VendorProfile } from './VendorProfile';
import { Sheet, SheetContent } from '../ui/sheet';

interface SellerDashboardProps {
  language: 'en' | 'fr';
  vendor: any;
  products: any[];
  orders: any[];
  analytics: any;
  payments: any;
  onLogout: () => void;
  onBackToWebsite?: () => void;
  onUpdateVendor: (data: any) => void;
  onUpdateRegions: (regions: string[]) => void;
  onAddProduct: (data: any) => void;
  onEditProduct: (id: number, data: any) => void;
  onDeleteProduct: (id: number) => void;
  onUpdateOrderStatus: (orderId: string, status: string) => void;
  onWithdraw: (data: any) => void;
}

export function SellerDashboard({
  language,
  vendor,
  products,
  orders,
  analytics,
  payments,
  onLogout,
  onBackToWebsite,
  onUpdateVendor,
  onUpdateRegions,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onWithdraw,
}: SellerDashboardProps) {
  const [activePage, setActivePage] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditProduct = (productId: number) => {
    setEditingProductId(productId);
    setActivePage('edit-product');
  };

  const handleSaveProduct = (data: any) => {
    if (activePage === 'edit-product' && editingProductId) {
      onEditProduct(editingProductId, data);
      setEditingProductId(null);
    } else {
      onAddProduct(data);
    }
    setActivePage('products');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'overview':
        return (
          <SalesOverview
            language={language}
            analytics={{
              totalSales: payments.totalEarnings,
              totalOrders: orders.length,
              totalProducts: products.length,
              productsSold: products.reduce((sum, p) => sum + p.sales, 0),
            }}
            recentOrders={orders}
            bestSellers={analytics.productPerformance}
          />
        );

      case 'products':
        return (
          <ProductsList
            language={language}
            products={products}
            onEditProduct={handleEditProduct}
            onDeleteProduct={onDeleteProduct}
            onAddProduct={() => setActivePage('add-product')}
          />
        );

      case 'add-product':
        return (
          <ProductForm
            language={language}
            mode="add"
            onBack={() => setActivePage('products')}
            onSave={handleSaveProduct}
          />
        );

      case 'edit-product':
        const productToEdit = products.find(p => p.id === editingProductId);
        return (
          <ProductForm
            language={language}
            mode="edit"
            initialData={productToEdit}
            onBack={() => {
              setActivePage('products');
              setEditingProductId(null);
            }}
            onSave={handleSaveProduct}
          />
        );

      case 'orders':
        return (
          <OrderTracking
            language={language}
            orders={orders}
            onUpdateOrderStatus={onUpdateOrderStatus}
          />
        );

      case 'analytics':
        return (
          <Analytics
            language={language}
            analytics={analytics}
          />
        );

      case 'payments':
        return (
          <PaymentsTracking
            language={language}
            payments={payments}
            onWithdraw={onWithdraw}
          />
        );

      case 'regions':
        return (
          <StoreRegions
            language={language}
            activeRegions={vendor.activeRegions}
            onSave={onUpdateRegions}
          />
        );

      case 'profile':
        return (
          <VendorProfile
            language={language}
            vendor={vendor}
            onSave={onUpdateVendor}
          />
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r bg-white">
          <SellerSidebar
            language={language}
            activePage={activePage}
            onNavigate={handleNavigate}
            onLogout={onLogout}
            onBackToWebsite={onBackToWebsite}
          />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <SellerSidebar
              language={language}
              activePage={activePage}
              onNavigate={handleNavigate}
              onLogout={onLogout}
              onBackToWebsite={onBackToWebsite}
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <SellerTopBar
            language={language}
            vendor={vendor}
            notificationCount={3}
            onAddProduct={() => setActivePage('add-product')}
            onViewProfile={() => setActivePage('profile')}
            onBackToWebsite={onBackToWebsite}
            onToggleMobileSidebar={() => setMobileMenuOpen(!mobileMenuOpen)}
            isMobileSidebarOpen={mobileMenuOpen}
          />

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-6 lg:px-6 lg:py-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
