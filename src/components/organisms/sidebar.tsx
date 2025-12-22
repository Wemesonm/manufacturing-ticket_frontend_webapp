"use client";

import { usePathname } from "next/navigation";
import {
  Factory,
  LayoutDashboard,
  LogOut,
  Ticket as TicketIcon,
} from "lucide-react";

import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/auth-context";

import * as S from "./sidebar.styled";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useAuth();

  const navItems = [
    { label: "Dashboard", path: ROUTES.dashboard, icon: LayoutDashboard },
    { label: "Tickets", path: ROUTES.tickets, icon: TicketIcon },
  ];

  return (
    <S.Container $isOpen={isOpen}>
      <S.Brand>
        <Factory size={32} color="#0ea5e9" />
        <div>
          <div style={{ fontWeight: "bold", fontSize: "1.25rem" }}>MTS</div>
          <div style={{ fontSize: "0.75rem", color: "#bae6fd" }}>
            Manufacturing Ticket Sys
          </div>
        </div>
      </S.Brand>

      <S.Nav>
        {navItems.map((item) => (
          <S.NavItem
            key={item.path}
            href={item.path}
            $isActive={pathname === item.path}
            onClick={onClose}
          >
            <item.icon size={20} />
            {item.label}
          </S.NavItem>
        ))}
      </S.Nav>

      <S.Footer>
        <S.SignOutButton onClick={signOut}>
          <LogOut size={20} />
          Sign Out
        </S.SignOutButton>
      </S.Footer>
    </S.Container>
  );
}
