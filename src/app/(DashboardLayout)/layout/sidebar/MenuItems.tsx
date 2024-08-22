import { uniqueId } from 'lodash';
import { pages } from '../../../../../server';
import { PublicOutlined } from '@mui/icons-material';
import { IconBellRinging, IconLayoutDashboard, IconLogin, IconUserPlus } from '@tabler/icons-react';

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
];

export default Menuitems;