import Link from 'next/link';
import { Upgrade } from './Updrade';
import { Logo } from 'react-mui-sidebar';
import SidebarItems from './SidebarItems';
import { logo } from '../../../../../server';
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
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up(`lg`));
  const sidebarWidth = `270px`;
  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: `7px`,

    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `#eff2f7`,
      borderRadius: `15px`,
    },
  };

  if (lgUp) {
    return (
      <Box className={`drawerContainer`}
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer className={`drawer`}
          anchor={`left`}
          open={isSidebarOpen}
          variant={`permanent`}
          PaperProps={{
            sx: {
              boxSizing: `border-box`,
              ...scrollbarStyles,
            },
          }}
        >
          <Box className={`sidebarContainer spaceBetween gap15 flex column`} sx={{ height: `100%` }}>
            <div className={`sidebarTop w100`}>
              <Link href={`/`}>
                <Logo img={`/images/logos/${logo}`} />
              </Link>
              <SidebarItems />
            </div>
            <div className={`sidebarBottom w100`}>
              <Upgrade />
            </div>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      <Box className={`h100`} px={2}>
        <Box className={`sidebarContainer spaceBetween gap15 flex column h100`}>
          <div style={{ marginTop: 15 }} className={`sidebarTop w100`}>
            <Link href={`/`}>
              <Logo img={`/images/logos/${logo}`} />
            </Link>
            <SidebarItems />
          </div>
          <div className={`sidebarBottom w100`}>
            <Upgrade />
          </div>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MSidebar;