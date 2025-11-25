import { useState } from 'react';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner@2.0.3';
import { Logo } from '../Navigation/Logo';

interface ForgotPasswordPageProps {
  language: 'en' | 'fr';
  onBack: () => void;
}

export function ForgotPasswordPage({ language, onBack }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = {
    en: {
      title: 'Forgot Password',
      subtitle: 'Enter your email and we will send you a reset link',
      email: 'Email Address',
      sendButton: 'Send Reset Link',
      backToLogin: 'Back to Login',
      successTitle: 'Check Your Email',
      successMessage: 'We have sent a password reset link to your email address.',
      resend: 'Resend Link',
      invalidEmail: 'Please enter a valid email address',
    },
    fr: {
      title: 'Mot de Passe Oublié',
      subtitle: 'Entrez votre email et nous vous enverrons un lien de réinitialisation',
      email: 'Adresse Email',
      sendButton: 'Envoyer le Lien',
      backToLogin: 'Retour à la Connexion',
      successTitle: 'Vérifiez Votre Email',
      successMessage: 'Nous avons envoyé un lien de réinitialisation à votre adresse email.',
      resend: 'Renvoyer le Lien',
      invalidEmail: 'Veuillez entrer une adresse email valide',
    },
  };

  const text = t[language];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error(text.invalidEmail);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success(language === 'en' ? 'Reset link sent!' : 'Lien de réinitialisation envoyé!');
    }, 1500);
  };

  const handleResend = () => {
    setIsSubmitted(false);
    setEmail('');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo language={language} />
          </div>

          <Card className="shadow-xl border-0 text-center">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">{text.successTitle}</CardTitle>
              <CardDescription className="text-base">{text.successMessage}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={onBack}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {text.backToLogin}
              </Button>
              <Button
                variant="outline"
                onClick={handleResend}
                className="w-full"
              >
                {text.resend}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {text.backToLogin}
        </Button>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo language={language} />
        </div>

        {/* Forgot Password Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{text.title}</CardTitle>
            <CardDescription className="text-center">{text.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">{text.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={text.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!email || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {language === 'en' ? 'Sending...' : 'Envoi...'}
                  </>
                ) : (
                  text.sendButton
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
