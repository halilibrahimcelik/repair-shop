import React from 'react';
export * from '@testing-library/react';
import { render as defaultRender } from '@testing-library/react';
import { NextRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

// Define the type for render options
type DefaultParams = Parameters<typeof defaultRender>;
type RenderUI = DefaultParams[0];
type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> };

// Create a QueryClient instance
const queryClient = new QueryClient();

// Mock Next.js router
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

// Custom render function
export function render(
  ui: RenderUI,
  { router, ...options }: RenderOptions = {}
) {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RouterContext.Provider value={{ ...mockRouter, ...router }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RouterContext.Provider>
  );

  return defaultRender(ui, { wrapper, ...options });
}
