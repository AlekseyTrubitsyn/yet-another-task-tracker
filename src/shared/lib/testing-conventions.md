# Testing Conventions

This document outlines the testing conventions for the project.

## data-testid Attributes

All components and interactive elements must include `data-testid` attributes to facilitate testing.

### Rules

1. **Root Element**: The root element of every React component must have a `data-testid` attribute with the component name.
   ```tsx
   export function MyComponent() {
     return <div data-testid="MyComponent">{/* ... */}</div>;
   }
   ```

2. **Interactive Elements**: All interactive elements (buttons, inputs, checkboxes, etc.) must have a `data-testid` attribute with the element's tag name.

   **Examples:**
   ```tsx
   // Buttons
   <Button data-testid="button">Click me</Button>

   // Inputs
   <input type="text" data-testid="input" />
   <TextInput data-testid="input" />

   // Checkboxes
   <input type="checkbox" data-testid="checkbox" />
   <Checkbox data-testid="checkbox" />

   // Select dropdowns
   <select data-testid="select">...</select>
   <Select data-testid="select" />

   // Links/Anchors
   <a href="..." data-testid="anchor">Link</a>
   <Anchor data-testid="anchor">Link</Anchor>

   // Textareas
   <textarea data-testid="textarea"></textarea>
   <Textarea data-testid="textarea" />
   ```

3. **Multiple Elements of Same Type**: When there are multiple interactive elements of the same type, use more descriptive test IDs:
   ```tsx
   <Button data-testid="button-submit">Submit</Button>
   <Button data-testid="button-cancel">Cancel</Button>
   ```

## Component Structure

Every component should follow this structure for testability:

```tsx
import { SomeComponent } from '@mantine/core';

export function MyFeature() {
  return (
    <div data-testid="MyFeature">
      <SomeComponent data-testid="button" onClick={handleClick}>
        Action
      </SomeComponent>
    </div>
  );
}
```

## Testing with data-testid

Use the `data-testid` attributes in your tests:

```tsx
import { render } from '@test-utils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render', () => {
    const { getByTestId } = render(<MyComponent />);
    expect(getByTestId('MyComponent')).toBeInTheDocument();
  });

  it('should handle button click', () => {
    const { getByTestId } = render(<MyComponent />);
    const button = getByTestId('button');
    fireEvent.click(button);
    // assertions...
  });
});
```

## Why These Conventions?

1. **Consistency**: Using tag names for interactive elements provides a consistent pattern
2. **Maintainability**: Easy to remember and apply across the codebase
3. **Test Stability**: Decouples tests from implementation details like CSS classes or text content
4. **Component Identification**: Root element test IDs make it easy to verify component rendering
