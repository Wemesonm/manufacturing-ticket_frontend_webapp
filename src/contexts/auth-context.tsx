'use client';

import React from 'react';
import {useRouter} from 'next/navigation';

import {registerAuthInterceptor} from '@/src/api';
import {AUTH_CREDENTIALS_STORAGE_KEY, LEGACY_ACCESS_TOKEN_KEY, LEGACY_REFRESH_TOKEN_KEY} from '@/src/constants/storage';
import {authService, AuthCredentials} from '@/src/domain';

type AuthContextValue = {
  authCredentials: AuthCredentials | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (params: {username: string; password: string}) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const [authCredentials, setAuthCredentials] = React.useState<AuthCredentials | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const persistCredentials = React.useCallback((credentials: AuthCredentials | null) => {
    if (credentials) {
      window.localStorage.setItem(AUTH_CREDENTIALS_STORAGE_KEY, JSON.stringify(credentials));
      window.localStorage.setItem(LEGACY_ACCESS_TOKEN_KEY, credentials.accessToken);
      window.localStorage.setItem(LEGACY_REFRESH_TOKEN_KEY, credentials.refreshToken);
      authService.applyAccessToken(credentials.accessToken);
    } else {
      window.localStorage.removeItem(AUTH_CREDENTIALS_STORAGE_KEY);
      window.localStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
      window.localStorage.removeItem(LEGACY_REFRESH_TOKEN_KEY);
      authService.removeAccessToken();
    }
    setAuthCredentials(credentials);
  }, []);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(AUTH_CREDENTIALS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthCredentials;
        setAuthCredentials(parsed);
        authService.applyAccessToken(parsed.accessToken);
      } catch (error) {
        console.error('Failed to parse auth credentials', error);
        window.localStorage.removeItem(AUTH_CREDENTIALS_STORAGE_KEY);
      }
    } else {
      const legacyAccess = window.localStorage.getItem(LEGACY_ACCESS_TOKEN_KEY);
      const legacyRefresh = window.localStorage.getItem(LEGACY_REFRESH_TOKEN_KEY);
      if (legacyAccess && legacyRefresh) {
        const legacyCredentials: AuthCredentials = {
          accessToken: legacyAccess,
          refreshToken: legacyRefresh,
        };
        persistCredentials(legacyCredentials);
      }
    }
    setIsLoading(false);
  }, [persistCredentials]);

  const signOut = React.useCallback(async () => {
    persistCredentials(null);
    router.replace('/login');
  }, [persistCredentials, router]);

  React.useEffect(() => {
    if (isLoading) return;
    const unregister = registerAuthInterceptor({
      authCredentials,
      saveCredentials: async credentials => persistCredentials(credentials),
      onUnauthorized: async () => {
        await signOut();
      },
    });
    return unregister;
  }, [authCredentials, isLoading, persistCredentials, signOut]);

  const signIn = React.useCallback(
    async ({username, password}: {username: string; password: string}) => {
      const credentials = await authService.signIn({username, password});
      persistCredentials(credentials);
      router.replace('/');
    },
    [persistCredentials, router],
  );

  const value = React.useMemo<AuthContextValue>(
    () => ({
      authCredentials,
      isAuthenticated: Boolean(authCredentials),
      isLoading,
      signIn,
      signOut,
    }),
    [authCredentials, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
