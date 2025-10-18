import { render } from '@test-utils';
import { fireEvent, waitFor } from '@testing-library/react';
import { ExampleForm } from './index';

describe('ExampleForm', () => {
  it('should render the form', () => {
    const { getByTestId } = render(<ExampleForm />);
    expect(getByTestId('ExampleForm')).toBeInTheDocument();
  });

  it('should render all input fields', () => {
    const { getByTestId } = render(<ExampleForm />);
    expect(getByTestId('input-email')).toBeInTheDocument();
    expect(getByTestId('input-username')).toBeInTheDocument();
    expect(getByTestId('input-password')).toBeInTheDocument();
  });

  it('should validate email format', async () => {
    const { getByTestId, getByText } = render(<ExampleForm />);

    const emailInput = getByTestId('input-email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('should validate username length', async () => {
    const { getByTestId, getByText } = render(<ExampleForm />);

    const usernameInput = getByTestId('input-username');
    fireEvent.change(usernameInput, { target: { value: 'ab' } });
    fireEvent.blur(usernameInput);

    await waitFor(() => {
      expect(getByText('Username must be at least 3 characters')).toBeInTheDocument();
    });
  });

  it('should validate username format', async () => {
    const { getByTestId, getByText } = render(<ExampleForm />);

    const usernameInput = getByTestId('input-username');
    fireEvent.change(usernameInput, { target: { value: 'invalid user!' } });
    fireEvent.blur(usernameInput);

    await waitFor(() => {
      expect(
        getByText('Username can only contain letters, numbers, and underscores')
      ).toBeInTheDocument();
    });
  });

  it('should validate password strength', async () => {
    const { getByTestId, getByText } = render(<ExampleForm />);

    const passwordInput = getByTestId('input-password');
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
  });

  it('should submit valid data', async () => {
    const onSubmit = vi.fn();
    const { getByTestId } = render(<ExampleForm onSubmit={onSubmit} />);

    // Fill in valid data
    fireEvent.change(getByTestId('input-email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByTestId('input-username'), {
      target: { value: 'validuser123' },
    });
    fireEvent.change(getByTestId('input-password'), {
      target: { value: 'ValidPass123' },
    });

    // Submit form
    fireEvent.click(getByTestId('button-submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        username: 'validuser123',
        password: 'ValidPass123',
      });
    });
  });

  it('should not submit with invalid data', async () => {
    const onSubmit = vi.fn();
    const { getByTestId } = render(<ExampleForm onSubmit={onSubmit} />);

    // Fill in invalid data
    fireEvent.change(getByTestId('input-email'), {
      target: { value: 'invalid' },
    });

    // Submit form
    fireEvent.click(getByTestId('button-submit'));

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
