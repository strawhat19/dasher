'use client';

import React, { useContext } from 'react';
import Footer from './layout/footer/Footer';
import { GlobalDataContext } from '../datashare';
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
  let { isSidebarOpen, isMobileSidebarOpen, setMobileSidebarOpen } = useContext<any>(GlobalDataContext);
  return (
    <MainWrapper className={`mainWrapper mainwrapper`}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
      />
      <PageWrapper className={`pageWrapper page-wrapper`}>
        <Header />
        <Container sx={{ paddingTop: `20px`, maxWidth: `1200px` }}>
          <Box sx={{ minHeight: `calc(100vh - 205px)` }}>
            {children}
          </Box>
        </Container>
        <Footer />
      </PageWrapper>
    </MainWrapper>
  );
}