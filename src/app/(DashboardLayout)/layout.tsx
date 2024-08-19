'use client';

import React, { useState } from 'react';
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
  paddingBottom: `60px`,
  flexDirection: `column`,
  backgroundColor: `transparent`,
}));

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <MainWrapper className={`mainWrapper mainwrapper`}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper className={`pageWrapper page-wrapper`}>
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Container sx={{ paddingTop: `20px`, maxWidth: `1200px` }}>
          <Box sx={{ minHeight: `calc(100vh - 170px)` }}>
            {children}
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}