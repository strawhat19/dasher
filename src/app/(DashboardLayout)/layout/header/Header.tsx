import Link from 'next/link';
import Profile from './Profile';
import PropTypes from 'prop-types';
import { globalData } from '@/app/layout';
import React, { useContext } from 'react';
import { LightMode, NightsStay } from '@mui/icons-material';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import NavItem from '../sidebar/NavItem';
import { uniqueId } from 'lodash';
import { usePathname } from 'next/navigation';

interface ItemType {
  toggleMobileSidebar:  (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({toggleMobileSidebar}: ItemType) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  const { darkMode, setDarkMode } = useContext<any>(globalData);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <NavItem
          key={uniqueId()}
          onClick={() => null}
          pathDirect={pathDirect}
          item={{
            icon: IconBellRinging,
            href: `/notifications`,
            title: `Notification(s)`,
          }}
        />
        
        {/* <Link className={`link hoverLink`} href={`/notifications`}>
          <IconButton
            size="medium"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
          >
            <Badge variant="dot" color="primary">
              <IconBellRinging size="21" stroke="1.5" />
            </Badge>
          </IconButton>
          Notification(s)
        </Link> */}

        <Box flexGrow={1} />

        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton
            size={`medium`}
            color={`inherit`}
            onClick={(e) => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              // <i className={`fas fa-sun`} style={{ color: `var(--main)`, fontSize: 21 }} />
              // <Brightness7 style={{ color: `var(--main)`, fontSize: 21 }} />
              <LightMode style={{ color: `var(--main)`, fontSize: 21 }} />
            ) : (
              // <i className={`fas fa-moon`} style={{ color: `var(--main)`, fontSize: 21 }} />
              // <Brightness4 style={{ color: `var(--main)`, fontSize: 21 }} />
              <NightsStay style={{ color: `var(--main)`, fontSize: 21 }} />
            )}
          </IconButton>
          <Button variant="contained" component={Link} href="/authentication/login" disableElevation color="primary">
            Login
          </Button>
          <Profile />
        </Stack>

      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;