import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { handleUnauthorized } from '../lib/handle-unauthorized';

import type { ReactNode } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: handleUnauthorized,
  }),
});

export const AppProviders = ({
  children,
}: {
  readonly children: ReactNode;
}) => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  </Router>
);
