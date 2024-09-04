'use client';

import React, { useContext } from 'react';
import Footer from './layout/footer/Footer';
import { GlobalDataContext } from '../globaldata';
import Header from '@/app/(DashboardLayout)/layout/header/Header';
import Sidebar from '@/app/(DashboardLayout)/layout/sidebar/Sidebar';

export default function RootLayout({children}: {children: React.ReactNode}) {
  let { darkMode, isSidebarOpen, isMobileSidebarOpen, setMobileSidebarOpen } = useContext<any>(GlobalDataContext);
  return (
    <div className={`wrapper w100 simpleFlex mh100vh ${darkMode ? `dark darkTheme` : `light lightTheme`}`}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
      />
      <div className={`page content w100`}>
        <Header />
        <main id={`main`} className={`main space column flex gapSpace w100`}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}