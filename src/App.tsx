
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import { Toaster as Sonner } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';

import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import SecureRoute from './components/SecureRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';

import './i18n/config';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LanguageProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route
                    path="/*"
                    element={
                      <SecureRoute>
                        <Layout />
                      </SecureRoute>
                    }
                  >
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="documents" element={<DocumentsPage />} />
                    <Route path="review" element={<div className="p-6">Review Page - Coming Soon</div>} />
                    <Route path="admin" element={<div className="p-6">Admin Page - Coming Soon</div>} />
                    <Route path="audit" element={<div className="p-6">Audit Page - Coming Soon</div>} />
                    <Route path="settings" element={<div className="p-6">Settings Page - Coming Soon</div>} />
                  </Route>
                </Routes>
              </div>
            </Router>
            <Toaster />
            <Sonner />
          </LanguageProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
