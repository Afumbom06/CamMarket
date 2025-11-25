import { Package, Grid3x3, MapPin, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

interface SearchResult {
  products: Array<{
    id: number;
    name: string;
    nameFr: string;
    price: number;
    image: string;
    category: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
    nameFr: string;
  }>;
  regions: Array<{
    id: string;
    name: string;
    nameFr: string;
    color: string;
  }>;
}

interface SearchAutocompleteDropdownProps {
  results: SearchResult;
  language: 'en' | 'fr';
  onProductClick: (productId: number) => void;
  onCategoryClick: (categoryId: string) => void;
  onRegionClick: (regionId: string) => void;
  searchQuery: string;
}

export function SearchAutocompleteDropdown({
  results,
  language,
  onProductClick,
  onCategoryClick,
  onRegionClick,
  searchQuery,
}: SearchAutocompleteDropdownProps) {
  const hasResults = 
    results.products.length > 0 || 
    results.categories.length > 0 || 
    results.regions.length > 0;

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 text-gray-900 rounded px-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 max-h-[500px] overflow-y-auto z-50 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
      {!hasResults ? (
        <div className="p-6 text-center text-gray-500">
          <Package className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p>
            {language === 'en' 
              ? 'No results found' 
              : 'Aucun résultat trouvé'}
          </p>
          <p className="text-sm mt-1">
            {language === 'en' 
              ? 'Try different keywords' 
              : 'Essayez d\'autres mots-clés'}
          </p>
        </div>
      ) : (
        <div className="p-2">
          {/* Products */}
          {results.products.length > 0 && (
            <div className="mb-2">
              <div className="px-3 py-2 flex items-center gap-2 text-sm text-gray-500">
                <TrendingUp className="h-4 w-4" />
                {language === 'en' ? 'Products' : 'Produits'}
              </div>
              {results.products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => onProductClick(product.id)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                  <img
                    src={product.image}
                    alt={language === 'en' ? product.name : product.nameFr}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">
                      {highlightMatch(
                        language === 'en' ? product.name : product.nameFr,
                        searchQuery
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.price.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {language === 'en' ? 'View' : 'Voir'}
                  </Badge>
                </button>
              ))}
            </div>
          )}

          {/* Categories */}
          {results.categories.length > 0 && (
            <>
              {results.products.length > 0 && <Separator className="my-2" />}
              <div className="mb-2">
                <div className="px-3 py-2 flex items-center gap-2 text-sm text-gray-500">
                  <Grid3x3 className="h-4 w-4" />
                  {language === 'en' ? 'Categories' : 'Catégories'}
                </div>
                {results.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryClick(category.id)}
                    className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Grid3x3 className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        {highlightMatch(
                          language === 'en' ? category.name : category.nameFr,
                          searchQuery
                        )}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Regions */}
          {results.regions.length > 0 && (
            <>
              {(results.products.length > 0 || results.categories.length > 0) && (
                <Separator className="my-2" />
              )}
              <div className="mb-2">
                <div className="px-3 py-2 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  {language === 'en' ? 'Regions' : 'Régions'}
                </div>
                {results.regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => onRegionClick(region.id)}
                    className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors text-left"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${region.color}20` }}
                    >
                      <MapPin 
                        className="h-5 w-5" 
                        style={{ color: region.color }} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        {highlightMatch(
                          language === 'en' ? region.name : region.nameFr,
                          searchQuery
                        )}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  );
}
