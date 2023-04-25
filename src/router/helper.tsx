import { RouteObject } from 'react-router-dom';

import { IMenuRecord } from '@/api/system/menu/types';
import { LoadablePage } from '@/components/lazy-component';
import PageLayout from '@/layouts/page-layout';
import ExceptionError from '@/pages/system/exception/error';

import RouterGuard from './guard';

export const generateRoutesFromMenus = (
  menus: IMenuRecord[],
): RouteObject[] => {
  const routes: RouteObject[] = [];
  if (menus) {
    menus.forEach((item) =>
      routes.push({
        path: item.path,
        id: item.id,
        element: item.component ? (
          <LoadablePage path={item.component} />
        ) : (
          <RouterGuard>
            <PageLayout />
          </RouterGuard>
        ),
        errorElement: <ExceptionError />,
        children: item.children
          ? [...generateRoutesFromMenus(item.children)]
          : undefined,
      }),
    );
  }

  return routes;
};
