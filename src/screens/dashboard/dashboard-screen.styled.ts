import styled from 'styled-components';

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({theme}) => theme.colors.gray[800]};
  margin-bottom: ${({theme}) => theme.spacing.lg};
`;

export const Grid = styled.div`
  display: grid;
  gap: ${({theme}) => theme.spacing.lg};
  margin-bottom: ${({theme}) => theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ChartsGrid = styled.div`
  display: grid;
  gap: ${({theme}) => theme.spacing.lg};

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ChartContainer = styled.div`
  height: 320px;
  width: 100%;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;
