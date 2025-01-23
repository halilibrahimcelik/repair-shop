import { MOCK_CUSTOMERS } from '@/__mocks__/mock-data';
import { screen, render } from '../../../lib/test-util';
import CustomerTable from '../CustomerTable';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));
jest.mock('@/lib/get-customers', () => ({
  useGetAllCustomers: () => ({
    data: MOCK_CUSTOMERS,
    isFetching: false,
  }),
  useGetSearchedCustomers: () => ({
    data: MOCK_CUSTOMERS,
    isFetching: false,
  }),
}));

describe('CustomerTable test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should render Customers properly', async () => {
    // Dynamically mock the hooks for this test
    render(<CustomerTable isAllCustomers={true} />);

    // Check if the mock customer data is rendered
    const firstCustomer = await screen.findByText(/John Doe/i);
    const secondCustomer = await screen.findByText(/Jane Max/i);
    screen.debug();
    expect(firstCustomer).toBeInTheDocument();
    expect(secondCustomer).toBeInTheDocument();
  });
});
