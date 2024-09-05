import Link from 'next/link';
import { Drawer } from '@mui/material';
import Logo from '@/app/components/logo/logo';
import SidebarItems from '../../layout/sidebar/SidebarItems';

type NavOptions = {
    anchor?: any;
    sidebarWidth: any;
    isSidebarOpen: any;
    onSidebarClose: any;
    scrollbarStyles: any;
    largeScreenSize: any;
    isMobileSidebarOpen: any;
}

export default function Nav({
    sidebarWidth,
    isSidebarOpen,
    onSidebarClose,
    scrollbarStyles,
    largeScreenSize,
    anchor = `left`,
    isMobileSidebarOpen,
}: NavOptions) {
    return (
      <Drawer 
        anchor={anchor}
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
          <div className={`sidebarBottom w100 hideOnMobileS`} />
        </nav>
      </Drawer>
    )
}