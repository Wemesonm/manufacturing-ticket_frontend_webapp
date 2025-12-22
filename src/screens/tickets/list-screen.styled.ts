import {Search} from 'lucide-react';
import styled from 'styled-components';

import {Button} from '@/src/components/atoms/button';
import {Card} from '@/src/components/atoms/card';
import {Input} from '@/src/components/atoms/input';

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.md};
  margin-bottom: ${({theme}) => theme.spacing.lg};

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({theme}) => theme.colors.gray[800]};
`;

export const FilterBar = styled(Card)`
  padding: ${({theme}) => theme.spacing.md};
  margin-bottom: ${({theme}) => theme.spacing.lg};
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({theme}) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  top: 10px;
  color: ${({theme}) => theme.colors.gray[400]};
`;

export const SearchInput = styled(Input)`
  padding-left: 36px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 48px;
`;

export const NewTicketButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing.xs};
`;
