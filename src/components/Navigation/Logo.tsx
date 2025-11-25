import { Flag } from 'lucide-react';

interface LogoProps {
  onClick?: () => void;
  language: 'en' | 'fr';
}

export function Logo({ onClick, language }: LogoProps) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <div className="bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 p-2 rounded-lg shadow-md">
        <Flag className="h-6 w-6 text-white" />
      </div>
      <div className="text-left">
        <h1 className="text-xl text-green-600">CamMarket</h1>
        <p className="text-xs text-gray-500 hidden sm:block">
          {language === 'en' ? 'Shop Local, Shop Cameroon' : 'Achetez Local, Achetez Cameroun'}
        </p>
      </div>
    </button>
  );
}
