'use client';

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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
