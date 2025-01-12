import React from 'react';
export * from '@testing-library/react';
import { render as defaultRender } from '@testing-library/react';
import { NextRouter } from 'next/router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
type DefaultParams = Parameters<typeof defaultRender>;
type RenderUI = DefaultParams[0];
type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> };
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export function render(
  ui: RenderUI,
  { wrapper, router, ...options }: RenderOptions = {}
) {
  if (!wrapper) {
    wrapper = ({ children }) => (
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        <AllTheProviders>{children}</AllTheProviders>
      </RouterContext.Provider>
    );
  }

  return defaultRender(ui, { wrapper, ...options });
}

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isPreview: true,
  isReady: true,
  forward: jest.fn(),
};
