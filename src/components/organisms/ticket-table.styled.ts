'use client';

import styled from 'styled-components';

export const TableContainer = styled.div`
  background-color: ${({theme}) => theme.colors.white};
  border-radius: ${({theme}) => theme.borderRadius.lg};
  border: 1px solid ${({theme}) => theme.colors.gray[200]};
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  white-space: nowrap;
`;

export const Th = styled.th`
  text-align: left;
  padding: ${({theme}) => theme.spacing.md};
  background-color: ${({theme}) => theme.colors.gray[50]};
  color: ${({theme}) => theme.colors.gray[600]};
  font-weight: 600;
  border-bottom: 1px solid ${({theme}) => theme.colors.gray[200]};
`;

export const Td = styled.td`
  padding: ${({theme}) => theme.spacing.md};
  border-bottom: 1px solid ${({theme}) => theme.colors.gray[100]};
  color: ${({theme}) => theme.colors.gray[800]};
`;
