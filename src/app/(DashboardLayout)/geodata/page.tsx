'use client';

import { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import Map from '@/app/components/geodata/map/map';
import { pages } from '../layout/sidebar/MenuItems';
import { GlobalDataContext } from '@/app/globaldata';
import Time from '@/app/components/geodata/time/time';
import GeoDataForm from '@/app/components/geodata/form/geodataform';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export default function GeoDataPage() {
  let { location } = useContext<any>(GlobalDataContext);
  return <>
    <PageContainer title={pages.geodata.title} description={`${pages.geodata.title} Page`}>
      <Box>
        <Grid container alignItems={`center`} spacing={3}>
          <Grid item xs={12} lg={8}>
            <DashboardCard title={pages.geodata.title} action={<Time updater={true} />}>
              <GeoDataForm />
              <Map latitude={location.latitude} longitude={location.longitude} />
            </DashboardCard>
          </Grid>
          <Grid className={`h100`} item xs={12} lg={4}>
            <Grid container className={`h100`} spacing={3}>
              <Grid item xs={12}>
                <DashboardCard minHeight={220} title={`Locations`} className={`h100`}>
                  Locations
                </DashboardCard>
              </Grid>
              <Grid item xs={12}>
                <DashboardCard minHeight={220} title={`Other`} className={`h100`}>
                  Other
                </DashboardCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <DashboardCard minHeight={280} title={`GeoData Weather & Time`} className={`m25t`} action={<Time />}>
          GeoData Weather & Time
        </DashboardCard>
      </Box>
    </PageContainer>
  </>
}