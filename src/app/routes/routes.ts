import { uniqueId } from 'lodash';
import { devEnv } from '../shared/library/common/constants';
import { IconBellRinging, IconLayoutDashboard, IconLogin, IconMailForward, IconSettings, IconUser, IconUserPlus, IconWorld } from '@tabler/icons-react';

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
    settings: {
        id: uniqueId(),
        title: `Settings`,
        href: `/settings`,
        icon: IconSettings,
    },
}