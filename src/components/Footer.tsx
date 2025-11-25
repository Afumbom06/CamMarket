import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, MessageCircle, Flag } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { regions } from '../lib/mock-data';

interface FooterProps {
  language: 'en' | 'fr';
}

export function Footer({ language }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-20 lg:pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 p-2 rounded-lg">
                <Flag className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-white text-xl">CamMarket</h3>
            </div>
            <p className="text-sm mb-4">
              {language === 'en' 
                ? 'Cameroon\'s leading e-commerce platform connecting buyers and sellers across all 10 regions.'
                : 'La principale plateforme e-commerce du Cameroun reliant acheteurs et vendeurs dans les 10 régions.'}
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-800 bg-green-600">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">
              {language === 'en' ? 'Quick Links' : 'Liens Rapides'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">
                {language === 'en' ? 'About Us' : 'À Propos'}
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors">
                {language === 'en' ? 'How It Works' : 'Comment Ça Marche'}
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors">
                {language === 'en' ? 'Become a Seller' : 'Devenir Vendeur'}
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors">
                {language === 'en' ? 'Delivery Info' : 'Info Livraison'}
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors">
                {language === 'en' ? 'Payment Methods' : 'Modes de Paiement'}
              </a></li>
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="text-white mb-4">
              {language === 'en' ? 'Shop by Region' : 'Acheter par Région'}
            </h4>
            <ul className="space-y-2 text-sm">
              {regions.slice(0, 6).map((region) => (
                <li key={region.id}>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: region.color }}
                    />
                    {language === 'en' ? region.name : region.nameFr}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-white mb-4">
              {language === 'en' ? 'Contact Us' : 'Nous Contacter'}
            </h4>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+237 6XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@cammarket.cm</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Yaoundé, Cameroon</span>
              </li>
            </ul>
            
            <h5 className="text-white text-sm mb-2">
              {language === 'en' ? 'Newsletter' : 'Newsletter'}
            </h5>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder={language === 'en' ? 'Your email' : 'Votre email'}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                {language === 'en' ? 'Join' : 'Rejoindre'}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>
            © {currentYear} CamMarket. {language === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              {language === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {language === 'en' ? 'Terms of Service' : 'Conditions d\'Utilisation'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
