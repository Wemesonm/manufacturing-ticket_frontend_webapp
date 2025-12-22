import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.md};
  margin-bottom: ${({theme}) => theme.spacing.lg};

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const TicketTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacing.md};
`;

export const Code = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({theme}) => theme.colors.gray[800]};
`;

export const SubHeader = styled.p`
  color: ${({theme}) => theme.colors.gray[500]};
  font-size: 0.875rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({theme}) => theme.spacing.lg};

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.lg};
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.lg};
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({theme}) => theme.spacing.xs} 0;
  border-bottom: 1px solid ${({theme}) => theme.colors.gray[100]};

  &:last-child {
    border-bottom: none;
  }
`;

export const Label = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({theme}) => theme.colors.gray[500]};
  font-weight: 600;
`;

export const Value = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({theme}) => theme.colors.gray[900]};
  text-align: right;
`;

export const DescriptionBox = styled.div`
  background-color: ${({theme}) => theme.colors.gray[50]};
  padding: ${({theme}) => theme.spacing.md};
  border-radius: ${({theme}) => theme.borderRadius.md};
  color: ${({theme}) => theme.colors.gray[700]};
  white-space: pre-wrap;
  line-height: 1.6;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 48px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
`;

export const ErrorMessage = styled.p`
  color: #b91c1c;
  font-weight: 600;
`;
