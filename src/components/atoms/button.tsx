'use client';

import React from 'react';

import * as S from './button.styled';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export function Button({variant = 'primary', fullWidth, ...props}: ButtonProps) {
  return <S.StyledButton $variant={variant} $fullWidth={fullWidth} {...props} />;
}
