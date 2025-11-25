import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const heroSlides = [
  {
    id: 1,
    title: 'Shop From All 10 Regions',
    titleFr: 'Achetez dans les 10 Régions',
    subtitle: 'Discover authentic products from across Cameroon',
    subtitleFr: 'Découvrez des produits authentiques de tout le Cameroun',
    image: 'https://images.unsplash.com/photo-1659233290743-ce3966941e92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    cta: 'Explore Now',
    ctaFr: 'Explorer Maintenant',
    gradient: 'from-green-600/80 to-yellow-600/80'
  },
  {
    id: 2,
    title: 'Flash Sales Up to 50% OFF',
    titleFr: 'Ventes Flash jusqu\'à 50% de Réduction',
    subtitle: 'Limited time offers on top products',
    subtitleFr: 'Offres limitées sur les meilleurs produits',
    image: 'https://images.unsplash.com/photo-1746171114403-f4c4877b1f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    cta: 'Shop Deals',
    ctaFr: 'Voir les Offres',
    gradient: 'from-red-600/80 to-orange-600/80'
  },
  {
    id: 3,
    title: 'Support Local Vendors',
    titleFr: 'Soutenez les Vendeurs Locaux',
    subtitle: 'Connect directly with sellers in your region',
    subtitleFr: 'Connectez-vous directement avec les vendeurs de votre région',
    image: 'https://images.unsplash.com/photo-1746171114403-f4c4877b1f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    cta: 'Find Vendors',
    ctaFr: 'Trouver des Vendeurs',
    gradient: 'from-blue-600/80 to-purple-600/80'
  }
];

interface HeroSectionProps {
  language: 'en' | 'fr';
}

export function HeroSection({ language }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
      {/* Background Images with Fade Transition */}
      {heroSlides.map((slideItem, index) => (
        <div
          key={slideItem.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ImageWithFallback
            src={slideItem.image}
            alt={language === 'en' ? slideItem.title : slideItem.titleFr}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slideItem.gradient}`} />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl text-white">
          <h2 
            key={`title-${currentSlide}`}
            className="text-4xl md:text-6xl mb-4 animate-in fade-in slide-in-from-bottom-8 duration-700"
          >
            {language === 'en' ? slide.title : slide.titleFr}
          </h2>
          <p 
            key={`subtitle-${currentSlide}`}
            className="text-lg md:text-xl mb-8 opacity-90 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150"
          >
            {language === 'en' ? slide.subtitle : slide.subtitleFr}
          </p>
          <Button 
            key={`cta-${currentSlide}`}
            size="lg" 
            className="bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-transform animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
          >
            {language === 'en' ? slide.cta : slide.ctaFr}
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
