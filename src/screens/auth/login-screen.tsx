'use client';

import React from 'react';
import {AlertCircle, Factory, Loader2} from 'lucide-react';
import {useRouter} from 'next/navigation';

import {Button} from '@/src/components/atoms/button';
import {Input} from '@/src/components/atoms/input';
import {FormField} from '@/src/components/molecules/form-field';
import {useAuth} from '@/src/contexts/auth-context';
import {ROUTES} from '@/src/constants/routes';

import * as S from './login-screen.styled';

export function LoginScreen() {
  const router = useRouter();
  const {signIn, isAuthenticated} = useAuth();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace(ROUTES.dashboard);
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await signIn({username, password});
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Please verify your username and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Container>
      <S.LoginCard>
        <S.Header>
          <S.LogoWrapper>
            <Factory size={32} color="white" />
          </S.LogoWrapper>
          <S.Title>Manufacturing Ticket System</S.Title>
          <S.Subtitle>Sign in to manage production issues</S.Subtitle>
        </S.Header>

        <S.Body>
          {error && (
            <S.ErrorAlert>
              <AlertCircle size={20} />
              <p>{error}</p>
            </S.ErrorAlert>
          )}

          <form onSubmit={handleSubmit}>
            <FormField label="Username">
              <Input
                type="text"
                value={username}
                onChange={event => setUsername(event.target.value)}
                placeholder="Enter username"
                required
              />
            </FormField>

            <FormField label="Password">
              <Input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
            </FormField>

            <div style={{marginTop: '24px'}}>
              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
              </Button>
            </div>
          </form>
        </S.Body>
      </S.LoginCard>
    </S.Container>
  );
}
