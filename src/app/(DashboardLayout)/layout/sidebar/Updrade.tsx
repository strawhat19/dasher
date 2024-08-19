import Link from 'next/link';
import { AccountCircle } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';

export const Upgrade = () => {
    return (
        <Box
            gap={2}
            display='flex'
            alignItems="center"
            sx={{ m: 3, p: 3, bgcolor: 'primary.light', borderRadius: '8px' }}
        >
            <>
                <Box>
                    <Typography variant="h5" sx={{ width: "80px" }} fontSize='16px' mb={1}>
                        No Account?
                    </Typography>
                    <Button color="primary" disableElevation component={Link} href="/authentication/register" variant="contained" aria-label="logout" size="small">
                        Sign Up
                    </Button>
                </Box>

                <div className={`flex spacerBox`}>
                    <AccountCircle style={{ fontSize: 50, color: `var(--main)` }} />
                </div>
            </>
        </Box>
    );
};