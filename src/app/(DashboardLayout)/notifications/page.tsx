'use client';

import { pages } from '../layout/sidebar/MenuItems';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export default function NotificationsPage() {
  return (
    <PageContainer title={pages.notifications.title} description={`${pages.notifications.title} Page`}>
      <div className={`pageGrid notificationsPageGrid flex column gap20 w100`}>
        <div className={`pageRow notificationsPageRow flex gap20`}>
          <DashboardCard minHeight={280} title={pages.notifications.title} className={`w100`}>
            This is the {pages.notifications.title} Page
          </DashboardCard>
          <div className={`pageColumn notificationsPageColumn flex gap20 h100`}>
            <DashboardCard title={pages.notifications.title} className={`w100 h100`}>
              This is the {pages.notifications.title} Page
            </DashboardCard>
            <DashboardCard title={pages.notifications.title} className={`w100 h100`}>
              This is the {pages.notifications.title} Page
            </DashboardCard>
          </div>
        </div>
        <DashboardCard title={pages.notifications.title} className={`w100`}>
          This is the {pages.notifications.title} Page
        </DashboardCard>
        <DashboardCard title={pages.notifications.title} className={`w100`}>
          This is the {pages.notifications.title} Page
        </DashboardCard>
        <DashboardCard title={pages.notifications.title} className={`w100`}>
          This is the {pages.notifications.title} Page
        </DashboardCard>
      </div>
    </PageContainer>
  );
};