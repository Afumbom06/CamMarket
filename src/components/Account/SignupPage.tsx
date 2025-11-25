import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Lock, Loader2, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';
import { Logo } from '../Navigation/Logo';

interface SignupPageProps {
  language: 'en' | 'fr';
  onLanguageChange: (lang: 'en' | 'fr') => void;
  onSignupSuccess: () => void;
  onNavigateToLogin: () => void;
  onBack?: () => void;
}

export function SignupPage({
  language,
  onLanguageChange,
  onSignupSuccess,
  onNavigateToLogin,
  onBack,
}: SignupPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = {
    en: {
      title: 'Create Account',
      subtitle: 'Join CamMarket and start shopping',
      name: 'Full Name',
      phone: 'Phone Number',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      terms: 'I agree to the Terms & Conditions',
      signupButton: 'Create Account',
      haveAccount: 'Already have an account?',
      login: 'Sign In',
      passwordStrength: 'Password Strength:',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      signupSuccess: 'Account created successfully!',
      phonePlaceholder: '+237 6XX XXX XXX',
    },
    fr: {
      title: 'Créer un Compte',
      subtitle: 'Rejoignez CamMarket et commencez vos achats',
      name: 'Nom Complet',
      phone: 'Numéro de Téléphone',
      email: 'Adresse Email',
      password: 'Mot de Passe',
      confirmPassword: 'Confirmer le Mot de Passe',
      terms: "J'accepte les Termes et Conditions",
      signupButton: 'Créer un Compte',
      haveAccount: 'Vous avez déjà un compte?',
      login: 'Se Connecter',
      passwordStrength: 'Force du mot de passe:',
      weak: 'Faible',
      medium: 'Moyen',
      strong: 'Fort',
      signupSuccess: 'Compte créé avec succès!',
      phonePlaceholder: '+237 6XX XXX XXX',
    },
  };

  const text = t[language];

  const validatePhone = (phone: string) => {
    // Cameroon phone format: +237 6XX XXX XXX
    const phoneRegex = /^(\+237|237)?[6][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;

    if (score <= 1) return { score: 25, label: text.weak, color: 'bg-red-500' };
    if (score === 2) return { score: 50, label: text.medium, color: 'bg-yellow-500' };
    if (score === 3) return { score: 75, label: text.medium, color: 'bg-yellow-500' };
    return { score: 100, label: text.strong, color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = language === 'en' ? 'Name is required' : 'Le nom est requis';
    }

    if (!formData.phone) {
      newErrors.phone = language === 'en' ? 'Phone number is required' : 'Le numéro de téléphone est requis';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = language === 'en' ? 'Invalid Cameroon phone number' : 'Numéro de téléphone Camerounais invalide';
    }

    if (!formData.email) {
      newErrors.email = language === 'en' ? 'Email is required' : "L'email est requis";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = language === 'en' ? 'Invalid email address' : 'Adresse email invalide';
    }

    if (!formData.password) {
      newErrors.password = language === 'en' ? 'Password is required' : 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = language === 'en' ? 'Password must be at least 8 characters' : 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = language === 'en' ? 'Please confirm your password' : 'Veuillez confirmer votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = language === 'en' ? 'Passwords do not match' : 'Les mots de passe ne correspondent pas';
    }

    if (!agreedToTerms) {
      newErrors.terms = language === 'en' ? 'You must agree to the terms' : 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(text.signupSuccess);
      onSignupSuccess();
    }, 2000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const isFormValid = 
    formData.name &&
    formData.phone &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    agreedToTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Back' : 'Retour'}
          </Button>
        )}

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo language={language} />
        </div>

        {/* Signup Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{text.title}</CardTitle>
            <CardDescription className="text-center">{text.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">{text.name}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder={text.name}
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone">{text.phone}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder={text.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">{text.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    placeholder={text.email}
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">{text.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={text.password}
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{text.passwordStrength}</span>
                      <span className={passwordStrength.score >= 75 ? 'text-green-600' : passwordStrength.score >= 50 ? 'text-yellow-600' : 'text-red-600'}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <Progress value={passwordStrength.score} className={`h-1 ${passwordStrength.color}`} />
                  </div>
                )}
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{text.confirmPassword}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={text.confirmPassword}
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <XCircle className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                  )}
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => {
                    setAgreedToTerms(checked as boolean);
                    if (errors.terms) {
                      const newErrors = { ...errors };
                      delete newErrors.terms;
                      setErrors(newErrors);
                    }
                  }}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm cursor-pointer select-none">
                  {text.terms}
                </label>
              </div>
              {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {language === 'en' ? 'Creating account...' : 'Création du compte...'}
                  </>
                ) : (
                  text.signupButton
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-600">
              {text.haveAccount}{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                {text.login}
              </button>
            </div>
          </CardFooter>
        </Card>

        {/* Language Toggle */}
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLanguageChange(language === 'en' ? 'fr' : 'en')}
            className="text-gray-600"
          >
            {language === 'en' ? '🇫🇷 Français' : '🇬🇧 English'}
          </Button>
        </div>
      </div>
    </div>
  );
}
