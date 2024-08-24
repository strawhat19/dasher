import Link from 'next/link';
import { pages } from '../sidebar/MenuItems';
import React, { useContext, useState } from 'react';
import { GlobalDataContext } from '@/app/datashare';
import { SettingsOutlined, SettingsTwoTone } from '@mui/icons-material';
import { IconListCheck, IconMail, IconUser } from '@tabler/icons-react';
import { Box, Menu, Button, IconButton, MenuItem, ListItemIcon, ListItemText, Tooltip, useMediaQuery } from '@mui/material';
import Slashes from '@/app/components/slashes/slashes';

const Settings = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  let { user, darkMode } = useContext<any>(GlobalDataContext);
  const largeScreenSize = useMediaQuery((theme: any) => theme.breakpoints.up(`lg`));

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box className={`profileOptionsContainer`}>
      <Tooltip title={`Settings`} arrow>
        <IconButton
          size={largeScreenSize ? `medium` : `small`}
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === "object" && {
              color: "primary.main",
            }),
          }}
          onClick={handleClick2}
        >
          <SettingsTwoTone style={{ color: darkMode ? `var(--fontColor)` : `var(--main)`, fontSize: largeScreenSize ? 27 : 25 }} />
        </IconButton>
      </Tooltip>

      <Menu
        keepMounted
        id={`msgs-menu`}
        anchorEl={anchorEl2}
        onClose={handleClose2}
        open={Boolean(anchorEl2)}
        className={`profileMenu`}
        anchorOrigin={{ horizontal: `right`, vertical: `bottom` }}
        transformOrigin={{ horizontal: `right`, vertical: `top` }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <SettingsOutlined style={{ fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText>General <Slashes /> Settings</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>Account <Slashes /> Profile</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            className={`loginLogoutButton`}
            href={pages.signin.link}
            variant={`outlined`}
            color={`primary`}
            component={Link}
            fullWidth
          >
            {user ? pages.signout.title : pages.signin.title}
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Settings;