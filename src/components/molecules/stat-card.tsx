'use client';

import React from 'react';
import styled from 'styled-components';
import {LucideIcon} from 'lucide-react';

import {Card} from '@/src/components/atoms/card';

const Wrapper = styled(Card)`
  padding: ${({theme}) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing.md};
`;

const IconBox = styled.div<{ $color: string; $bg: string }>`
  padding: ${({theme}) => theme.spacing.sm};
  background-color: ${({$bg}) => $bg};
  color: ${({$color}) => $color};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({theme}) => theme.colors.gray[500]};
`;

const Value = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({theme}) => theme.colors.gray[800]};
`;

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export function StatCard({label, value, icon: Icon, color, bgColor}: StatCardProps) {
  return (
    <Wrapper>
      <IconBox $color={color} $bg={bgColor}>
        <Icon size={24} />
      </IconBox>
      <Content>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </Content>
    </Wrapper>
  );
}
