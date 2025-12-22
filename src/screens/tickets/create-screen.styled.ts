import styled from 'styled-components';

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing.md};
  margin-bottom: ${({theme}) => theme.spacing.lg};
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({theme}) => theme.colors.gray[800]};
`;

export const SectionHeader = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({theme}) => theme.colors.gray[700]};
  border-bottom: 1px solid ${({theme}) => theme.colors.gray[200]};
  padding-bottom: ${({theme}) => theme.spacing.sm};
  margin-bottom: ${({theme}) => theme.spacing.md};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({theme}) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Grid3 = styled(Grid)`
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({theme}) => theme.spacing.sm};
  margin-top: ${({theme}) => theme.spacing.lg};
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 48px;
`;
