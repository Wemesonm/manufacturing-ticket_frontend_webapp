'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.aside<{ $isOpen: boolean }>`
  background-color: ${({theme}) => theme.colors.brand[900]};
  color: white;
  width: 260px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 40;
  transition: transform 0.2s ease-in-out;
  transform: ${({$isOpen}) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    position: sticky;
    transform: translateX(0);
  }
`;

export const Brand = styled.div`
  padding: ${({theme}) => theme.spacing.lg};
  border-bottom: 1px solid ${({theme}) => theme.colors.brand[700]};
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing.sm};
`;

export const Nav = styled.nav`
  flex: 1;
  padding: ${({theme}) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.xs};
`;

export const NavItem = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing.md};
  padding: ${({theme}) => theme.spacing.md};
  border-radius: ${({theme}) => theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({$isActive, theme}) => ($isActive ? theme.colors.white : theme.colors.brand[100])};
  background-color: ${({$isActive, theme}) => ($isActive ? theme.colors.brand[700] : 'transparent')};

  &:hover {
    background-color: ${({theme}) => theme.colors.brand[800]};
    color: white;
  }
`;

export const SignOutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing.md};
  padding: ${({theme}) => theme.spacing.md};
  color: ${({theme}) => theme.colors.brand[100]};
  background: none;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: ${({theme}) => theme.borderRadius.md};

  &:hover {
    background-color: ${({theme}) => theme.colors.brand[800]};
    color: white;
  }
`;

export const Footer = styled.div`
  padding: ${({theme}) => theme.spacing.md};
  border-top: 1px solid ${({theme}) => theme.colors.brand[700]};
`;
