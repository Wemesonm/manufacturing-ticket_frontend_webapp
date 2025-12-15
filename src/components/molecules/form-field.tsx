'use client';

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: ${({theme}) => theme.spacing.md};
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({theme}) => theme.colors.gray[700]};
  margin-bottom: ${({theme}) => theme.spacing.xs};
`;

const LoadingText = styled.span`
  color: ${({theme}) => theme.colors.brand[500]};
  font-size: 0.75rem;
  margin-left: 4px;
`;

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  loading?: boolean;
}

export function FormField({label, children, loading}: FormFieldProps) {
  return (
    <Wrapper>
      <Label>
        {label}
        {loading && <LoadingText>(loading...)</LoadingText>}
      </Label>
      {children}
    </Wrapper>
  );
}
