import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Package, Shield } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface DescriptionSectionProps {
  description: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  language: 'en' | 'fr';
}

export function DescriptionSection({ 
  description, 
  features = [], 
  specifications = [],
  language 
}: DescriptionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const defaultFeatures = features.length > 0 ? features : [
    language === 'en' ? 'Authentic local product' : 'Produit local authentique',
    language === 'en' ? 'Quality guaranteed' : 'Qualité garantie',
    language === 'en' ? 'Fast delivery' : 'Livraison rapide',
    language === 'en' ? 'Secure payment' : 'Paiement sécurisé',
  ];

  const isLongDescription = description.length > 300;
  const displayDescription = isLongDescription && !showFullDescription 
    ? description.slice(0, 300) + '...' 
    : description;

  return (
    <Card>
      <CardContent className="p-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            {language === 'en' ? 'Product Description' : 'Description du Produit'}
          </h3>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {isExpanded && (
          <div className="space-y-6">
            {/* Description Text */}
            <div>
              <p className="text-gray-600 leading-relaxed">
                {displayDescription}
              </p>
              {isLongDescription && (
                <Button
                  variant="link"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 px-0"
                >
                  {showFullDescription 
                    ? (language === 'en' ? 'Show Less' : 'Voir Moins')
                    : (language === 'en' ? 'Read More' : 'Lire Plus')}
                </Button>
              )}
            </div>

            {/* Features List */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                {language === 'en' ? 'Key Features' : 'Caractéristiques Principales'}
              </h4>
              <ul className="space-y-2">
                {defaultFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications Table */}
            {specifications.length > 0 && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-gray-700">
                  <Shield className="h-4 w-4 text-green-600" />
                  {language === 'en' ? 'Specifications' : 'Spécifications'}
                </h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {specifications.map((spec, index) => (
                        <tr 
                          key={index} 
                          className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                        >
                          <td className="px-4 py-2 text-gray-600 w-1/3">
                            {spec.label}
                          </td>
                          <td className="px-4 py-2 text-gray-900">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
