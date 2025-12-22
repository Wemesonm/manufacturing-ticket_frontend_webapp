'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: ${({theme}) => theme.spacing.md};
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({theme}) => theme.colors.gray[700]};
  margin-bottom: ${({theme}) => theme.spacing.xs};
`;

export const LoadingText = styled.span`
  color: ${({theme}) => theme.colors.brand[500]};
  font-size: 0.75rem;
  margin-left: 4px;
`;
