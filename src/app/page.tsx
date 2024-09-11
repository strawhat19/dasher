'use client';

import { useContext } from 'react';
import { SharedDatabase } from './shared/shared';
import { Grid, Box, Button } from '@mui/material';
import { Camera, Share } from '@mui/icons-material';
import { devEnv } from './shared/library/common/constants';
import DCard from './(DashboardLayout)/components/shared/DCard';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';

export default function Dashboard() {
  let { beta, darkMode, cards } = useContext<any>(SharedDatabase);

  const openShare = () => {
    if (navigator.share) {
      navigator.share({
        url: `https://dasher-six.vercel.app/`,
        title: `Check out this Next JS PWA`,
        text: `This is a cool web app that behaves like a native app!`,
      })
      .then(() => console.log(`Share successful!`))
      .catch((error) => console.log(`Error sharing:`, error));
    } else {
      console.log(`Web Share API not supported.`);
    }
  }

  const openCamera = () => {
    const inputElement = document.createElement(`input`);
    inputElement.type = `file`;
    inputElement.accept = `image/*`;
    inputElement.style.display = `none`;
    inputElement.capture = `environment`;

    inputElement.addEventListener(`change`, (event: any) => {
      const file = event.target.files[0];
      if (file) {
        console.log(`Image captured`, file);
      }
    });

    document.body.appendChild(inputElement);
    inputElement.click();

    document.body.removeChild(inputElement);
  }

  return (
    <PageContainer title={`Dashboard`} description={`Dashboard Page`}>
      <Box>
        <Grid container spacing={3}>
          {(devEnv || beta) ? <>
            <Grid item xs={12} md={7}>
              <DCard 
                minHeight={600} 
                className={`scaleIn`}
                style={{ 
                  backgroundPosition: `50% 63% !important`,
                  background: `url(/images/hq/siloridge.jpg)`,
                }} 
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Grid container spacing={3} className={`h100`}>
                {cards && cards.length > 0 ? (
                  cards.map((c: any, cidx: any) => (
                    <Grid key={cidx} item xs={12}>
                      <DCard 
                        className={`h100`}
                        title={`${cidx + 1}. ${c.name}`} 
                        action={
                          c.name == `Camera` ? <Button className={`mainButton blackButton`} startIcon={<Camera />} style={{ color: darkMode ? `var(--fontColor)` : `var(--labelColor)` }} onClick={() => openCamera()}>Camera</Button> 
                        : 
                          c.name == `Share` ? <Button className={`mainButton blackButton`} startIcon={<Share />} style={{ color: darkMode ? `var(--fontColor)` : `var(--labelColor)` }} onClick={() => openShare()}>Share</Button> 
                        :  <></>} 
                      />
                    </Grid>
                  ))
                ) : <></>}
              </Grid>
            </Grid>
          </> : <></>}
          <Grid item lg={8} xs={12}>
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