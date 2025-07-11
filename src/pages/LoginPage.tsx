
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, User } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Scale, Shield, Eye, Upload, Globe, Building } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showDemoLogin, setShowDemoLogin] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Reviewer' | 'Publisher'>('Reviewer');

  const handleMicrosoftLogin = () => {
    // In a real app, this would redirect to Azure AD
    console.log('Redirecting to Microsoft login...');
    // Simulate successful login
    setTimeout(() => {
      const demoUser: User = {
        id: '1',
        name: 'Ahmed Al-Mansouri',
        email: 'ahmed.mansouri@sjc.gov.qa',
        role: 'Admin',
        aadObjectId: 'aad-123-456',
        language: language,
      };
      login(demoUser);
      navigate('/dashboard');
    }, 1000);
  };

  const handleDemoLogin = () => {
    const demoUser: User = {
      id: '2',
      name: selectedRole === 'Admin' ? 'مريم القحطاني' : selectedRole === 'Reviewer' ? 'محمد العلي' : 'فاطمة النعيمي',
      email: `${selectedRole.toLowerCase()}@sjc.gov.qa`,
      role: selectedRole,
      aadObjectId: `demo-${selectedRole.toLowerCase()}`,
      language: language,
    };
    login(demoUser);
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen flex ${isRTL ? 'rtl flex-row-reverse' : 'ltr'}`}>
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center items-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gold-400 to-gold-600 rounded-3xl shadow-2xl mb-6">
              <Scale className="h-12 w-12 text-white" />
            </div>
          </div>
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {t('auth.welcomeTitle')}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {t('auth.welcomeSubtitle')}
            </p>
            <p className="text-white/80 text-lg">
              {t('auth.loginDescription')}
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gold-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gold-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-gold-400 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-gold-300 rounded-full"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl shadow-lg">
              <Scale className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="lg:hidden text-center mb-8">
            <h2 className="text-2xl font-bold text-maroon-800 mb-2">
              {t('auth.welcomeTitle')}
            </h2>
            <p className="text-maroon-600">
              {t('auth.welcomeSubtitle')}
            </p>
          </div>

          <div className="space-y-6">
            {!showDemoLogin ? (
              <>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Sign in to your account</h3>
                </div>

                <Button
                  onClick={handleMicrosoftLogin}
                  className="w-full bg-[#0078d4] hover:bg-[#106ebe] text-white py-4 text-base font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <div className="flex items-center justify-center">
                    <svg className="mr-3 h-5 w-5 rtl:ml-3 rtl:mr-0" viewBox="0 0 23 23" fill="currentColor">
                      <path d="M1.194 10.962h10.043V1.194H1.194v9.768zm11.237 0H22.474V1.194H12.431v9.768zm0 11.237H22.474V12.43H12.431v9.768zM1.194 22.199h10.043V12.43H1.194v9.768z"/>
                    </svg>
                    <span>{t('auth.loginWith')}</span>
                  </div>
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500 font-medium">Or</span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowDemoLogin(true)}
                  variant="outline"
                  className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-4 text-base font-semibold rounded-lg transition-all duration-200"
                  size="lg"
                >
                  <Building className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
                  {t('auth.demoLogin')}
                </Button>
              </>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose Demo Role</h3>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {t('auth.selectRole')}
                  </label>
                  <Select value={selectedRole} onValueChange={(value: 'Admin' | 'Reviewer' | 'Publisher') => setSelectedRole(value)}>
                    <SelectTrigger className="w-full py-3 text-base border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse py-1">
                          <Shield className="h-5 w-5 text-red-500" />
                          <span className="font-medium">Admin - مدير النظام</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Reviewer">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse py-1">
                          <Eye className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">Reviewer - مراجع قانوني</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Publisher">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse py-1">
                          <Upload className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Publisher - ناشر</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleDemoLogin}
                  className="w-full bg-maroon-700 hover:bg-maroon-800 text-white py-4 text-base font-semibold rounded-lg transition-all duration-200"
                  size="lg"
                >
                  Continue as {selectedRole}
                </Button>

                <Button
                  onClick={() => setShowDemoLogin(false)}
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-gray-700 hover:bg-gray-50 py-2"
                >
                  ← Back to Login Options
                </Button>
              </div>
            )}

            <div className="pt-6 border-t border-gray-200">
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-gray-700 hover:bg-gray-50 py-3 rounded-lg"
              >
                <Globe className="h-5 w-5" />
                <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
