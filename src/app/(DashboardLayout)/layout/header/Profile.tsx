import Link from 'next/link';
import React, { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { IconListCheck, IconMail, IconUser } from '@tabler/icons-react';
import { Box, Menu, Button, IconButton, MenuItem, ListItemIcon, ListItemText } from '@mui/material';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box className={`profileOptionsContainer`}>
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
        <AccountCircle style={{ fontSize: 35 }} />
      </IconButton>

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
            href={`/authentication/login`}
            variant={`outlined`}
            color={`primary`}
            component={Link}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;