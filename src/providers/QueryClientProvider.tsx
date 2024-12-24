'use client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from '@tanstack/react-query';
import { toast } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 6,
      refetchOnWindowFocus: true,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toast('An error occurred: ' + error.message);
    },
  }),
});

export const QueryProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
