'use client';

import React from 'react';
import styled from 'styled-components';
import {Factory, Menu, X} from 'lucide-react';

import {Sidebar} from '@/src/components/organisms/sidebar';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Main = styled.main`
  flex: 1;
  background-color: ${({theme}) => theme.colors.gray[50]};
  min-height: 100vh;
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  padding: ${({theme}) => theme.spacing.md};
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: ${({theme}) => theme.spacing.xl};
  }
`;

const MobileHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme}) => theme.spacing.md};
  background-color: ${({theme}) => theme.colors.brand[900]};
  color: white;

  @media (min-width: 768px) {
    display: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: inherit;
`;

export function Layout({children}: {children: React.ReactNode}) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <Container>
      <MobileHeader>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold'}}>
          <Factory size={24} /> MTS
        </div>
        <IconButton onClick={() => setIsSidebarOpen(prev => !prev)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </IconButton>
      </MobileHeader>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <Main>
        <ContentWrapper>{children}</ContentWrapper>
      </Main>
    </Container>
  );
}
