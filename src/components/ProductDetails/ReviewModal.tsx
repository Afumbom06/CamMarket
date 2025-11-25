import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  language: 'en' | 'fr';
  onSubmit?: (rating: number, comment: string) => void;
}

export function ReviewModal({ 
  isOpen, 
  onClose, 
  productName, 
  language,
  onSubmit 
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error(
        language === 'en' 
          ? 'Please select a rating' 
          : 'Veuillez sélectionner une note'
      );
      return;
    }

    if (comment.trim().length < 10) {
      toast.error(
        language === 'en' 
          ? 'Please write at least 10 characters' 
          : 'Veuillez écrire au moins 10 caractères'
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (onSubmit) {
        onSubmit(rating, comment);
      }
      
      toast.success(
        language === 'en' 
          ? 'Thank you for your review!' 
          : 'Merci pour votre avis!'
      );
      
      setRating(0);
      setComment('');
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {language === 'en' ? 'Write a Review' : 'Écrire un Avis'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? `Share your experience with ${productName}` 
              : `Partagez votre expérience avec ${productName}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Rating Selection */}
          <div>
            <Label>
              {language === 'en' ? 'Your Rating' : 'Votre Note'}
            </Label>
            <div className="flex items-center gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-gray-600">
                  {rating === 5 && (language === 'en' ? 'Excellent!' : 'Excellent!')}
                  {rating === 4 && (language === 'en' ? 'Good' : 'Bien')}
                  {rating === 3 && (language === 'en' ? 'Average' : 'Moyen')}
                  {rating === 2 && (language === 'en' ? 'Poor' : 'Médiocre')}
                  {rating === 1 && (language === 'en' ? 'Terrible' : 'Terrible')}
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment">
              {language === 'en' ? 'Your Review' : 'Votre Avis'}
            </Label>
            <Textarea
              id="comment"
              placeholder={
                language === 'en' 
                  ? 'Tell us about your experience with this product...' 
                  : 'Parlez-nous de votre expérience avec ce produit...'
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className="mt-2 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment.length} / {language === 'en' ? 'Min. 10 characters' : 'Min. 10 caractères'}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            {language === 'en' ? 'Cancel' : 'Annuler'}
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting 
              ? (language === 'en' ? 'Submitting...' : 'Envoi...')
              : (language === 'en' ? 'Submit Review' : 'Envoyer l\'Avis')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
