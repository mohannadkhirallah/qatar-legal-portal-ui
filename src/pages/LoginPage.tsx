
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, User } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Scale, Shield, Eye, Upload, Globe } from 'lucide-react';

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
    <div className={`min-h-screen bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900 flex items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative z-10 w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full shadow-lg">
                <Scale className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-maroon-800 mb-2">
              {t('auth.welcomeTitle')}
            </CardTitle>
            <CardDescription className="text-maroon-600 font-medium">
              {t('auth.welcomeSubtitle')}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!showDemoLogin ? (
              <>
                <Button
                  onClick={handleMicrosoftLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
                  size="lg"
                >
                  <Shield className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
                  {t('auth.loginWith')}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">أو</span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowDemoLogin(true)}
                  variant="outline"
                  className="w-full border-2 border-maroon-200 text-maroon-700 hover:bg-maroon-50 py-3 text-lg font-medium"
                  size="lg"
                >
                  {t('auth.demoLogin')}
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-maroon-700 mb-2">
                    {t('auth.selectRole')}
                  </label>
                  <Select value={selectedRole} onValueChange={(value: 'Admin' | 'Reviewer' | 'Publisher') => setSelectedRole(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Shield className="h-4 w-4 text-red-500" />
                          <span>Admin - مدير النظام</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Reviewer">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Eye className="h-4 w-4 text-blue-500" />
                          <span>Reviewer - مراجع قانوني</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Publisher">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Upload className="h-4 w-4 text-green-500" />
                          <span>Publisher - ناشر</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleDemoLogin}
                  className="w-full bg-maroon-700 hover:bg-maroon-800 text-white py-3 text-lg font-medium"
                  size="lg"
                >
                  Continue as {selectedRole}
                </Button>

                <Button
                  onClick={() => setShowDemoLogin(false)}
                  variant="ghost"
                  className="w-full text-maroon-600 hover:text-maroon-700"
                >
                  ← Back to Login Options
                </Button>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse text-maroon-600 hover:text-maroon-700"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-white/80 text-sm mt-6">
          {t('auth.loginDescription')}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
