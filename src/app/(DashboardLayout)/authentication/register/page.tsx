'use client';

import Link from 'next/link';
import AuthRegister from '../auth/AuthRegister';
import { Box, Typography, Stack } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const Register = () => (
  <PageContainer title={`Register`} description={`Register Page`}>
    <DashboardCard title={`Register`}>
      <>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Logo />
        </Box>
        <AuthRegister
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
              justifyContent="center"
              spacing={1}
              mt={3}
            >
              <Typography
                color="textSecondary"
                variant="h6"
                fontWeight="400"
              >
                Already have an Account?
              </Typography>
              <Typography
                component={Link}
                href="/authentication/login"
                fontWeight="500"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                }}
              >
                Sign In
              </Typography>
            </Stack>
          }
        />
      </>
    </DashboardCard>
  </PageContainer>
);

export default Register;