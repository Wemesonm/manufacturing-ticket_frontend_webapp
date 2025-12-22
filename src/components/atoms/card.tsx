'use client';

import React from 'react';

import * as S from './card.styled';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card(props: CardProps) {
  return <S.Container {...props} />;
}

export function CardHeader(props: CardProps) {
  return <S.Header {...props} />;
}

export function CardBody(props: CardProps) {
  return <S.Body {...props} />;
}

export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <S.Title {...props} />;
}
