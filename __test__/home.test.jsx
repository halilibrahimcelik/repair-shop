import Home from '@/app/page';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, jest } from '@jest/globals';

describe('Home Page', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it('triggers a phone call when the phone link is clicked', () => {
    render(<Home />);

    const phoneLink = screen.getByRole('link', { name: /5555 444 333/i });
    // Mock window.location behavior if needed
    const locationSpy = jest.spyOn(window, 'location', 'get');
    expect(locationSpy).not.toHaveBeenCalled();

    fireEvent.click(phoneLink);
  });
});
