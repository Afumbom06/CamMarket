import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  language: 'en' | 'fr';
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

export function SortDropdown({ language, selectedSort, onSortChange }: SortDropdownProps) {
  const sortOptions = [
    { value: 'popular', label: language === 'en' ? 'Popularity' : 'Popularité' },
    { value: 'price-low', label: language === 'en' ? 'Price: Low to High' : 'Prix: Croissant' },
    { value: 'price-high', label: language === 'en' ? 'Price: High to Low' : 'Prix: Décroissant' },
    { value: 'newest', label: language === 'en' ? 'Newest Items' : 'Nouveautés' },
    { value: 'rating', label: language === 'en' ? 'Highest Rated' : 'Mieux Notés' }
  ];

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-gray-600" />
      <Select value={selectedSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={language === 'en' ? 'Sort by' : 'Trier par'} />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
