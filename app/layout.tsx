import type {Metadata} from 'next';
import './globals.css';

import StyledComponentsRegistry from '@/src/lib/styled-components';
import {AppProviders} from './providers';

export const metadata: Metadata = {
  title: 'Manufacturing Ticket System',
  description: 'Production support ticketing dashboard',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <AppProviders>{children}</AppProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
