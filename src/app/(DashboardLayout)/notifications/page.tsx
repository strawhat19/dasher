'use client';

import { Typography } from '@mui/material';
import { pages } from '../layout/sidebar/MenuItems';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const NotificationsPage = () => {
  return (
    <PageContainer title={pages.notifications.title} description={`${pages.notifications.title} Page`}>
      <DashboardCard title={pages.notifications.title}>
        <>
          <Typography>This is the {pages.notifications.title} Page</Typography>
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default NotificationsPage;