'use client';

import React from 'react';
import styled from 'styled-components';
import {AlertCircle, Factory, Loader2} from 'lucide-react';
import {useRouter} from 'next/navigation';

import {Button} from '@/src/components/atoms/button';
import {Card} from '@/src/components/atoms/card';
import {Input} from '@/src/components/atoms/input';
import {FormField} from '@/src/components/molecules/form-field';
import {useAuth} from '@/src/contexts/auth-context';
import {ROUTES} from '@/src/constants/routes';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({theme}) => theme.colors.gray[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({theme}) => theme.spacing.md};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 440px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const Header = styled.div`
  background-color: ${({theme}) => theme.colors.brand[900]};
  padding: ${({theme}) => theme.spacing.xl};
  text-align: center;
  color: white;
`;

const LogoWrapper = styled.div`
  background-color: ${({theme}) => theme.colors.brand[700]};
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: ${({theme}) => theme.colors.brand[100]};
  font-size: 0.875rem;
`;

const Body = styled.div`
  padding: ${({theme}) => theme.spacing.xl};
`;

const ErrorAlert = styled.div`
  margin-bottom: ${({theme}) => theme.spacing.lg};
  padding: ${({theme}) => theme.spacing.md};
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: ${({theme}) => theme.borderRadius.md};
  display: flex;
  gap: ${({theme}) => theme.spacing.sm};
  align-items: flex-start;
  color: #b91c1c;
  font-size: 0.875rem;
`;

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
    <Container>
      <LoginCard>
        <Header>
          <LogoWrapper>
            <Factory size={32} color="white" />
          </LogoWrapper>
          <Title>Manufacturing Ticket System</Title>
          <Subtitle>Sign in to manage production issues</Subtitle>
        </Header>

        <Body>
          {error && (
            <ErrorAlert>
              <AlertCircle size={20} />
              <p>{error}</p>
            </ErrorAlert>
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
              <Button type="submit" $fullWidth disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
              </Button>
            </div>
          </form>
        </Body>
      </LoginCard>
    </Container>
  );
}
