import { useState, useMemo } from 'react';
import { ArrowLeft, Filter, Loader2, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent } from './ui/sheet';
import { CategoryBanner } from './CategoryBanner';
import { FilterSidebar, FilterState } from './FilterSidebar';
import { SortDropdown } from './SortDropdown';
import { ProductCard } from './ProductCard';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { products } from '../lib/mock-data';
import { Skeleton } from './ui/skeleton';

interface CategoryPageProps {
  categoryId: string;
  language: 'en' | 'fr';
  onBack: () => void;
  onViewProduct: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  wishlistItems: number[];
  cartCount?: number;
  wishlistCount?: number;
}

const PRODUCTS_PER_PAGE = 12;

export function CategoryPage({
  categoryId,
  language,
  onBack,
  onViewProduct,
  onToggleWishlist,
  onAddToCart,
  wishlistItems,
  cartCount = 0,
  wishlistCount = 0
}: CategoryPageProps) {
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 500000,
    selectedRegions: [],
    selectedRating: 0,
    selectedDelivery: [],
    selectedCondition: 'all'
  });
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileTab, setMobileTab] = useState('home');

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(p => p.category === categoryId);

    // Apply price filter
    filtered = filtered.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    // Apply region filter
    if (filters.selectedRegions.length > 0) {
      filtered = filtered.filter(p => filters.selectedRegions.includes(p.region));
    }

    // Apply rating filter
    if (filters.selectedRating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.selectedRating);
    }

    // Apply delivery filter
    if (filters.selectedDelivery.length > 0) {
      filtered = filtered.filter(p => 
        filters.selectedDelivery.some(d => p.deliveryOptions.includes(d))
      );
    }

    // Apply condition filter
    if (filters.selectedCondition !== 'all') {
      filtered = filtered.filter(p => p.condition === filters.selectedCondition);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [categoryId, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  // Loading state skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Package className="h-20 w-20 text-gray-300 mb-4" />
      <h3 className="text-xl mb-2">
        {language === 'en' ? 'No products found' : 'Aucun produit trouvé'}
      </h3>
      <p className="text-gray-500 mb-6 max-w-md">
        {language === 'en'
          ? 'No products match your filter criteria. Try adjusting your filters to see more results.'
          : 'Aucun produit ne correspond à vos critères. Essayez d\'ajuster vos filtres pour voir plus de résultats.'}
      </p>
      <Button
        variant="outline"
        onClick={() => handleFiltersChange({
          minPrice: 0,
          maxPrice: 500000,
          selectedRegions: [],
          selectedRating: 0,
          selectedDelivery: [],
          selectedCondition: 'all'
        })}
      >
        {language === 'en' ? 'Reset Filters' : 'Réinitialiser les Filtres'}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        language={language}
        onLanguageChange={() => {}}
        selectedRegion="all"
        onRegionChange={() => {}}
        wishlistCount={wishlistCount}
        cartCount={cartCount}
        onWishlistClick={() => {}}
        onCartClick={() => {}}
      />

      {/* Category Banner */}
      <CategoryBanner
        categoryId={categoryId}
        language={language}
        onNavigateHome={onBack}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                language={language}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                totalProducts={filteredAndSortedProducts.length}
              />
            </div>
          </aside>

          {/* Products Section */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border sticky top-20 z-10">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  className="lg:hidden gap-2"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="h-4 w-4" />
                  {language === 'en' ? 'Filters' : 'Filtres'}
                </Button>

                {/* Results Count */}
                <div className="text-sm text-gray-600">
                  {filteredAndSortedProducts.length}{' '}
                  {language === 'en' ? 'products found' : 'produits trouvés'}
                </div>
              </div>

              {/* Sort Dropdown */}
              <SortDropdown
                language={language}
                selectedSort={sortBy}
                onSortChange={handleSortChange}
              />
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <LoadingSkeleton />
            ) : paginatedProducts.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      language={language}
                      onViewProduct={onViewProduct}
                      onToggleWishlist={onToggleWishlist}
                      onAddToCart={onAddToCart}
                      isInWishlist={wishlistItems.includes(product.id)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>

                        {[...Array(totalPages)].map((_, i) => {
                          const page = i + 1;
                          // Show first page, last page, current page, and pages around current
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  onClick={() => setCurrentPage(page)}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                          return null;
                        })}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="left" className="w-full sm:w-96 p-0">
          <FilterSidebar
            language={language}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClose={() => setIsFilterOpen(false)}
            isMobile
            totalProducts={filteredAndSortedProducts.length}
          />
        </SheetContent>
      </Sheet>

      {/* Footer */}
      <Footer language={language} />

      {/* Mobile Bottom Nav */}
      <MobileBottomNav
        language={language}
        activeTab={mobileTab}
        onTabChange={setMobileTab}
      />
    </div>
  );
}
