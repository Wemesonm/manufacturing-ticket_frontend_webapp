'use client';

import styled from 'styled-components';

import {Card} from '@/src/components/atoms/card';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({theme}) => theme.colors.gray[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({theme}) => theme.spacing.md};
`;

export const LoginCard = styled(Card)`
  width: 100%;
  max-width: 440px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const Header = styled.div`
  background-color: ${({theme}) => theme.colors.brand[900]};
  padding: ${({theme}) => theme.spacing.xl};
  text-align: center;
  color: white;
`;

export const LogoWrapper = styled.div`
  background-color: ${({theme}) => theme.colors.brand[700]};
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  color: ${({theme}) => theme.colors.brand[100]};
  font-size: 0.875rem;
`;

export const Body = styled.div`
  padding: ${({theme}) => theme.spacing.xl};
`;

export const ErrorAlert = styled.div`
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
