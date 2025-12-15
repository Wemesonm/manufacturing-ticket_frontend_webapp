'use client';

import React from 'react';
import {Loader2} from 'lucide-react';

import {Layout} from '@/src/components/templates/layout';
import {useAuth} from '@/src/contexts/auth-context';
import {LoginScreen} from '@/src/screens/auth/login-screen';

export default function AppLayout({children}: {children: React.ReactNode}) {
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <Loader2 className="animate-spin" size={32} color="#0284c7" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <Layout>{children}</Layout>;
}
