'use client';

import { useContext } from 'react';
import { Grid } from '@mui/material';
import Map from '@/app/components/geodata/map/map';
import { SharedDatabase } from '@/app/shared/shared';
import Time from '@/app/components/geodata/time/time';
import { devEnv } from '@/app/shared/library/common/constants';
import { routes } from '@/app/(DashboardLayout)/components/nav/nav';
import GeoDataForm from '@/app/components/geodata/form/geodataform';
import DCard from '@/app/(DashboardLayout)/components/shared/DCard';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export default function GeoDataPage() {
  let { location } = useContext<any>(SharedDatabase);
  return <>
    <PageContainer title={routes.geodata.title} description={`${routes.geodata.title} Page`}>
      <Grid className={`geoDataGrid`} container spacing={3} alignItems={`center`}>
        <Grid className={`geoDataGridItem`} item xs={12} md={8}>
          <DCard id={`geoDataCard`} className={`geoDataCard`} title={routes.geodata.title} action={<Time updater={!devEnv} />}>
            <GeoDataForm />
            <Map latitude={location.latitude} longitude={location.longitude} />
          </DCard>
        </Grid>
        <Grid className={`geoDataGridItem`} item xs={12} md={4}>
          <DCard id={`weatherCard`} className={`weatherCard h100`} minHeight={230} title={`Weather`}>
            {Array(18).fill(`Weather`).map((itm: any, idx) => (
              <div key={idx} className={`weather`}>
                {itm}
              </div>
            ))}
          </DCard>
        </Grid>
      </Grid>
      <Grid className={`foreCast geoDataGrid`} container spacing={3} alignItems={`center`}>
        {Array(6).fill(`Weather`).map((itm: any, idx) => (
          <Grid item lg={2} xs={6} key={idx}>
            <DCard >
              {/* {itm} */}
            </DCard>
          </Grid>
        ))}
      </Grid>
      <Grid className={`weatherAndTime geoDataGrid`} container spacing={3} alignItems={`center`}>
        <Grid item xs={12}>
          <DCard id={`geoDataDetailsCard`} minHeight={171} title={`GeoData Weather & Time`} className={`geoDataDetailsCard w100`} action={<Time />}>
            <div className={`geoDataCoordinates flex column gap5 alignStart`}>
              <div className={`latitude coordinate`}>Latitude: {location.latitude}</div>
              <div className={`longitude coordinate`}>Longitude: {location.longitude}</div>
            </div>
          </DCard>
        </Grid>
      </Grid>
    </PageContainer>
  </>
}