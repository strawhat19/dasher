'use client';

import { useContext } from 'react';
import { Grid } from '@mui/material';
import { devEnv } from '../../../../server';
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
      <Grid className={`geodataGrid`} container spacing={3} alignItems={`center`}>
        <Grid className={`geodataGridItem`} item xs={12} lg={8}>
          <DashboardCard id={`geodataCard`} title={pages.geodata.title} className={`geodataCard`} action={<Time updater={!devEnv} />}>
            <GeoDataForm />
            <Map latitude={location.latitude} longitude={location.longitude} />
          </DashboardCard>
        </Grid>
        <Grid className={`geodataGridItem`} item xs={12} lg={4}>
          <DashboardCard id={`weatherCard`} minHeight={230} title={`Weather`} className={`weatherCard h100`}>
            {Array(16).fill(`Weather`).map((itm: any, idx) => (
              <div key={idx} className={`weather`}>
                {itm}
              </div>
            ))}
          </DashboardCard>
        </Grid>
      </Grid>
      <Grid className={`foreCast geodataGrid`} container spacing={3} alignItems={`center`}>
        {Array(6).fill(null).map((itm: any, idx) => (
          <Grid item lg={2} xs={6} key={idx}>
            <DashboardCard />
          </Grid>
        ))}
      </Grid>
      <Grid className={`weatherAndTime geodataGrid`} container spacing={3} alignItems={`center`}>
        <Grid item xs={12}>
          <DashboardCard id={`geodataDetailsCard`} minHeight={171} title={`GeoData Weather & Time`} className={`geodataDetailsCard w100`} action={<Time />}>
            GeoData Weather & Time
            <div className={`geodataCoordinates flex column gap5 alignStart`}>
              <div className={`latitude coordinate`}>Latitude: {location.latitude}</div>
              <div className={`longitude coordinate`}>Longitude: {location.longitude}</div>
            </div>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  </>
}