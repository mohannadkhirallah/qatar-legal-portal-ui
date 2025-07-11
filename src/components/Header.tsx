
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Bell, Search, User, LogOut, Globe } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800';
      case 'Reviewer':
        return 'bg-blue-100 text-blue-800';
      case 'Publisher':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.search')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </Button>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <User className="h-5 w-5" />
                  <div className="text-left rtl:text-right">
                    <div className="font-medium text-sm">{user?.name}</div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role || '')}`}>
                        {user?.role}
                      </span>
                    </div>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                <span>{t('common.profile')}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                <span>{t('common.logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
