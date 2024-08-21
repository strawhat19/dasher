import { uniqueId } from 'lodash';
import { pages } from '../../../../../server';
import { IconLayoutDashboard, IconLogin, IconUserPlus } from '@tabler/icons-react';

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
    subheader: `Auth`,
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
];

export default Menuitems;