import { screen, render } from '../../../lib/test-util';
import CustomerTable from '../CustomerTable';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('CustomerTable test  suite', () => {
  test('should render CustomerTable component', () => {
    render(<CustomerTable isAllCustomers={false} />);
    screen.debug();
  });
});
