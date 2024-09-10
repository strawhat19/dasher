import React from 'react';
import Link  from 'next/link';
import { Stack } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';
import { routes } from '@/app/(DashboardLayout)/components/nav/nav';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';

interface registerType {
    title?: string;
    subtext?: JSX.Element | JSX.Element[];
    subtitle?: JSX.Element | JSX.Element[];
  }

export default function SignUpForm({ title, subtitle, subtext }: registerType) {
    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}
            {subtext}
            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='name' mb="5px">
                        Name
                    </Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth />
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">
                        Email Address
                    </Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth />
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">
                        Password
                    </Typography>
                    <CustomTextField id="password" variant="outlined" fullWidth />
                </Stack>
                <Button className={`button`} color="primary" variant="contained" size="large" fullWidth component={Link} href={routes.signup.href}>
                    {routes.signup.title}
                </Button>
            </Box>
            {subtitle}
        </>
    );
}