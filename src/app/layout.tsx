'use client';

import './global.scss';
import { useState } from 'react';
import DataShare from './datashare';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { baselightTheme } from '@/utils/theme/DefaultColors';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  let [darkMode, setDarkMode] = useState(false);
  return (
    <DataShare value={{darkMode, setDarkMode}}>
      <html lang={`en`}>
        <body className={`dasherBody ${darkMode ? `dark` : `light`}`}>
          <ThemeProvider theme={baselightTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </DataShare>
  );
}