import { Navigate, RouteObject } from 'react-router-dom';

import ProtectedRoute from '@/components/protected-route';
import PageLayout from '@/layouts/page-layout';
import Login from '@/pages/auth/login';
import Exception404 from '@/pages/system/exception/404';
import Home from '@/pages/system/home';

import { LoadablePage } from '../components/lazy-component/index';

import type { IMenuRecord } from '@/api/system/menu/types';

export const generateRoutesFromMenus = (
  menus: IMenuRecord[],
): RouteObject[] => {
  const routes: RouteObject[] = [];
  menus.map((item) =>
    routes.push({
      path: item.path,
      id: item.id,
      element: item.component ? (
        <LoadablePage path={item.component} />
      ) : (
        <PageLayout />
      ),
      children: item.children
        ? [...generateRoutesFromMenus(item.children)]
        : undefined,
    }),
  );
  return routes;
};

export const defaultRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/home'} replace={true} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home/*',
    element: (
      <ProtectedRoute>
        <PageLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <Exception404 />,
  },
];
