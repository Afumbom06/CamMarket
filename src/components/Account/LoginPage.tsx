import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { Logo } from '../Navigation/Logo';

interface LoginPageProps {
  language: 'en' | 'fr';
  onLanguageChange: (lang: 'en' | 'fr') => void;
  onLoginSuccess: (user: any) => void;
  onNavigateToSignup: () => void;
  onNavigateToForgotPassword: () => void;
  onBack?: () => void;
}

export function LoginPage({
  language,
  onLanguageChange,
  onLoginSuccess,
  onNavigateToSignup,
  onNavigateToForgotPassword,
  onBack,
}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const t = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your CamMarket account',
      email: 'Email or Phone',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      loginButton: 'Sign In',
      noAccount: "Don't have an account?",
      signup: 'Sign Up',
      invalidEmail: 'Please enter a valid email or phone number',
      invalidPassword: 'Password is required',
      loginError: 'Invalid credentials',
      loginSuccess: 'Welcome back!',
    },
    fr: {
      title: 'Bon Retour',
      subtitle: 'Connectez-vous à votre compte CamMarket',
      email: 'Email ou Téléphone',
      password: 'Mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié?',
      loginButton: 'Se Connecter',
      noAccount: "Vous n'avez pas de compte?",
      signup: "S'inscrire",
      invalidEmail: 'Veuillez entrer un email ou numéro de téléphone valide',
      invalidPassword: 'Le mot de passe est requis',
      loginError: 'Identifiants invalides',
      loginSuccess: 'Bon retour!',
    },
  };

  const text = t[language];

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = text.invalidEmail;
    }

    if (!password) {
      newErrors.password = text.invalidPassword;
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
      
      // Mock successful login
      if (email && password === 'password') {
        toast.success(text.loginSuccess);
        onLoginSuccess({
          id: 1,
          name: 'Jean Kamga',
          email: email,
          phone: '+237 677 123 456',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        });
      } else {
        toast.error(text.loginError);
        setErrors({ password: text.loginError });
      }
    }, 1500);
  };

  const isFormValid = email && password;

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

        {/* Login Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{text.title}</CardTitle>
            <CardDescription className="text-center">{text.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email/Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="email">{text.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="text"
                    placeholder={text.email}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
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
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm cursor-pointer select-none"
                  >
                    {text.rememberMe}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={onNavigateToForgotPassword}
                  className="text-sm text-green-600 hover:text-green-700 hover:underline"
                >
                  {text.forgotPassword}
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {language === 'en' ? 'Signing in...' : 'Connexion...'}
                  </>
                ) : (
                  text.loginButton
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-600">
              {text.noAccount}{' '}
              <button
                onClick={onNavigateToSignup}
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                {text.signup}
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
