import { useState } from 'react';
import { ArrowLeft, Globe, Bell, Moon, Sun, LogOut, Shield, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
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
import { toast } from 'sonner@2.0.3';
import { PushNotificationManager } from '../PWA';

interface SettingsPageProps {
  language: 'en' | 'fr';
  onLanguageChange: (lang: 'en' | 'fr') => void;
  onBack: () => void;
  onLogout: () => void;
}

export function SettingsPage({
  language,
  onLanguageChange,
  onBack,
  onLogout,
}: SettingsPageProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: true,
    messages: false,
    updates: true,
  });
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const t = {
    en: {
      title: 'Settings',
      language: 'Language',
      languageDesc: 'Choose your preferred language',
      english: 'English',
      french: 'Français',
      theme: 'Theme',
      themeDesc: 'Customize app appearance',
      light: 'Light',
      dark: 'Dark',
      notifications: 'Notifications',
      notificationsDesc: 'Manage your notification preferences',
      orders: 'Order Updates',
      promotions: 'Promotions & Offers',
      messages: 'Messages',
      updates: 'App Updates',
      currency: 'Currency',
      currencyDesc: 'Display prices in',
      fcfa: 'FCFA (Franc CFA)',
      security: 'Security & Privacy',
      securityDesc: 'Manage your account security',
      changePassword: 'Change Password',
      twoFactor: 'Two-Factor Authentication',
      privacy: 'Privacy Settings',
      account: 'Account',
      accountDesc: 'Manage your account settings',
      logout: 'Logout',
      logoutDesc: 'Sign out of your account',
      logoutTitle: 'Confirm Logout',
      logoutMessage: 'Are you sure you want to logout?',
      cancel: 'Cancel',
      confirm: 'Logout',
    },
    fr: {
      title: 'Paramètres',
      language: 'Langue',
      languageDesc: 'Choisissez votre langue préférée',
      english: 'English',
      french: 'Français',
      theme: 'Thème',
      themeDesc: 'Personnaliser l\'apparence',
      light: 'Clair',
      dark: 'Sombre',
      notifications: 'Notifications',
      notificationsDesc: 'Gérer vos préférences de notification',
      orders: 'Mises à jour des commandes',
      promotions: 'Promotions & Offres',
      messages: 'Messages',
      updates: 'Mises à jour de l\'app',
      currency: 'Devise',
      currencyDesc: 'Afficher les prix en',
      fcfa: 'FCFA (Franc CFA)',
      security: 'Sécurité & Confidentialité',
      securityDesc: 'Gérer la sécurité de votre compte',
      changePassword: 'Changer le mot de passe',
      twoFactor: 'Authentification à deux facteurs',
      privacy: 'Paramètres de confidentialité',
      account: 'Compte',
      accountDesc: 'Gérer les paramètres de votre compte',
      logout: 'Déconnexion',
      logoutDesc: 'Se déconnecter de votre compte',
      logoutTitle: 'Confirmer la déconnexion',
      logoutMessage: 'Êtes-vous sûr de vouloir vous déconnecter?',
      cancel: 'Annuler',
      confirm: 'Déconnexion',
    },
  };

  const text = t[language];

  const handleNotificationChange = (key: keyof typeof notifications) => {
    const newNotifications = { ...notifications, [key]: !notifications[key] };
    setNotifications(newNotifications);
    toast.success(
      language === 'en'
        ? 'Notification settings updated'
        : 'Paramètres de notification mis à jour'
    );
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    toast.success(
      language === 'en'
        ? `Theme changed to ${newTheme}`
        : `Thème changé en ${newTheme === 'light' ? 'clair' : 'sombre'}`
    );
  };

  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    onLanguageChange(newLang);
    toast.success(
      newLang === 'en'
        ? 'Language changed to English'
        : 'Langue changée en Français'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl">{text.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Language Settings */}
        <Card className="border-0 shadow-md rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>{text.language}</CardTitle>
                <CardDescription>{text.languageDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">🇬🇧 {text.english}</span>
              </div>
              <Switch
                checked={language === 'fr'}
                onCheckedChange={handleLanguageToggle}
              />
              <div className="flex items-center gap-2">
                <span className="text-sm">🇫🇷 {text.french}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card className="border-0 shadow-md rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                {theme === 'light' ? (
                  <Sun className="h-5 w-5 text-purple-600" />
                ) : (
                  <Moon className="h-5 w-5 text-purple-600" />
                )}
              </div>
              <div>
                <CardTitle>{text.theme}</CardTitle>
                <CardDescription>{text.themeDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleThemeChange('light')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  theme === 'light'
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Sun className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm">{text.light}</p>
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  theme === 'dark'
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Moon className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm">{text.dark}</p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 shadow-md rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <CardTitle>{text.notifications}</CardTitle>
                <CardDescription>{text.notificationsDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="orders" className="cursor-pointer">
                {text.orders}
              </Label>
              <Switch
                id="orders"
                checked={notifications.orders}
                onCheckedChange={() => handleNotificationChange('orders')}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="promotions" className="cursor-pointer">
                {text.promotions}
              </Label>
              <Switch
                id="promotions"
                checked={notifications.promotions}
                onCheckedChange={() => handleNotificationChange('promotions')}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="messages" className="cursor-pointer">
                {text.messages}
              </Label>
              <Switch
                id="messages"
                checked={notifications.messages}
                onCheckedChange={() => handleNotificationChange('messages')}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="updates" className="cursor-pointer">
                {text.updates}
              </Label>
              <Switch
                id="updates"
                checked={notifications.updates}
                onCheckedChange={() => handleNotificationChange('updates')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Push Notifications (PWA) */}
        <PushNotificationManager language={language} />

        {/* Currency */}
        <Card className="border-0 shadow-md rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>{text.currency}</CardTitle>
                <CardDescription>{text.currencyDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm">{text.fcfa}</p>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-0 shadow-md rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle>{text.security}</CardTitle>
                <CardDescription>{text.securityDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              {text.changePassword}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              {text.twoFactor}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              {text.privacy}
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="border-0 shadow-md rounded-2xl border-red-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <LogOut className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-red-600">{text.logout}</CardTitle>
                <CardDescription>{text.logoutDesc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {text.logout}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Logout Confirmation */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{text.logoutTitle}</AlertDialogTitle>
            <AlertDialogDescription>{text.logoutMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{text.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={onLogout} className="bg-red-600 hover:bg-red-700">
              {text.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
