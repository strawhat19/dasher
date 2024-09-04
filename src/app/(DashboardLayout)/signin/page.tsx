'use client';

import Link from 'next/link';
import Logo from '@/app/components/logo/logo';
import { pages } from '../layout/sidebar/MenuItems';
import SignInForm from '../../components/auth/SignIn';
import { Box, Stack, Typography } from '@mui/material';
import DashboardCard from '../components/shared/DashboardCard';
// import DataGridDemo from '@/app/components/datagrid/datagrid';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export default function Signin() {
  return (
    <PageContainer title={pages.signin.title} description={`${pages.signin.title} Page`}>
      <DashboardCard>
        <>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Logo className={`center`} />
          </Box>
          <SignInForm
            subtext={
              <Typography
                variant="subtitle1"
                textAlign="center"
                color="textSecondary"
                mb={1}
              >
                Your Social Campaigns
              </Typography>
            }
            subtitle={
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                mt={3}
              >
                <Typography
                  color="textSecondary"
                  variant="h6"
                  fontWeight="500"
                >
                  New to Modernize?
                </Typography>
                <Typography
                  component={Link}
                  href={pages.signup.link}
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Create an account
                </Typography>
              </Stack>
            }
          />
        </>
      </DashboardCard>
      {/* <DashboardCard className={`m35t m35b`}>
        <DataGridDemo />
      </DashboardCard> */}
    </PageContainer>
  );
};