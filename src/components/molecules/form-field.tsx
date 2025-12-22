'use client';

import React from 'react';

import * as S from './form-field.styled';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  loading?: boolean;
}

export function FormField({label, children, loading}: FormFieldProps) {
  return (
    <S.Wrapper>
      <S.Label>
        {label}
        {loading && <S.LoadingText>(loading...)</S.LoadingText>}
      </S.Label>
      {children}
    </S.Wrapper>
  );
}
