'use client';

import { useContext } from 'react';
import { Grid, Box, Button } from '@mui/material';
import { SharedDatabase } from './shared/shared';
import DCard from './(DashboardLayout)/components/shared/DCard';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';

export default function Dashboard() {
  let { cards } = useContext<any>(SharedDatabase);

  const openCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      const videoElement: any = document.querySelector(`video`);
      if (videoElement) videoElement.srcObject = stream;
    })
    .catch((error) => {
      console.error(`Error accessing camera`, error);
    });
  }

  return (
    <PageContainer title={`Dashboard`} description={`Dashboard Page`}>
      <Box>
        <Grid container spacing={3}>
          {cards && cards.length > 0 ? (
            cards.map((c: any, cidx: any) => (
              <Grid key={cidx} item xs={12}>
                <DCard 
                  title={`${cidx + 1}. ${c.name}`} 
                  action={c.name == `Camera` ? <Button style={{ color: `var(--fontColor)` }} onClick={() => openCamera()}>Open Camera</Button> : <></>} 
                />
              </Grid>
            ))
          ) : <></>}
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}