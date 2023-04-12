import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Loading } from 'tdesign-react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} fallbackElement={<Loading />} />
  </QueryClientProvider>
);

export default App;
