import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { jest } from '@jest/globals';

// Mock the next/link component
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'Link';
  return MockLink;
});

// Mock the kinde-auth logout link
jest.mock('@kinde-oss/kinde-auth-nextjs/components', () => ({
  LogoutLink: ({ children }: { children: React.ReactNode }) => {
    const MockLogoutLink = () => <button>{children}</button>;
    MockLogoutLink.displayName = 'LogoutLink';
    return MockLogoutLink;
  },
}));

// Mock the CustomersDropdown component
jest.mock('../CustomersDropdown', () => {
  const MockCustomersDropdown = () => (
    <div data-testid='customers-dropdown'>Customers Dropdown</div>
  );
  MockCustomersDropdown.displayName = 'CustomersDropdown';
  return MockCustomersDropdown;
});

describe('Header', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockUser: KindeUser<Record<string, any>> = {
    given_name: 'John',
    family_name: 'Doe',
    picture: 'https://example.com/avatar.jpg',
    email: 'john@example.com',
    id: '123',
  };

  test('renders header with user information', () => {
    render(<Header user={mockUser} />);

    // Check if main elements are present
    expect(screen.getByText('Computer Repair Shop')).toBeInTheDocument();
    expect(screen.getByTitle('logout')).toBeInTheDocument();
  });
});
