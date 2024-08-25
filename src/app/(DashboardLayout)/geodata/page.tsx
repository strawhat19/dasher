'use client';

import { useState } from 'react';
import Map from '@/app/components/map/map';
import { pages } from '../layout/sidebar/MenuItems';
import { GeoDataFormTypes } from '../../../../enums';
import { GpsFixedOutlined, NearMeOutlined } from '@mui/icons-material';
import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const GeoDataFormTypesToggle = ({value, onChange}: any) => {
  let formTypes = Object.values(GeoDataFormTypes);
  return (
    <ToggleButtonGroup onChange={onChange} value={value} className={`geoDataFormTypesToggle`} size={`small`}>
      {formTypes.map((formType, idx) => (
        <ToggleButton key={idx} value={formType} className={`geoDataFormTypesToggleBtn noBorder ${idx == 0 ? `first` : idx == formTypes.length - 1 ? `last` : `middle`}`}>
          {formType == GeoDataFormTypes.Locations ? <NearMeOutlined /> : <GpsFixedOutlined />}
          <div className={`pointerEventsNone`} style={{ paddingLeft: 5, fontSize: 15 }}>
            {formType}
          </div>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

const GeoDataPage = () => {
  // let { setPageTitle } = useContext<any>(GlobalDataContext);
  let [currentFormType, setCurrentFormType] = useState<any>(GeoDataFormTypes.Locations);

  const formTypeChange = (e: any) => {
    let val = e.target.value;
    setCurrentFormType(val);
  }

  // useEffect(() => {
  //   setPageTitle(<Logo fontSize={18} fontWeight={500} icon={<PublicOutlined style={{ color: `var(--iconRight)` }} />} label={pages.geodata.title} />);
  // }, [])

  return (
    <PageContainer title={pages.geodata.title} description={`${pages.geodata.title} Page`}>
      <Box>
        <Grid container alignItems={`center`} spacing={3}>
          <Grid item xs={12} lg={8}>
            <DashboardCard title={pages.geodata.title} action={true ? <GeoDataFormTypesToggle value={currentFormType} onChange={(e: any) => formTypeChange(e)} /> : <></>}>
              <Map formType={currentFormType} showForm={true} />
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
        <DashboardCard minHeight={280} title={`GeoData Weather & Time`} className={`m25t`}>
          GeoData Weather & Time
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default GeoDataPage;