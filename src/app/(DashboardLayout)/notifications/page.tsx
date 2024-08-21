'use client';

import { Typography } from '@mui/material';
// import { notifications } from '../layout/header/data';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const NotificationsPage = () => {
  return (
    <PageContainer title={`Notification(s)`} description={`Notification(s) Page`}>
      <DashboardCard title={`Notification(s)`}>
        <>
          <Typography>This is the Notifications Page</Typography>
          {/* {notifications.map((not, index) => {
            return (
              <div key={index} className={`notification`}>
                <h3>{not.title}</h3>
                <h4>{not.subtitle}</h4>
              </div>
            )
          })} */}
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default NotificationsPage;