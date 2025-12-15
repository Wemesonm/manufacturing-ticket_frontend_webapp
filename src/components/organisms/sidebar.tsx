'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import styled from 'styled-components';
import {Factory, LayoutDashboard, LogOut, Ticket as TicketIcon} from 'lucide-react';

import {ROUTES} from '@/src/constants/routes';
import {useAuth} from '@/src/contexts/auth-context';

const Container = styled.aside<{ $isOpen: boolean }>`
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

const Brand = styled.div`
  padding: ${({theme}) => theme.spacing.lg};
  border-bottom: 1px solid ${({theme}) => theme.colors.brand[700]};
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing.sm};
`;

const Nav = styled.nav`
  flex: 1;
  padding: ${({theme}) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.xs};
`;

const NavItem = styled(Link)<{ $isActive: boolean }>`
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

const SignOutButton = styled.button`
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

const Footer = styled.div`
  padding: ${({theme}) => theme.spacing.md};
  border-top: 1px solid ${({theme}) => theme.colors.brand[700]};
`;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({isOpen, onClose}: SidebarProps) {
  const pathname = usePathname();
  const {signOut} = useAuth();

  const navItems = [
    {label: 'Dashboard', path: ROUTES.dashboard, icon: LayoutDashboard},
    {label: 'Tickets', path: ROUTES.tickets, icon: TicketIcon},
  ];

  return (
    <Container $isOpen={isOpen}>
      <Brand>
        <Factory size={32} color="#0ea5e9" />
        <div>
          <div style={{fontWeight: 'bold', fontSize: '1.25rem'}}>MTS</div>
          <div style={{fontSize: '0.75rem', color: '#bae6fd'}}>Manufacturing Ticket Sys</div>
        </div>
      </Brand>

      <Nav>
        {navItems.map(item => (
          <NavItem
            key={item.path}
            href={item.path}
            $isActive={pathname === item.path}
            onClick={onClose}
          >
            <item.icon size={20} />
            {item.label}
          </NavItem>
        ))}
      </Nav>

      <Footer>
        <SignOutButton onClick={signOut}>
          <LogOut size={20} />
          Sign Out
        </SignOutButton>
      </Footer>
    </Container>
  );
}
