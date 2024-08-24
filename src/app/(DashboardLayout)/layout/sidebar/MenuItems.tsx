import { uniqueId } from 'lodash';
import { PublicOutlined } from '@mui/icons-material';
import { IconBellRinging, IconLayoutDashboard, IconLogin, IconUserPlus } from '@tabler/icons-react';

export const pages = {
  home: {
    link: `/`,
    title: `Dashboard`,
  },
  signin: {
    link: `/signin`,
    title: `Sign In`,
  },
  signup: {
    link: `/signup`,
    title: `Sign Up`,
  },
  signout: {
    link: `/signout`,
    title: `Sign Out`,
  },
  notifications: {
    link: `/notifications`,
    title: `Notification(s)`,
  },
  geodata: {
    link: `/geodata`,
    title: `GeoData`,
  },
}

const Menuitems = [
  {
    navlabel: true,
    subheader: `Home`,
  },
  {
    href: `/`,
    id: uniqueId(),
    title: `Dashboard`,
    icon: IconLayoutDashboard,
  },
  {
    navlabel: true,
    subheader: `API's`,
  },
  {
    id: uniqueId(),
    icon: PublicOutlined,
    href: pages.geodata.link,
    title: pages.geodata.title,
  },
  {
    navlabel: true,
    subheader: `User`,
  },
  {
    id: uniqueId(),
    icon: IconLogin,
    href: pages.signin.link,
    title: pages.signin.title,
  },
  {
    id: uniqueId(),
    icon: IconUserPlus,
    href: pages.signup.link,
    title: pages.signup.title,
  },
  {
    id: uniqueId(),
    hideOnNoUser: true,
    icon: IconBellRinging,
    href: pages.notifications.link,
    title: pages.notifications.title,
  },
];

export default Menuitems;