'use client';

import './theme.scss';
import './global.scss';
import './utility.scss';

import GlobalData from './globaldata';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { baselightTheme } from '@/utils/theme/DefaultColors';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return <>
    <GlobalData>
      <html lang={`en`} className={`dasherHTML`}>
        <body className={`dasherBody`}>
          <ThemeProvider theme={baselightTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </GlobalData>
  </>
}