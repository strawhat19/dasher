import Settings from './Profile';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { IconMenu } from '@tabler/icons-react';
import { GlobalDataContext } from '@/app/datashare';
import { Brightness7TwoTone, NightsStayTwoTone } from '@mui/icons-material';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Tooltip, Button, useMediaQuery } from '@mui/material';

const Header = () => {
  const largeScreenSize = useMediaQuery((theme: any) => theme.breakpoints.up(`lg`));

  const { 
    pageTitle,
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
            aria-label={`menu`}
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

          <Box className={`mobileMenuLogo p0`} sx={{
              display: {
                lg: `inline`,
                xs: `inline`,
              },
            }}
          >
            {pageTitle}
          </Box>

        </Stack>

        <Box flexGrow={1} />

        <Stack className={`headerToolBarRight`} spacing={2} direction={`row`} alignItems={`center`}>
          <Tooltip title={`${darkMode ? `Light` : `Dark`} Mode`} arrow>
            {largeScreenSize ? (
              <Button size={`large`} onClick={(e) => setDarkMode(!darkMode)} startIcon={darkMode ? <Brightness7TwoTone /> : <NightsStayTwoTone />}>
                {`${darkMode ? `Light` : `Dark`} Mode`}
              </Button>
            ) : (
              <IconButton size={`small`} onClick={(e) => setDarkMode(!darkMode)}>
                {darkMode ? <Brightness7TwoTone /> : <NightsStayTwoTone />}
              </IconButton>
            )}
          </Tooltip>
          <Settings />
        </Stack>

      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;