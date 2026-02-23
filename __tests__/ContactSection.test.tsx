import { render, screen, fireEvent } from '@testing-library/react';
import ContactSection from '../src/components/ContactSection';

describe('ContactSection', () => {
  it('renders form fields and button', () => {
    render(<ContactSection />);
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/requirement/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/Send Requirement/i);
  });

  it('shows validation errors when submitted empty', async () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByRole('button'));
    expect(await screen.findAllByText(/required/i)).toHaveLength(3);
  });
});