'use client';

import styled, {css} from 'styled-components';

const inputStyles = css`
  width: 100%;
  padding: ${({theme}) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({theme}) => theme.colors.gray[300]};
  border-radius: ${({theme}) => theme.borderRadius.md};
  background-color: ${({theme}) => theme.colors.white};
  transition: all 0.2s;
  font-size: 0.875rem;
  color: ${({theme}) => theme.colors.gray[900]};

  &:focus {
    outline: none;
    border-color: ${({theme}) => theme.colors.brand[500]};
    box-shadow: 0 0 0 2px ${({theme}) => theme.colors.brand[100]};
  }

  &:disabled {
    background-color: ${({theme}) => theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  ${inputStyles}
`;

export const Select = styled.select`
  ${inputStyles}
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'292.4'%20height%3D'292.4'%3E%3Cpath%20fill%3D'%236b7280'%20d%3D'M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z'%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;
  padding-right: 2rem;
`;

export const TextArea = styled.textarea`
  ${inputStyles}
`;
