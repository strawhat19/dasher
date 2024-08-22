import Link from 'next/link';
import { pages } from '../../../../../server';
import React, { useContext, useState } from 'react';
import { SettingsTwoTone } from '@mui/icons-material';
import { GlobalDataContext } from '@/app/datashare';
import { IconListCheck, IconMail, IconUser } from '@tabler/icons-react';
import { Box, Menu, Button, IconButton, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';

const Profile = () => {
  let { user, darkMode } = useContext<any>(GlobalDataContext);
  const [anchorEl2, setAnchorEl2] = useState(null);

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
          size="medium"
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
          <SettingsTwoTone style={{ color: darkMode ? `var(--fontColor)` : `var(--main)`, fontSize: 27 }} />
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
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
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

export default Profile;