//https://github.com/satnaing/shadcn-admin

import {
  IconApps,
  IconBarrierBlock,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconLayoutDashboard,
  IconMessages,
  IconRouteAltLeft,
  IconServerOff,
  IconSettings,
  IconTruck,
  IconUserShield,
  IconUsers,
  IconLock,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Users',
    label: '',
    href: '/users',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'Manage Data',
    label: '10',
    href: '/data',
    icon: <IconRouteAltLeft size={18} />,
    sub: [
      {
        title: 'Listgroups',
        label: '9',
        href: '/trucks',
        icon: <IconTruck size={18} />,
      },
      {
        title: 'Categories',
        label: '',
        href: '/categories',
        icon: <IconBoxSeam size={18} />,
      },
      {
        title: 'Items',
        label: '',
        href: '/items',
        icon: <IconBoxSeam size={18} />,
      },
      {
        title: 'Units of Measure',
        label: '',
        href: '/uom',
        icon: <IconBoxSeam size={18} />,
      },
    ],
  },
  // {
  //   title: 'Analysis',
  //   label: '',
  //   href: '/analysis',
  //   icon: <IconChartHistogram size={18} />,
  // },

  // {
  //   title: 'Error Pages',
  //   label: '',
  //   href: '',
  //   icon: <IconExclamationCircle size={18} />,
  //   sub: [
  //     {
  //       title: 'Not Found',
  //       label: '',
  //       href: '/404',
  //       icon: <IconError404 size={18} />,
  //     },
  //     {
  //       title: 'Internal Server Error',
  //       label: '',
  //       href: '/500',
  //       icon: <IconServerOff size={18} />,
  //     },
  //     {
  //       title: 'Maintenance Error',
  //       label: '',
  //       href: '/503',
  //       icon: <IconBarrierBlock size={18} />,
  //     },
  //     {
  //       title: 'Unauthorised Error',
  //       label: '',
  //       href: '/401',
  //       icon: <IconLock size={18} />,
  //     },
  //   ],
  // },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
  {
    title: 'Sign In (email + password)',
    label: '',
    href: '/sign-in',
    icon: <IconHexagonNumber1 size={18} />,
  },
  {
    title: 'Sign Up',
    label: '',
    href: '/sign-up',
    icon: <IconHexagonNumber3 size={18} />,
  },
  {
    title: 'Forgot Password',
    label: '',
    href: '/forgot-password',
    icon: <IconHexagonNumber4 size={18} />,
  },
]
