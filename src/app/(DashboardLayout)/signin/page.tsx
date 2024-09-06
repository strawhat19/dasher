'use client';

import Link from 'next/link';
import Logo from '@/app/components/logo/logo';
import DCard from '../components/shared/DCard';
import { pages } from '../layout/sidebar/MenuItems';
import SignInForm from '../../components/auth/SignIn';
import { Box, Stack, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export default function Signin({}: any) {
  return (
    <PageContainer title={pages.signin.title} description={`${pages.signin.title} Page`}>
      {/* <Grid container spacing={3} alignItems={`center`}>
        <Grid item xs={11}>
          <DCard />
        </Grid>
        <Grid item xs={1}>
          <DCard />
        </Grid>
      </Grid> */}
      <DCard className={`w100`}>
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
      </DCard>
      {/* <DCard className={`m35t m35b`}>
        <DataGridDemo />
      </DCard> */}
    </PageContainer>
  );
};