import { Upgrade } from "./Updrade";
import SidebarItems from "./SidebarItems";
import { logo } from "../../../../../server";
import { Sidebar, Logo } from 'react-mui-sidebar';
import { useMediaQuery, Box, Drawer } from "@mui/material";

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
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
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
          <Box
            sx={{
              height: `100%`,
            }}
          >
            <Sidebar 
              width={`270px`} 
              showProfile={false} 
              open={isSidebarOpen} 
              themeColor={`#5d87ff`} 
              collapsewidth={`80px`} 
              themeSecondaryColor={`#49beff`}
            >
              <Logo img={`/images/logos/${logo}`} />
              <Box>
                <SidebarItems />
                <Upgrade />
              </Box>
            </Sidebar >
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
      <Box px={2}>
        <Sidebar
          width={'270px'}
          collapsewidth="80px"
          isCollapse={false}
          mode="light"
          direction="ltr"
          themeColor="#5d87ff"
          themeSecondaryColor="#49beff"
          showProfile={false}
        >
          <Logo img={`/images/logos/${logo}`} />
          <SidebarItems />
          <Upgrade />
        </Sidebar>
      </Box>
    </Drawer>
  );
};

export default MSidebar;