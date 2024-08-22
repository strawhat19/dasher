'use client';

import { pages } from '../../../../server';
import Map from '@/app/components/map/map';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const GeoDataPage = () => {
  return (
    <PageContainer title={pages.geodata.title} description={`${pages.geodata.title} Page`}>
      <DashboardCard title={pages.geodata.title}>
        <>
          <Map showForm={true} />
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default GeoDataPage;