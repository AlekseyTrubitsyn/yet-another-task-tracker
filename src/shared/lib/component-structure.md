# Component Structure Convention

This document outlines the required folder structure for React components.

## Core Rule

**Every TSX component must be placed in its own folder with the component's name, containing an `index.tsx` file.**

## Why This Structure?

1. **Co-location**: All related files (tests, styles, sub-components) are grouped together
2. **Maintainability**: Easy to find all files related to a component
3. **Clean Imports**: Import from the folder name, not the file name
4. **Scalability**: Easy to add more related files without cluttering

## Folder Structure

### Basic Component

```
ComponentName/
├── index.tsx           # Main component export
├── ComponentName.test.tsx  # Tests (optional)
└── ComponentName.module.css  # Styles (optional)
```

### Component with Sub-components

```
ComponentName/
├── index.tsx           # Main component export
├── ComponentName.test.tsx
├── ComponentName.module.css
└── components/         # Internal sub-components
    ├── Header/
    │   └── index.tsx
    └── Footer/
        └── index.tsx
```

### Complete Example

```
UserProfile/
├── index.tsx                    # Main component
├── UserProfile.test.tsx         # Tests
├── UserProfile.module.css       # Styles
├── UserProfile.schema.ts        # Form schemas (if applicable)
├── UserProfile.types.ts         # Type definitions (if complex)
└── components/                  # Sub-components used only by UserProfile
    ├── Avatar/
    │   ├── index.tsx
    │   └── Avatar.module.css
    └── Stats/
        ├── index.tsx
        └── Stats.test.tsx
```

## Implementation Examples

### Basic Component

```tsx
// features/auth/ui/LoginButton/index.tsx
import { Button } from '@mantine/core';
import classes from './LoginButton.module.css';

export function LoginButton() {
  return (
    <Button className={classes.root} data-testid="LoginButton">
      Login
    </Button>
  );
}
```

### Component with Test

```tsx
// features/auth/ui/LoginButton/LoginButton.test.tsx
import { render } from '@test-utils';
import { LoginButton } from './index';

describe('LoginButton', () => {
  it('should render', () => {
    const { getByTestId } = render(<LoginButton />);
    expect(getByTestId('LoginButton')).toBeInTheDocument();
  });
});
```

### Component with Sub-components

```tsx
// widgets/dashboard/ui/Dashboard/index.tsx
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';
import classes from './Dashboard.module.css';

export function Dashboard() {
  return (
    <div className={classes.root} data-testid="Dashboard">
      <Header />
      <Sidebar />
      <Content />
    </div>
  );
}
```

```tsx
// widgets/dashboard/ui/Dashboard/components/Header/index.tsx
export function Header() {
  return <header data-testid="Header">Dashboard Header</header>;
}
```

## Naming Conventions

### File Names

- **Component file**: `index.tsx` (always)
- **Test file**: `{ComponentName}.test.tsx`
- **Styles**: `{ComponentName}.module.css`
- **Schema**: `{ComponentName}.schema.ts` (for forms)
- **Types**: `{ComponentName}.types.ts` (for complex types)

### Folder Names

- Use **PascalCase** for component folders: `UserProfile`, `LoginForm`, `DashboardWidget`
- Sub-components folder: always `components/` (lowercase)

## FSD Layer Integration

This structure applies to all FSD layers:

```
src/
├── features/
│   └── auth/
│       └── ui/
│           ├── LoginForm/
│           │   ├── index.tsx
│           │   ├── LoginForm.test.tsx
│           │   └── LoginForm.schema.ts
│           └── SignupForm/
│               ├── index.tsx
│               └── SignupForm.test.tsx
│
├── widgets/
│   └── header/
│       └── ui/
│           └── Header/
│               ├── index.tsx
│               ├── Header.module.css
│               └── components/
│                   ├── Logo/
│                   │   └── index.tsx
│                   └── Navigation/
│                       └── index.tsx
│
├── pages/
│   └── home/
│       └── ui/
│           └── HomePage/
│               ├── index.tsx
│               └── HomePage.test.tsx
│
└── shared/
    └── ui/
        ├── Button/
        │   ├── index.tsx
        │   ├── Button.test.tsx
        │   └── Button.module.css
        └── Input/
            ├── index.tsx
            └── Input.module.css
```

## Public API Exports

Each slice should re-export components from its public API:

```tsx
// features/auth/index.ts
export { LoginForm } from './ui/LoginForm';
export { SignupForm } from './ui/SignupForm';
```

## Import Examples

```tsx
// ✅ Correct - Import from folder
import { LoginForm } from '@/features/auth';
import { Header } from '@/widgets/header';
import { Button } from '@/shared/ui/Button';

// ❌ Wrong - Don't import from index.tsx directly
import { LoginForm } from '@/features/auth/ui/LoginForm/index';

// ❌ Wrong - Don't import from specific file names
import { LoginForm } from '@/features/auth/ui/LoginForm.tsx';
```

## When to Create Sub-components

Create sub-components in the `components/` folder when:

1. **Component is used only by the parent** - Not shared elsewhere
2. **Logical separation** - Breaks down complexity
3. **Significant size** - Sub-component has substantial logic (>50 lines)
4. **Independent testing** - Sub-component needs its own tests

Don't create sub-components when:
- The component is reusable across the app (use `shared/ui` instead)
- It's just a simple wrapper (inline it)
- It's only a few lines of JSX

## Migration Checklist

When refactoring existing components:

1. Create new folder with component name
2. Move component to `index.tsx` in new folder
3. Move related files (tests, styles) to the same folder
4. Update imports in parent files
5. Update slice public API exports
6. Run tests to verify everything works

## Benefits Summary

✅ **Organization**: All related files grouped together
✅ **Discoverability**: Easy to find component and its assets
✅ **Scalability**: Simple to add new related files
✅ **Clean Imports**: No need to specify file names
✅ **IDE Support**: Better auto-completion and navigation
✅ **Testing**: Easy to locate tests alongside components
