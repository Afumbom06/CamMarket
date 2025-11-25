import { 
  UtensilsCrossed, 
  Smartphone, 
  Shirt, 
  Wheat, 
  Wrench, 
  Palette,
  LucideIcon 
} from 'lucide-react';

// Map category icon names to lucide-react components
export const categoryIconMap: Record<string, LucideIcon> = {
  UtensilsCrossed: UtensilsCrossed,
  Smartphone: Smartphone,
  Shirt: Shirt,
  Wheat: Wheat,
  Wrench: Wrench,
  Palette: Palette,
};

// Get icon component by name
export function getCategoryIcon(iconName: string): LucideIcon {
  return categoryIconMap[iconName] || UtensilsCrossed;
}
