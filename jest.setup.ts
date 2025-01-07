import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { beforeAll, jest } from '@jest/globals';

beforeAll(() => {
  jest.mock('nextjs-toploader/app', () => ({
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
      isFallback: false,
      basePath: '',
      locale: undefined,
      locales: undefined,
      defaultLocale: undefined,
      isReady: true,
      isPreview: false,
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }),
  }));
});
