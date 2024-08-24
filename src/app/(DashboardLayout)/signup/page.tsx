import Link from 'next/link';
import Logo from '@/app/components/logo/logo';
import { pages } from '../layout/sidebar/MenuItems';
import SignUpForm from '../../components/auth/SignUp';
import { Box, Typography, Stack } from '@mui/material';
import DashboardCard from '../components/shared/DashboardCard';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export default function SignUp() {
  return (
    <PageContainer title={pages.signup.title} description={`${pages.signup.title} Page`}>
      <DashboardCard>
        <>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Logo className={`center`} />
          </Box>
          <SignUpForm
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
                  href={pages.signin.link}
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  {pages.signin.title}
                </Typography>
              </Stack>
            }
          />
        </>
      </DashboardCard>
    </PageContainer>
  )
};