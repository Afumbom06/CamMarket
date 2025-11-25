import { Grid3x3, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { categories } from '../../lib/mock-data';
import { getCategoryIcon } from '../../lib/category-icons';

interface CategoriesDropdownProps {
  onCategorySelect: (categoryId: string) => void;
  language: 'en' | 'fr';
}

export function CategoriesDropdown({ onCategorySelect, language }: CategoriesDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 hidden lg:flex">
          <Grid3x3 className="h-4 w-4" />
          {language === 'en' ? 'All Categories' : 'Toutes Catégories'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <div className="grid gap-1 p-2">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.icon);
            return (
              <DropdownMenuItem
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className="cursor-pointer p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm">
                        {language === 'en' ? category.name : category.nameFr}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === 'en' ? category.description : category.descriptionFr}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
