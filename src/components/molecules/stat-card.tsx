'use client';

import React from 'react';
import {LucideIcon} from 'lucide-react';

import * as S from './stat-card.styled';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export function StatCard({label, value, icon: Icon, color, bgColor}: StatCardProps) {
  return (
    <S.Wrapper>
      <S.IconBox $color={color} $bg={bgColor}>
        <Icon size={24} />
      </S.IconBox>
      <S.Content>
        <S.Label>{label}</S.Label>
        <S.Value>{value}</S.Value>
      </S.Content>
    </S.Wrapper>
  );
}
