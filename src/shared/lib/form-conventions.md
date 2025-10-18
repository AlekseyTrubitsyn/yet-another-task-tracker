# Form Conventions

This document outlines the form handling and validation conventions for the project.

## Form Libraries

All forms in this project must use:
- **[react-hook-form](https://react-hook-form.com/)** - Form state management and validation
- **[zod](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integration between react-hook-form and zod

## Why These Libraries?

1. **Type Safety**: Zod provides runtime validation with TypeScript type inference
2. **Performance**: react-hook-form minimizes re-renders
3. **Developer Experience**: Declarative schema-based validation
4. **Bundle Size**: Lightweight compared to alternatives
5. **Integration**: Works seamlessly with Mantine UI components

## Form Structure

### Basic Form Pattern

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextInput, Button } from '@mantine/core';

// 1. Define validation schema
const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// 2. Infer TypeScript type from schema
type FormData = z.infer<typeof schema>;

// 3. Create form component
export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="LoginForm">
      <TextInput
        label="Email"
        {...register('email')}
        error={errors.email?.message}
        data-testid="input"
      />
      <TextInput
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
        data-testid="input"
      />
      <Button type="submit" loading={isSubmitting} data-testid="button">
        Submit
      </Button>
    </form>
  );
}
```

## Advanced Patterns

### Complex Validation

```tsx
const schema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  email: z.string().email('Invalid email address'),

  age: z
    .number()
    .min(18, 'Must be at least 18 years old')
    .max(120, 'Invalid age'),

  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
```

### Nested Objects

```tsx
const schema = z.object({
  user: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
  }),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    zipCode: z.string().regex(/^\d{5}$/, 'Invalid ZIP code'),
  }),
});

// Access nested fields
<TextInput
  label="First Name"
  {...register('user.firstName')}
  error={errors.user?.firstName?.message}
/>
```

### Arrays

```tsx
const schema = z.object({
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  items: z.array(
    z.object({
      name: z.string().min(1),
      quantity: z.number().min(1),
    })
  ),
});

// Use with useFieldArray
const { fields, append, remove } = useFieldArray({
  control,
  name: 'items',
});
```

### Optional Fields

```tsx
const schema = z.object({
  required: z.string().min(1, 'This field is required'),
  optional: z.string().optional(),
  nullable: z.string().nullable(),
  withDefault: z.string().default('default value'),
});
```

## Working with Mantine Components

### Controller for Complex Components

For complex components like Select, DatePicker, etc., use `Controller`:

```tsx
import { Controller } from 'react-hook-form';
import { Select } from '@mantine/core';

<Controller
  name="country"
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      label="Country"
      data={['USA', 'Canada', 'UK']}
      error={errors.country?.message}
      data-testid="select"
    />
  )}
/>
```

## Form Organization

### Where to Place Forms

Following FSD architecture:

- **features/** - Feature-specific forms (e.g., `features/auth/ui/LoginForm.tsx`)
- **widgets/** - Complex form widgets with multiple sections
- **shared/ui/** - Reusable form components (e.g., custom inputs)

### Schema Organization

Place validation schemas near the form component:

```
features/
  auth/
    ui/
      LoginForm.tsx
      LoginForm.schema.ts  # Or inline in LoginForm.tsx
    index.ts
```

Or for shared schemas:

```
shared/
  lib/
    validation/
      user.schema.ts
      common.schema.ts
```

## Testing Forms

```tsx
import { render } from '@test-utils';
import { fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('should validate email format', async () => {
    const { getByTestId, getByText } = render(<LoginForm />);

    const emailInput = getByTestId('input');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = getByTestId('button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('should submit valid data', async () => {
    const onSubmit = vi.fn();
    const { getByTestId } = render(<LoginForm onSubmit={onSubmit} />);

    // Fill form...
    fireEvent.click(getByTestId('button'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
```

## Best Practices

1. **Always define schema first** - This ensures type safety throughout your form
2. **Use type inference** - Let TypeScript infer types from Zod schema with `z.infer<typeof schema>`
3. **Provide helpful error messages** - Make validation messages clear and actionable
4. **Handle loading states** - Use `isSubmitting` from `formState` to disable buttons during submission
5. **Reset forms after submission** - Use `reset()` when appropriate
6. **Validate on blur** - Consider `mode: 'onBlur'` for better UX on long forms
7. **Extract reusable schemas** - Share common validation patterns
8. **Add data-testid attributes** - Follow testing conventions for all form inputs

## Common Patterns

### Form with Default Values

```tsx
const { register, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {
    email: '',
    newsletter: true,
  },
});
```

### Async Validation

```tsx
const schema = z.object({
  username: z.string().refine(
    async (value) => {
      const isAvailable = await checkUsernameAvailability(value);
      return isAvailable;
    },
    { message: 'Username is already taken' }
  ),
});
```

### Form Reset After Submission

```tsx
const onSubmit = async (data: FormData) => {
  await submitData(data);
  reset(); // Reset to default values
};
```

## Resources

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Mantine + React Hook Form](https://mantine.dev/guides/react-hook-form/)
