'use client';

import './global.scss';
import { useState } from 'react';
import DataShare from './datashare';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { baselightTheme } from '@/utils/theme/DefaultColors';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  let [user, setUser] = useState(null);
  let [darkMode, setDarkMode] = useState(true);
  let [isSidebarOpen, setSidebarOpen] = useState(true);
  let [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <DataShare 
      value={{ 
        user, setUser, 
        darkMode, setDarkMode, 
        isSidebarOpen, setSidebarOpen, 
        isMobileSidebarOpen, setMobileSidebarOpen, 
      }}
    >
      <html lang={`en`} className={`dasherHTML ${darkMode ? `dark` : `light`}`}>
        <body className={`dasherBody`}>
          <ThemeProvider theme={baselightTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </DataShare>
  );
}