import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeSwitch from '../DarkModeSwitch';
import { useTheme } from 'next-themes';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('DarkModeSwitch', () => {
  // Mock implementation of setTheme
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTheme as jest.Mock).mockImplementation(() => ({
      setTheme: mockSetTheme,
    }));
  });

  it('should toggle theme when switch is clicked', () => {
    render(<DarkModeSwitch />);

    const switchElement = screen.getByRole('switch');

    fireEvent.click(switchElement);
    expect(mockSetTheme).toHaveBeenCalledTimes(1);

    // Second click
    fireEvent.click(switchElement);
    expect(mockSetTheme).toHaveBeenCalledTimes(2);
  });

  it('should switch from dark to light theme', () => {
    // Mock the current theme as 'dark'
    (useTheme as jest.Mock).mockImplementation(() => ({
      setTheme: mockSetTheme,
      theme: 'dark',
    }));

    render(<DarkModeSwitch />);

    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);

    // Verify that setTheme was called with the correct theme
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('should switch from light to dark theme', () => {
    // Mock the current theme as 'light'
    (useTheme as jest.Mock).mockImplementation(() => ({
      setTheme: mockSetTheme,
      theme: 'light',
    }));

    render(<DarkModeSwitch />);

    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);

    // Verify that setTheme was called with the correct theme
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
