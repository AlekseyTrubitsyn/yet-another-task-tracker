# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Kanban board application built with React, TypeScript, Vite, and Mantine UI components. The project uses Yarn 4.9.2 as the package manager.

## Development Commands

**Start development server:**
```bash
yarn dev
```

**Build for production:**
```bash
yarn build
```
Runs TypeScript compiler followed by Vite build.

**Type checking:**
```bash
yarn typecheck
```

**Linting:**
```bash
yarn lint          # Run both ESLint and Stylelint
yarn eslint        # Run ESLint only
yarn stylelint     # Run Stylelint only
```

**Code formatting:**
```bash
yarn prettier        # Check formatting
yarn prettier:write  # Auto-format files
```

**Testing:**
```bash
yarn vitest         # Run tests once
yarn vitest:watch   # Run tests in watch mode
yarn test           # Run full test suite (typecheck + prettier + lint + vitest + build)
```

**Storybook:**
```bash
yarn storybook        # Start Storybook dev server on port 6006
yarn storybook:build  # Build Storybook to storybook-static/
```

## Architecture

This project follows **Feature-Sliced Design (FSD)** - a modern architectural methodology for frontend projects. Code is organized by layers from lowest to highest level of abstraction:

### FSD Layers

```
src/
├── app/              # Application initialization layer
│   ├── providers/    # Global providers (MantineProvider, etc.)
│   ├── router.tsx    # Application routing
│   └── index.tsx     # App entry point
│
├── pages/            # Page-level components (routing targets)
│   └── home/
│       ├── ui/       # Page UI components
│       └── index.ts  # Public API
│
├── widgets/          # Large independent UI blocks
│   ├── layout/       # App layout (AppShell, Sidebar, Header)
│   │   ├── ui/
│   │   │   ├── AppLayout/   # Main AppShell wrapper
│   │   │   ├── Sidebar/     # Navigation sidebar
│   │   │   └── Header/      # Top header bar
│   │   └── index.ts
│   └── welcome/
│       ├── ui/       # Widget UI components
│       └── index.ts  # Public API
│
├── features/         # User interactions and business features
│   └── theme-switcher/
│       ├── ui/       # Feature UI components
│       └── index.ts  # Public API
│
├── entities/         # Business entities (models, stores)
│   └── (future business logic)
│
└── shared/           # Reusable infrastructure code
    ├── ui/           # Shared UI kit components
    ├── config/       # App configuration (theme, constants)
    └── lib/          # Utility functions
```

### FSD Rules

1. **Import Rule**: A module can only import from layers below it
   - `app` → can import from all layers
   - `pages` → can import from `widgets`, `features`, `entities`, `shared`
   - `widgets` → can import from `features`, `entities`, `shared`
   - `features` → can import from `entities`, `shared`
   - `entities` → can import from `shared`
   - `shared` → cannot import from other layers

2. **Public API**: Each slice must expose a public API through `index.ts`
   - Import from slices via their public API: `@/features/theme-switcher`
   - Never import internal files directly: `@/features/theme-switcher/ui/Component`

3. **Slice Structure**: Each slice follows the pattern:
   ```
   slice-name/
   ├── ui/           # UI components
   ├── model/        # State management, business logic (optional)
   ├── api/          # API requests (optional)
   ├── lib/          # Helper functions (optional)
   └── index.ts      # Public exports
   ```

### Theming System

The application uses a centralized theming system in `src/shared/config/`:

- **`theme.ts`**: Main theme configuration with custom colors, typography, spacing, and radius values
  - Primary color palette: `primary[0-9]` with design-specific values
  - Red color palette: `red[0-9]` for error/destructive states
  - Custom font: Plus Jakarta Sans
  - Custom heading sizes (h1-h4) and font sizes (xs, sm, md, lg, xl)

- **`mantine-components.ts`**: Mantine component style overrides
  - Button component with custom variants: `primary`, `secondary`, `destructive`
  - Size variants: `md` (40px), `lg` (48px)
  - Handles dark mode styling automatically

**Important**: All Mantine theme customization should be done in these files, not in individual components.

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` - General alias for src
- `@/app` - Application layer
- `@/pages/*` - Pages layer
- `@/widgets/*` - Widgets layer
- `@/features/*` - Features layer
- `@/entities/*` - Entities layer
- `@/shared/*` - Shared layer
- `@test-utils` - Test utilities

These are resolved at build time via `vite-tsconfig-paths` plugin.

### Testing

Tests use Vitest with React Testing Library. The custom render utility at `test-utils/render.tsx` wraps components with `MantineProvider` and the app theme automatically.

**To write tests:**
1. Import render from `@test-utils`
2. Import assertions from `@testing-library/jest-dom` (available globally)
3. Use `.test.tsx` extension for test files

**Testing Conventions (IMPORTANT):**

All components must follow these `data-testid` conventions:

1. **Root Element**: Every React component's root element must have `data-testid` with the component name
   ```tsx
   export function MyComponent() {
     return <div data-testid="MyComponent">{/* ... */}</div>;
   }
   ```

2. **Interactive Elements**: All interactive elements must have `data-testid` with the element's tag name:
   - Buttons: `data-testid="button"`
   - Inputs: `data-testid="input"`
   - Checkboxes: `data-testid="checkbox"`
   - Select dropdowns: `data-testid="select"`
   - Links/Anchors: `data-testid="anchor"`
   - Textareas: `data-testid="textarea"`

3. **Multiple Elements**: When there are multiple elements of the same type, use descriptive suffixes:
   ```tsx
   <Button data-testid="button-submit">Submit</Button>
   <Button data-testid="button-cancel">Cancel</Button>
   ```

See `src/shared/lib/testing-conventions.md` for detailed examples and rationale.

### Storybook

Components should have accompanying `.story.tsx` files for Storybook. The Storybook config in `.storybook/` is pre-configured with:
- Mantine integration
- Dark mode support via `storybook-dark-mode`
- Custom preview configuration in `.storybook/preview.tsx`

## Code Standards

- **TypeScript**: Strict mode enabled - all code must be properly typed
- **ESLint**: Uses `eslint-config-mantine` with React and a11y plugins
- **Styling**: Use Mantine's styling system; PostCSS with `mantine-postcss-preset`
- **Component files**: Use `.tsx` extension for components, `.ts` for utilities
- **Component structure**: Each component must be in its own folder with `index.tsx` (see Component Structure below)
- **Testing**: All components must include `data-testid` attributes (see Testing Conventions above)
- **Forms**: All forms must use `react-hook-form` with `zod` validation (see Form Conventions below)

## Component Structure Convention (IMPORTANT)

**Every TSX component must be in its own folder named after the component, containing an `index.tsx` file.**

### Required Structure

```
ComponentName/
├── index.tsx                    # Main component (required)
├── ComponentName.test.tsx       # Tests
├── ComponentName.module.css     # Styles
└── components/                  # Sub-components (if needed)
    └── SubComponent/
        └── index.tsx
```

### Examples from Codebase

```
src/
├── features/
│   ├── theme-switcher/
│   │   └── ui/
│   │       └── ColorSchemeToggle/
│   │           ├── index.tsx
│   │           └── ColorSchemeToggle.test.tsx
│   └── example-form/
│       └── ui/
│           └── ExampleForm/
│               ├── index.tsx
│               └── ExampleForm.test.tsx
├── widgets/
│   └── welcome/
│       └── ui/
│           └── Welcome/
│               ├── index.tsx
│               └── Welcome.module.css
└── pages/
    └── home/
        └── ui/
            └── HomePage/
                └── index.tsx
```

### Key Rules

1. **Folder = Component Name**: Use PascalCase (e.g., `LoginForm/`, `UserProfile/`)
2. **Main file = index.tsx**: Always use `index.tsx` for the component
3. **Related files**: Place tests, styles, schemas in the same folder
4. **Sub-components**: Use `components/` subfolder for internal components
5. **Public API**: Export from slice index: `export { LoginForm } from './ui/LoginForm';`

### Benefits

- **Co-location**: All related files grouped together
- **Clean imports**: Import from folder name, not file name
- **Scalability**: Easy to add tests, styles, sub-components
- **Discoverability**: Clear component boundaries

See `src/shared/lib/component-structure.md` for detailed guidelines and examples.

## Form Conventions (IMPORTANT)

All forms in this project must use **react-hook-form** with **zod** validation. Never use uncontrolled forms or other form libraries.

### Required Pattern

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define schema
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

// 2. Infer types
type FormData = z.infer<typeof schema>;

// 3. Use in component
function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="MyForm">
      <TextInput
        {...register('email')}
        error={errors.email?.message}
        data-testid="input"
      />
      <Button type="submit" data-testid="button">Submit</Button>
    </form>
  );
}
```

### Key Rules

1. **Schema First**: Always define Zod schema before creating the form
2. **Type Inference**: Use `z.infer<typeof schema>` for TypeScript types
3. **Validation Messages**: Provide clear, user-friendly error messages in schema
4. **Controller for Complex Inputs**: Use `Controller` from react-hook-form for Select, DatePicker, etc.
5. **Form Organization**: Place forms in appropriate FSD layers (features, widgets)

See `src/shared/lib/form-conventions.md` for detailed examples, patterns, and best practices.
