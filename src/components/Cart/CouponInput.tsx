import { useState } from 'react';
import { Tag, X, Check } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { mockCoupons } from '../../lib/mock-data';

interface CouponInputProps {
  language: 'en' | 'fr';
  subtotal: number;
  onCouponApplied: (discount: number, code: string) => void;
  onCouponRemoved: () => void;
  appliedCoupon?: { code: string; discount: number };
}

export function CouponInput({
  language,
  subtotal,
  onCouponApplied,
  onCouponRemoved,
  appliedCoupon,
}: CouponInputProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error(language === 'en' ? 'Please enter a coupon code' : 'Veuillez entrer un code promo');
      return;
    }

    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      const coupon = mockCoupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
      
      if (!coupon || !coupon.valid) {
        toast.error(language === 'en' ? 'Invalid coupon code' : 'Code promo invalide');
        setIsApplying(false);
        return;
      }

      if (subtotal < coupon.minOrder) {
        toast.error(
          language === 'en' 
            ? `Minimum order of ${coupon.minOrder.toLocaleString()} FCFA required` 
            : `Commande minimale de ${coupon.minOrder.toLocaleString()} FCFA requise`
        );
        setIsApplying(false);
        return;
      }

      let discount = 0;
      if (coupon.type === 'percentage') {
        discount = (subtotal * coupon.discount) / 100;
        if (coupon.maxDiscount && discount > coupon.maxDiscount) {
          discount = coupon.maxDiscount;
        }
      } else {
        discount = coupon.discount;
      }

      onCouponApplied(discount, coupon.code);
      toast.success(
        language === 'en' 
          ? `Coupon applied! You saved ${discount.toLocaleString()} FCFA` 
          : `Code appliqué ! Vous avez économisé ${discount.toLocaleString()} FCFA`
      );
      setCouponCode('');
      setIsApplying(false);
    }, 500);
  };

  const handleRemoveCoupon = () => {
    onCouponRemoved();
    toast.success(language === 'en' ? 'Coupon removed' : 'Code promo retiré');
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm flex items-center gap-2">
        <Tag className="h-4 w-4 text-green-600" />
        {language === 'en' ? 'Coupon Code' : 'Code Promo'}
      </label>
      
      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm">
              <Badge variant="outline" className="bg-white">
                {appliedCoupon.code}
              </Badge>
            </span>
            <span className="text-sm text-green-700">
              -{appliedCoupon.discount.toLocaleString()} FCFA
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveCoupon}
            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder={language === 'en' ? 'Enter code' : 'Entrer le code'}
            className="flex-1"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
            disabled={isApplying}
          />
          <Button 
            variant="outline" 
            onClick={handleApplyCoupon}
            disabled={isApplying || !couponCode.trim()}
          >
            {isApplying 
              ? (language === 'en' ? 'Applying...' : 'Application...') 
              : (language === 'en' ? 'Apply' : 'Appliquer')}
          </Button>
        </div>
      )}

      {/* Available Coupons Hint */}
      {!appliedCoupon && (
        <div className="text-xs text-gray-500">
          {language === 'en' ? 'Try: ' : 'Essayez : '}
          {mockCoupons.slice(0, 2).map((c, i) => (
            <button
              key={c.code}
              onClick={() => setCouponCode(c.code)}
              className="text-green-600 hover:underline mx-1"
            >
              {c.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
