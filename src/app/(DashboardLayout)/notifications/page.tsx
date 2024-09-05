'use client';

import { pages } from '../layout/sidebar/MenuItems';
import DCard from '@/app/(DashboardLayout)/components/shared/DCard';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export default function NotificationsPage() {
  return (
    <PageContainer title={pages.notifications.title} description={`${pages.notifications.title} Page`}>
      <div className={`pageGrid notificationsPageGrid flex column gap20 w100`}>
        <div className={`pageRow notificationsPageRow flex gap20`}>
          <DCard minHeight={280} title={pages.notifications.title} className={`w100`}>
            This is the {pages.notifications.title} Page
          </DCard>
          <div className={`pageColumn notificationsPageColumn flex gap20 h100`}>
            <DCard title={pages.notifications.title} className={`w100 h100`}>
              This is the {pages.notifications.title} Page
            </DCard>
            <DCard title={pages.notifications.title} className={`w100 h100`}>
              This is the {pages.notifications.title} Page
            </DCard>
          </div>
        </div>
        <DCard title={pages.notifications.title} className={`w100`}>
          This is the {pages.notifications.title} Page
        </DCard>
        <DCard title={pages.notifications.title} className={`w100`}>
          This is the {pages.notifications.title} Page
        </DCard>
        <DCard title={pages.notifications.title} className={`w100`}>
          This is the {pages.notifications.title} Page
        </DCard>
      </div>
    </PageContainer>
  );
};