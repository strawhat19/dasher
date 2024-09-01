'use client';

import React, { useContext } from 'react';
import Footer from './layout/footer/Footer';
import { GlobalDataContext } from '../globaldata';
import { styled, Container, Box } from '@mui/material';
import Header from '@/app/(DashboardLayout)/layout/header/Header';
import Sidebar from '@/app/(DashboardLayout)/layout/sidebar/Sidebar';

const MainWrapper = styled(`div`)(() => ({
  width: `100%`,
  display: `flex`,
  minHeight: `100vh`,
}));

const PageWrapper = styled(`div`)(() => ({
  zIndex: 1,
  flexGrow: 1,
  display: `flex`,
  flexDirection: `column`,
  backgroundColor: `transparent`,
}));

export default function RootLayout({children}: {children: React.ReactNode}) {
  let { darkMode, isSidebarOpen, isMobileSidebarOpen, setMobileSidebarOpen } = useContext<any>(GlobalDataContext);
  return (
    <MainWrapper className={`mainWrapper mainwrapper ${darkMode ? `dark darkTheme` : `light lightTheme`}`}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
      />
      <PageWrapper className={`pageWrapper page-wrapper`}>
        <Header />
        <Container className={`mainContainer`} sx={{ paddingTop: `20px` }}>
          <Box className={`main`} sx={{ minHeight: `calc(100vh - 220px)` }}>
            {children}
          </Box>
        </Container>
        <Footer />
      </PageWrapper>
    </MainWrapper>
  );
}