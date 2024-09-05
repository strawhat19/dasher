import Nav from '../../components/nav/nav';
import { useMediaQuery, Box } from '@mui/material';

interface ItemType {
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function Sidebar({
  isSidebarOpen,
  onSidebarClose,
  isMobileSidebarOpen,
}: ItemType) {
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

  const getNav = () => (
    <Nav 
      sidebarWidth={sidebarWidth} 
      isSidebarOpen={isSidebarOpen} 
      onSidebarClose={onSidebarClose} 
      scrollbarStyles={scrollbarStyles}
      largeScreenSize={largeScreenSize} 
      isMobileSidebarOpen={isMobileSidebarOpen} 
    />
  )

  return (
    <aside className={`sidebar`}>
      {largeScreenSize ? (
        <Box className={`drawerContainer`} sx={{ width: sidebarWidth, flexShrink: 0 }}>
          {getNav()}
        </Box>
      ) : getNav()}
    </aside>
  );
}