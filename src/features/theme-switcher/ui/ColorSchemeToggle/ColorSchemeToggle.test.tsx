import { render } from '@test-utils';
import { ColorSchemeToggle } from './index';

describe('ColorSchemeToggle', () => {
  it('should render the component', () => {
    const { getByTestId } = render(<ColorSchemeToggle />);
    expect(getByTestId('ColorSchemeToggle')).toBeInTheDocument();
  });

  it('should render all theme toggle buttons', () => {
    const { getAllByTestId } = render(<ColorSchemeToggle />);
    const buttons = getAllByTestId('button');
    expect(buttons).toHaveLength(3);
  });

  it('should have correct button labels', () => {
    const { getByText } = render(<ColorSchemeToggle />);
    expect(getByText('Light')).toBeInTheDocument();
    expect(getByText('Dark')).toBeInTheDocument();
    expect(getByText('Auto')).toBeInTheDocument();
  });
});
