'use client';

import styled from 'styled-components';

import {Card} from '@/src/components/atoms/card';

export const Wrapper = styled(Card)`
  padding: ${({theme}) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing.md};
`;

export const IconBox = styled.div<{ $color: string; $bg: string }>`
  padding: ${({theme}) => theme.spacing.sm};
  background-color: ${({$bg}) => $bg};
  color: ${({$color}) => $color};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({theme}) => theme.colors.gray[500]};
`;

export const Value = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({theme}) => theme.colors.gray[800]};
`;
