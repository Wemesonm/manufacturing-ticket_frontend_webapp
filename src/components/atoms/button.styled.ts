'use client';

import styled, {css} from 'styled-components';

import {ButtonVariant} from './button';

export interface StyledButtonProps {
  $variant: ButtonVariant;
  $fullWidth?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({theme}) => theme.spacing.sm};
  padding: ${({theme}) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({theme}) => theme.borderRadius.md};
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;
  border: 1px solid transparent;
  width: ${({$fullWidth}) => ($fullWidth ? '100%' : 'auto')};
  white-space: nowrap;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  ${({$variant = 'primary', theme}) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.gray[100]};
          color: ${theme.colors.gray[800]};
          &:hover {
            background-color: ${theme.colors.gray[200]};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          border-color: ${theme.colors.gray[300]};
          color: ${theme.colors.gray[700]};
          &:hover {
            background-color: ${theme.colors.gray[50]};
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.gray[600]};
          padding: ${theme.spacing.sm};
          &:hover {
            background-color: ${theme.colors.gray[100]};
            color: ${theme.colors.gray[900]};
          }
        `;
      case 'danger':
        return css`
          background-color: ${theme.colors.danger};
          color: white;
          &:hover {
            opacity: 0.9;
          }
        `;
      case 'primary':
      default:
        return css`
          background-color: ${theme.colors.brand[600]};
          color: white;
          &:hover {
            background-color: ${theme.colors.brand[700]};
          }
        `;
    }
  }}
`;
