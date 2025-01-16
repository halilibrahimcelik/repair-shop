import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    forceSwcTransforms: true,
  },
};

export default withSentryConfig(nextConfig, {
  org: 'academiatech',
  project: 'repair-shop',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  debug: true,
  automaticVercelMonitors: true,
  reactComponentAnnotation: {
    enabled: process.env.NODE_ENV === 'development',
  },
});
