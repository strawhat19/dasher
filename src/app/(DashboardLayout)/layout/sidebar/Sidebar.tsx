import Link from 'next/link';
import SidebarItems from './SidebarItems';
import Logo from '@/app/components/logo/logo';
import { useMediaQuery, Box, Drawer } from '@mui/material';

interface ItemType {
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
}

const MSidebar = ({
  isSidebarOpen,
  onSidebarClose,
  isMobileSidebarOpen,
}: ItemType) => {
  const largeScreenSize = useMediaQuery((theme: any) => theme.breakpoints.up(`lg`));
  const sidebarWidth = 200;
  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: `7px`,

    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `#eff2f7`,
      borderRadius: `15px`,
    },
  };

  if (largeScreenSize) {
    return (
      <Box className={`sidebar drawerContainer`}
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer className={`drawer sidebarDrawer`}
          anchor={`left`}
          open={isSidebarOpen}
          variant={`permanent`}
          PaperProps={{
            className: `sidebarPaper`,
            sx: {
              width: sidebarWidth - 1,
              boxSizing: `border-box`,
              ...scrollbarStyles,
            },
          }}
        >
          <Box className={`sidebarContainer spaceBetween gap15 flex column`} sx={{ height: `100%` }}>
            <div className={`sidebarTop w100`}>
              <Link href={`/`} className={`link`}>
                <Logo className={`sidebarLogoContainer`} />
              </Link>
              <SidebarItems />
            </div>
            <div className={`sidebarBottom w100`} />
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer className={`sidebar drawer mobileMenuDrawer`}
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        className: `mobileMenuPaper`,
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      <Box className={`h100`} px={2}>
        <Box className={`sidebarContainer spaceBetween gap15 flex column h100`}>
          <div style={{ marginTop: 15 }} className={`sidebarTop w100`}>
            <Link href={`/`} className={`link`}>
              <Logo className={`sidebarLogoContainer`} />
            </Link>
            <SidebarItems />
          </div>
          <div className={`sidebarBottom w100`} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default MSidebar;