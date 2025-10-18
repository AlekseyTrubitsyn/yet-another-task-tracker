import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Stack, TextInput } from '@mantine/core';

// 1. Define validation schema
const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// 2. Infer TypeScript type from schema
type FormData = z.infer<typeof schema>;

interface ExampleFormProps {
  onSubmit?: (data: FormData) => void | Promise<void>;
}

// 3. Create form component
export function ExampleForm({ onSubmit }: ExampleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur', // Validate on blur for better UX
  });

  const handleFormSubmit = async (data: FormData) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} data-testid="ExampleForm">
      <Stack gap="md">
        <TextInput
          label="Email"
          placeholder="your@email.com"
          {...register('email')}
          error={errors.email?.message}
          data-testid="input-email"
        />

        <TextInput
          label="Username"
          placeholder="johndoe"
          {...register('username')}
          error={errors.username?.message}
          data-testid="input-username"
        />

        <TextInput
          label="Password"
          type="password"
          placeholder="Enter a strong password"
          {...register('password')}
          error={errors.password?.message}
          data-testid="input-password"
        />

        <Button type="submit" loading={isSubmitting} data-testid="button-submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
