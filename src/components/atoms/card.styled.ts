'use client';

import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({theme}) => theme.colors.white};
  border-radius: ${({theme}) => theme.borderRadius.lg};
  border: 1px solid ${({theme}) => theme.colors.gray[200]};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const Header = styled.div`
  padding: ${({theme}) => theme.spacing.lg};
  border-bottom: 1px solid ${({theme}) => theme.colors.gray[100]};
`;

export const Body = styled.div`
  padding: ${({theme}) => theme.spacing.lg};
`;

export const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({theme}) => theme.colors.gray[800]};
`;
