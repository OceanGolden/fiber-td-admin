import { useAtomValue } from 'jotai';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loading } from 'tdesign-react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routesAtom } from './atom/route_atom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const routes = useAtomValue(routesAtom);
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading fullscreen={true} />}>
        <RouterProvider
          router={createBrowserRouter(routes)}
          fallbackElement={<Loading />}
        />
      </Suspense>
      {/* <BrowserRouter>
        <PublicRoutes />
      </BrowserRouter> */}
    </QueryClientProvider>
  );
};

export default App;
