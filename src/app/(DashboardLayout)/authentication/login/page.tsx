'use client';

import Link from 'next/link';
import AuthLogin from '../auth/AuthLogin';
import { Box, Stack, Typography } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const Login = () => {
  return (
    <PageContainer title={`Login`} description={`Login Page`}>
      <DashboardCard title={`Login`}>
        <>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Logo />
          </Box>
          <AuthLogin
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
                  href="/authentication/register"
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
    </PageContainer>
  );
};

export default Login;