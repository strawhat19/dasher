'use client';

import Profile from './Profile';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import NavItem from '../sidebar/NavItem';
import React, { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { GlobalDataContext } from '@/app/datashare';
import { LightMode, NightsStay } from '@mui/icons-material';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton } from '@mui/material';

const Header = () => {
  const pathname = usePathname();
  const pathDirect = pathname;

  const { darkMode, setDarkMode, setMobileSidebarOpen, isMobileSidebarOpen } = useContext<any>(GlobalDataContext);

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
          onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
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

        <Box flexGrow={1} />

        <Stack spacing={0} direction="row" alignItems="center">
          <IconButton
            size={`medium`}
            color={`inherit`}
            onClick={(e) => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <LightMode style={{ color: `var(--teal)`, fontSize: 30 }} />
            ) : (
              <NightsStay style={{ color: `var(--main)`, fontSize: 30 }} />
            )}
          </IconButton>
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