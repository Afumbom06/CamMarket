import { useState } from 'react';
import { Search, Edit, Trash2, Eye, Package, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { toast } from 'sonner@2.0.3';

interface Product {
  id: number;
  name: string;
  nameFr: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'out-of-stock';
  images: string[];
  views: number;
  sales: number;
}

interface ProductsListProps {
  language: 'en' | 'fr';
  products: Product[];
  onEditProduct: (productId: number) => void;
  onDeleteProduct: (productId: number) => void;
  onAddProduct: () => void;
}

export function ProductsList({ 
  language, 
  products, 
  onEditProduct, 
  onDeleteProduct,
  onAddProduct 
}: ProductsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.nameFr.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (productId: number) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      onDeleteProduct(productToDelete);
      toast.success(
        language === 'en' 
          ? 'Product deleted successfully' 
          : 'Produit supprimé avec succès'
      );
    }
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const getStatusBadge = (status: string, stock: number) => {
    if (status === 'out-of-stock' || stock === 0) {
      return (
        <Badge className="bg-red-100 text-red-700">
          {language === 'en' ? 'Out of Stock' : 'Rupture de Stock'}
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-100 text-green-700">
        {language === 'en' ? 'Active' : 'Actif'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl mb-1">
            {language === 'en' ? 'My Products' : 'Mes Produits'}
          </h2>
          <p className="text-gray-600">
            {language === 'en' 
              ? `Manage your ${products.length} products` 
              : `Gérez vos ${products.length} produits`}
          </p>
        </div>
        <Button onClick={onAddProduct} className="gap-2 bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4" />
          {language === 'en' ? 'Add Product' : 'Ajouter Produit'}
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            placeholder={language === 'en' ? 'Search products...' : 'Rechercher des produits...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus-visible:ring-0"
          />
        </div>
      </Card>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg mb-2">
              {language === 'en' ? 'No products found' : 'Aucun produit trouvé'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'en' 
                ? 'Start by adding your first product' 
                : 'Commencez par ajouter votre premier produit'}
            </p>
            <Button onClick={onAddProduct} className="gap-2">
              <Plus className="h-4 w-4" />
              {language === 'en' ? 'Add Product' : 'Ajouter Produit'}
            </Button>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Product' : 'Produit'}</TableHead>
                  <TableHead>{language === 'en' ? 'Price' : 'Prix'}</TableHead>
                  <TableHead>{language === 'en' ? 'Stock' : 'Stock'}</TableHead>
                  <TableHead>{language === 'en' ? 'Status' : 'Statut'}</TableHead>
                  <TableHead>{language === 'en' ? 'Views' : 'Vues'}</TableHead>
                  <TableHead>{language === 'en' ? 'Sales' : 'Ventes'}</TableHead>
                  <TableHead className="text-right">{language === 'en' ? 'Actions' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm">
                            {language === 'en' ? product.name : product.nameFr}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{product.price.toLocaleString()} FCFA</span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm ${product.stock === 0 ? 'text-red-600' : ''}`}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(product.status, product.stock)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Eye className="h-4 w-4" />
                        {product.views}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-green-600">{product.sales}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEditProduct(product.id)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(product.id)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'en' ? 'Delete Product?' : 'Supprimer le Produit?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'en'
                ? 'This action cannot be undone. This will permanently delete the product from your store.'
                : 'Cette action ne peut pas être annulée. Cela supprimera définitivement le produit de votre magasin.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {language === 'en' ? 'Delete' : 'Supprimer'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
