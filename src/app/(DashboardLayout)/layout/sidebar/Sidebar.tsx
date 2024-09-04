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

  const Nav = () => {
    return (
      <Drawer 
        anchor={`left`}
        variant={largeScreenSize ? `permanent` : `temporary`}
        onClose={largeScreenSize ? undefined : onSidebarClose}
        open={largeScreenSize ? isSidebarOpen : isMobileSidebarOpen}
        className={`drawer ${largeScreenSize ? `` : `sidebarDrawer mobileMenuDrawer`}`}
        PaperProps={{
          className: largeScreenSize ? `sidebarPaper` : `mobileMenuPaper`,
          sx: {
            ...(largeScreenSize ? {
              width: sidebarWidth - 1,
              boxSizing: `border-box`,
            } : {
              boxShadow: (theme) => theme.shadows[8],
            }),
            ...scrollbarStyles,
          },
        }}
      >
        <nav className={`sidebarContainer spaceBetween h100 gap15 flex column`}>
          <div className={`sidebarTop w100 ${largeScreenSize ? `` : `m15t`}`}>
            <Link href={`/`} className={`link`}>
              <Logo className={`sidebarLogoContainer`} />
            </Link>
            <SidebarItems />
          </div>
          <div className={`sidebarBottom w100`} />
        </nav>
      </Drawer>
    )
  }

  if (largeScreenSize) {
    return (
      <aside className={`sidebar`}>
        <Box className={`drawerContainer`} sx={{ width: sidebarWidth, flexShrink: 0 }}>
          <Nav />
        </Box>
      </aside>
    );
  }

  return (
    <aside className={`sidebar`}>
      <Nav />
    </aside>
  );
}

export default MSidebar;