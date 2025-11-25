import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Camera, Loader2, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { toast } from 'sonner@2.0.3';

interface ProfileEditPageProps {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  language: 'en' | 'fr';
  onBack: () => void;
  onSave: (updatedUser: Partial<typeof user>) => void;
}

export function ProfileEditPage({
  user,
  language,
  onBack,
  onSave,
}: ProfileEditPageProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || '');
  const [hasChanges, setHasChanges] = useState(false);

  const t = {
    en: {
      title: 'Edit Profile',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      changePhoto: 'Change Photo',
      save: 'Save Changes',
      cancel: 'Cancel',
      saving: 'Saving...',
      saved: 'Profile updated successfully',
      namePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email',
      phonePlaceholder: '+237 6XX XXX XXX',
    },
    fr: {
      title: 'Modifier le Profil',
      name: 'Nom Complet',
      email: 'Adresse Email',
      phone: 'Numéro de Téléphone',
      changePhoto: 'Changer la Photo',
      save: 'Enregistrer les Modifications',
      cancel: 'Annuler',
      saving: 'Enregistrement...',
      saved: 'Profil mis à jour avec succès',
      namePlaceholder: 'Entrez votre nom complet',
      emailPlaceholder: 'Entrez votre email',
      phonePlaceholder: '+237 6XX XXX XXX',
    },
  };

  const text = t[language];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+237|237)?[6][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setHasChanges(true);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setFormData({ ...formData, avatar: result });
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!formData.name) {
      toast.error(language === 'en' ? 'Name is required' : 'Le nom est requis');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error(language === 'en' ? 'Invalid email address' : 'Adresse email invalide');
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast.error(
        language === 'en'
          ? 'Invalid Cameroon phone number'
          : 'Numéro de téléphone Camerounais invalide'
      );
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSave(formData);
      toast.success(text.saved);
      setHasChanges(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl">{text.title}</h1>
            </div>
            {hasChanges && (
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {text.saving}
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    {text.save}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  {avatarPreview && <AvatarImage src={avatarPreview} alt={formData.name} />}
                  <AvatarFallback className="bg-green-100 text-green-600 text-3xl">
                    {formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 transition-colors shadow-lg"
                >
                  <Camera className="h-5 w-5 text-white" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-3">{text.changePhoto}</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">{text.name}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={text.namePlaceholder}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{text.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={text.emailPlaceholder}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">{text.phone}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder={text.phonePlaceholder}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                onClick={onBack}
                className="flex-1"
                disabled={isLoading}
              >
                {text.cancel}
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {text.saving}
                  </>
                ) : (
                  text.save
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
