'use client';

import { Typography } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const NotificationsPage = () => {
  return (
    <PageContainer title={`Notification(s)`} description={`Notification(s) Page`}>
      <DashboardCard title={`Notification(s)`}>
        <Typography>This is the Notifications Page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default NotificationsPage;