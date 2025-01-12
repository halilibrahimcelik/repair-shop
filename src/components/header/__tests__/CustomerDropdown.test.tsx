import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomersDropdown from '../CustomersDropdown';
import { ROUTES } from '@/types/default';

describe('CustomersDropdown', () => {
  it('renders the customers menu button', () => {
    render(<CustomersDropdown />);
    const menuButton = screen.getByTestId('customers-menu-button');
    expect(menuButton).toBeInTheDocument();
  });

  it('opens dropdown menu when clicking the button', async () => {
    render(<CustomersDropdown />);
    const user = userEvent.setup();
    const menuButton = screen.getByTestId('customers-menu-button');

    await user.click(menuButton);

    // Using document.body since shadcn portals the dropdown to body
    const dropdown = within(document.body).getByTestId('customers-dropdown');
    expect(dropdown).toBeInTheDocument();
  });

  it('contains correct links with proper routes', async () => {
    render(<CustomersDropdown />);
    const user = userEvent.setup();
    const menuButton = screen.getByTestId('customers-menu-button');

    await user.click(menuButton);

    // Search within document.body
    const dropdown = within(document.body);
    const customersLink = dropdown.getByText('Customers');
    const newCustomerLink = dropdown.getByText('New Customer');

    expect(customersLink.closest('a')).toHaveAttribute(
      'href',
      `${ROUTES.CUSTOMERS}?allCustomers=true`
    );
    expect(newCustomerLink.closest('a')).toHaveAttribute(
      'href',
      ROUTES.ADD_CUSTOMER
    );
  });

  it('closes dropdown when selecting an option', async () => {
    render(<CustomersDropdown />);
    const user = userEvent.setup();
    const menuButton = screen.getByTestId('customers-menu-button');

    // Open dropdown
    await user.click(menuButton);
    const dropdown = within(document.body).getByTestId('customers-dropdown');
    expect(dropdown).toBeInTheDocument();

    // Click a menu item
    const customersLink = within(document.body).getByText('Customers');
    await user.click(customersLink);

    // Verify dropdown is closed
    expect(
      within(document.body).queryByTestId('customers-dropdown')
    ).not.toBeInTheDocument();
  });
});
