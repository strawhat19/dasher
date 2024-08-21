import Link from 'next/link';
import { useContext } from 'react';
import { pages } from '../../../../../server';
import { AccountCircle } from '@mui/icons-material';
import { GlobalDataContext } from '@/app/datashare';
import { Box, Typography, Button } from '@mui/material';

export const Upgrade = () => {
    let { darkMode } = useContext<any>(GlobalDataContext);
    return (
        <Box
            gap={2}
            display={`flex`}
            alignItems={`center`}
            className={`noAccountBox`}
            sx={{ m: 3, p: 3, bgcolor: 'primary.light', borderRadius: '8px' }}
        >
            <>
                <Box>
                    <Typography variant="h5" sx={{ width: "80px" }} fontSize='16px' mb={1}>
                        No Account?
                    </Typography>
                    <Button color="primary" disableElevation component={Link} href={pages.signup.link} variant="contained" aria-label="logout" size="small">
                        {pages.signup.title}
                    </Button>
                </Box>

                <div className={`flex spacerBox`}>
                    <AccountCircle style={{ fontSize: 50, color: darkMode ? `var(--teal)` : `var(--main)` }} />
                </div>
            </>
        </Box>
    );
};