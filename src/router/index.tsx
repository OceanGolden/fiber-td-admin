import { useAtomValue } from 'jotai';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loading } from 'tdesign-react';

import { routesAtom } from '@/atom/route_atom';

const Router = () => {
  const routes = useAtomValue(routesAtom);
  return (
    <Suspense fallback={<Loading fullscreen={true} />}>
      <RouterProvider
        router={createBrowserRouter(routes)}
        fallbackElement={<Loading />}
      />
    </Suspense>
  );
};

export default Router;
