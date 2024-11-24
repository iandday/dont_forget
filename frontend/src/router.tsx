import { createBrowserRouter, Navigate } from 'react-router-dom'

import GeneralError from './pages/errors/general-error.tsx'
import NotFoundError from './pages/errors/not-found-error.tsx'
import MaintenanceError from './pages/errors/maintenance-error.tsx'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import { useUserStore } from './store/user-store.ts'
import * as React from 'react'
import Settings from './pages/settings/index.tsx'
import Profile from './pages/profile/index.tsx'
import Index from './pages/index/index.tsx'
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useUserStore.getState().user?.accessToken
  return token ? <>{children}</> : <Navigate to='/sign-in' />
}

const router = createBrowserRouter([
  // Main routes
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell.tsx')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        path: '/sign-in',
        lazy: async () => ({
          Component: (await import('./pages/auth/sign-in.tsx')).default,
        }),
      },
      {
        path: '/sign-out',
        lazy: async () => ({
          Component: (await import('./pages/auth/sign-out.tsx')).default,
        }),
      },
      {
        path: '/sign-up',
        lazy: async () => ({
          Component: (await import('./pages/auth/sign-up.tsx')).default,
        }),
      },
      {
        path: '/forgot-password',
        lazy: async () => ({
          Component: (await import('./pages/auth/forgot-password.tsx')).default,
        }),
      },
      {
        path: 'terms',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'privacy',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        index: true,
        element: <ProtectedRoute>{<Index />}</ProtectedRoute>,
        // lazy: async () => ({
        //   Component: (await import('./pages/index/index.tsx')).default,
        // }),
      },
      {
        path: 'users',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'analysis',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'profile',
        element: <ProtectedRoute>{<Profile />}</ProtectedRoute>,
      },
      {
        path: 'settings',
        element: <ProtectedRoute>{<Settings />}</ProtectedRoute>,
        // lazy: async () => ({
        //   Component: (await import('./pages/settings/index.tsx')).default,
        // }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            path: 'appearance',
            lazy: async () => ({
              Component: (await import('./pages/settings/appearance/index.tsx'))
                .default,
            }),
          },
          {
            path: 'notifications',
            lazy: async () => ({
              Component: (
                await import('./pages/settings/notifications/index.tsx')
              ).default,
            }),
          },
          {
            path: 'display',
            lazy: async () => ({
              Component: (await import('./pages/settings/display/index.tsx'))
                .default,
            }),
          },
          {
            path: 'error-example',
            lazy: async () => ({
              Component: (
                await import('./pages/settings/error-example/index.tsx')
              ).default,
            }),
            errorElement: <GeneralError className='h-[50svh]' minimal />,
          },
        ],
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
