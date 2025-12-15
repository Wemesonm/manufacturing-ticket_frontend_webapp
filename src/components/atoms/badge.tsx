'use client';

import styled from 'styled-components';

interface BadgeProps {
  color?: string;
  bg?: string;
  border?: string;
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${({bg, theme}) => bg ?? theme.colors.gray[100]};
  color: ${({color, theme}) => color ?? theme.colors.gray[800]};
  border: 1px solid ${({border}) => border ?? 'transparent'};
`;
