import { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import { SearchAutocompleteDropdown } from './SearchAutocompleteDropdown';
import { products, categories, regions } from '../../lib/mock-data';

interface SearchBarProps {
  language: 'en' | 'fr';
  onProductSelect?: (productId: number) => void;
  onCategorySelect?: (categoryId: string) => void;
  onRegionSelect?: (regionId: string) => void;
  placeholder?: string;
}

export function SearchBar({ 
  language, 
  onProductSelect,
  onCategorySelect,
  onRegionSelect,
  placeholder 
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const defaultPlaceholder = language === 'en' 
    ? 'Search products, categories, regions...' 
    : 'Rechercher produits, catégories, régions...';

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Simulate API search with debounce
  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsOpen(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Filter results based on search query
  const searchResults = {
    products: products.filter(p => 
      (language === 'en' ? p.name : p.nameFr)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ).slice(0, 5),
    categories: categories.filter(c => 
      (language === 'en' ? c.name : c.nameFr)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ).slice(0, 3),
    regions: regions.filter(r => 
      (language === 'en' ? r.name : r.nameFr)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ).slice(0, 3),
  };

  const handleClear = () => {
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleProductClick = (productId: number) => {
    setIsOpen(false);
    setSearchQuery('');
    onProductSelect?.(productId);
  };

  const handleCategoryClick = (categoryId: string) => {
    setIsOpen(false);
    setSearchQuery('');
    onCategorySelect?.(categoryId);
  };

  const handleRegionClick = (regionId: string) => {
    setIsOpen(false);
    setSearchQuery('');
    onRegionSelect?.(regionId);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="flex-1 max-w-2xl relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
        <Input
          type="search"
          placeholder={placeholder || defaultPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery.length > 0 && setIsOpen(true)}
          className="pl-10 pr-10 w-full"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
        )}
        {searchQuery && !isLoading && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && searchQuery.length > 0 && !isLoading && (
        <SearchAutocompleteDropdown
          results={searchResults}
          language={language}
          onProductClick={handleProductClick}
          onCategoryClick={handleCategoryClick}
          onRegionClick={handleRegionClick}
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
}
