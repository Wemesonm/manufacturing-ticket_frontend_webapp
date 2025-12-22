'use client';

import React from 'react';

import {StyledBadge, StyledBadgeProps} from './badge.styled';

export type BadgeProps = StyledBadgeProps & React.HTMLAttributes<HTMLSpanElement>;

export function Badge({color, bg, border, ...props}: BadgeProps) {
  return <StyledBadge color={color} bg={bg} border={border} {...props} />;
}
