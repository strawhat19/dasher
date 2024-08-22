'use client';

import Profile from './Profile';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { IconMenu } from '@tabler/icons-react';
import { GlobalDataContext } from '@/app/datashare';
import { Brightness7TwoTone, LightMode, LightModeTwoTone, NightsStay, NightsStayTwoTone, WbSunnyTwoTone } from '@mui/icons-material';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Tooltip } from '@mui/material';
import Logo from '@/app/components/logo/logo';

const Header = () => {
  const { 
    darkMode, setDarkMode, 
    isMobileSidebarOpen, setMobileSidebarOpen, 
  } = useContext<any>(GlobalDataContext);

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: `100%`,
    color: theme.palette.text.secondary,
  }));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: `none`,
    justifyContent: `center`,
    backdropFilter: `blur(4px)`,
    background: theme.palette.background.paper,
    [theme.breakpoints.up(`lg`)]: {
      minHeight: `70px`,
    },
  }));

  return (
    <AppBarStyled className={`header`} position={`sticky`} color={`default`}>
      <ToolbarStyled className={`headerToolbar`}>

        <Stack spacing={2} direction={`row`} alignItems={`center`}>
          <IconButton
            size={`medium`}
            color={`inherit`}
            aria-label="menu"
            className={`mobileMenuIconButton p0`}
            onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
            sx={{
              display: {
                lg: `none`,
                xs: `inline`,
              },
            }}
          >
            <IconMenu style={{ fontSize: 25, color: darkMode ? `var(--teal)` : `var(--main)` }} />
          </IconButton>

          <Box sx={{
              display: {
                lg: `none`,
                xs: `inline`,
              },
            }}>
              <Logo className={`mobileMenuLogo p0`} />
          </Box>
        </Stack>

        <Box flexGrow={1} />

        <Stack spacing={0} direction={`row`} alignItems={`center`}>
          <Tooltip title={`${darkMode ? `Light` : `Dark`} Mode`} arrow>  
            <IconButton
              size={`medium`}
              color={`inherit`}
              onClick={(e) => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <Brightness7TwoTone style={{ fontSize: 25, color: `var(--fontColor)` }} />
              ) : (
                <NightsStayTwoTone style={{ fontSize: 25, color: `var(--main)` }} />
              )}
            </IconButton>
          </Tooltip>
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