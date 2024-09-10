import Link from 'next/link';
import NavItem from './NavItem';
import NavGroup from './NavGroup';
import { uniqueId } from 'lodash';
import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '@/app/components/logo/logo';
import { Box, Drawer, List } from '@mui/material';
import { SharedDatabase } from '@/app/shared/shared';
import { devEnv } from '@/app/shared/library/common/constants';
import { IconBellRinging, IconLayoutDashboard, IconLogin, IconMailForward, IconQuestionMark, IconSettings, IconUser, IconUserPlus, IconWorld } from '@tabler/icons-react';

export class NavOptions {
  sidebarWidth: any;
  isSidebarOpen: any;
  onSidebarClose: any;
  scrollbarStyles: any;
  largeScreenSize: any;
  anchor?: any = `left`;
  isMobileSidebarOpen: any;
  constructor(data: Partial<NavOptions>) {
    Object.assign(this, data);
  }
}

export const routes = {
  home: {
    href: `/`,
    id: uniqueId(),
    title: `Dashboard`,
    icon: IconLayoutDashboard,
  },
  about: {
    href: `/about`,
    id: uniqueId(),
    title: `About`,
    icon: IconUser,
  },
  contact: {
    id: uniqueId(),
    href: `/contact`,
    title: `Contact`,
    icon: IconMailForward,
  },
  signin: {
    auth: false,
    id: uniqueId(),
    href: `/signin`,
    icon: IconLogin,
    title: `Sign In`,
  },
  signup: {
    auth: false,
    id: uniqueId(),
    href: `/signup`,
    title: `Sign Up`,
    icon: IconUserPlus,
  },
  profile: {
    auth: !devEnv,
    id: uniqueId(),
    icon: IconUser,
    href: `/profile`,
    title: `Profile`,
  },
  notifications: {
    auth: !devEnv,
    id: uniqueId(),
    icon: IconBellRinging,
    href: `/notifications`,
    title: `Notification(s)`,
  },
  geodata: {
    id: uniqueId(),
    title: `GeoData`,
    href: `/geodata`,
    icon: IconWorld,
  },
  questions: {
    id: uniqueId(),
    title: `Questions`,
    href: `/questions`,
    icon: IconQuestionMark,
  },
  settings: {
    id: uniqueId(),
    title: `Settings`,
    href: `/settings`,
    icon: IconSettings,
  },
}

export const Links = [
  {
    navlabel: true,
    subheader: `Home`,
  },
  routes.home,
  {
    navlabel: true,
    subheader: `About`,
  },
  routes.about,
  routes.contact,
  {
    navlabel: true,
    subheader: `API's`,
  },
  routes.questions,
  routes.geodata,
  {
    navlabel: true,
    subheader: `Settings`,
  },
  routes.signin,
  routes.signup,
  routes.profile,
  routes.settings,
  routes.notifications,
];

export default function Nav({
  sidebarWidth,
  isSidebarOpen,
  onSidebarClose,
  anchor = `left`,
  scrollbarStyles,
  largeScreenSize,
  isMobileSidebarOpen,
}: NavOptions) {
  const pathname = usePathname();
  const pathDirect = pathname;

  let { user, setMobileSidebarOpen } = useContext<any>(SharedDatabase);

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
          <Box className={`sidebarItems`} sx={{ px: 3 }}>
            <List className={`sidebarNav`} component={`div`} sx={{ pt: 0 }}>
              {Links.filter((item: any) => item?.auth ? item?.auth == true ? user : false : true).map((item: any) => {
                if (item?.subheader) {
                  return <NavGroup item={item} key={item?.subheader} />;
                } else {
                  return (
                    <NavItem
                      item={item}
                      key={item.id}
                      pathDirect={pathDirect}
                      onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
                    />
                  );
                }
              })}
            </List>
          </Box>
        </div>
        <div className={`sidebarBottom w100 hideOnMobileS`} />
      </nav>
    </Drawer>
  )
}