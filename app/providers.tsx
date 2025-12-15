'use client';

import React from 'react';
import {ThemeProvider} from 'styled-components';
import {AuthProvider} from '@/src/contexts/auth-context';
import {GlobalStyles, theme} from '@/src/theme';

export function AppProviders({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
