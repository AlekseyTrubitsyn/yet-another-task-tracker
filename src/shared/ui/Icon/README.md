# Icon System

This directory contains the icon system for the application, using SVG sprites for optimal performance.

## Overview

The icon system uses SVG sprites to efficiently load and render icons. All icons are stored as individual SVG files, which are then combined into a single sprite file during the build process.

## Directory Structure

```
Icon/
├── assets/              # Individual SVG icon files
│   ├── board.svg
│   ├── chevron-down.svg
│   ├── check.svg
│   └── ...
├── index.tsx            # Icon component
├── icon-names.ts        # Auto-generated types (don't edit)
└── README.md            # This file

public/
└── sprite.svg           # Auto-generated sprite (don't edit)
```

## Adding New Icons

### 1. Add SVG File

Place your SVG file in the `assets/` directory:

```bash
src/shared/ui/Icon/assets/my-icon.svg
```

**SVG Requirements:**
- Use `currentColor` for fill/stroke to make icons themeable
- Include a `viewBox` attribute
- Keep icons simple and optimized
- Use kebab-case for filenames

**Example SVG:**
```svg
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M..." fill="currentColor"/>
</svg>
```

### 2. Generate Sprite (Optional in Development)

The sprite is automatically generated during the build process by a Vite plugin. However, you can manually generate it for development:

```bash
yarn icons:generate
```

This will:
- Read all SVG files from `assets/`
- Generate `icon-names.ts` with TypeScript types
- Report success/errors

**Note:** During production builds, the sprite is automatically generated with a content hash (e.g., `sprite-Dl1qZt-p.svg`) and included in the `dist/assets/` folder. The Icon component automatically uses the correct hashed URL.

### 3. Use the Icon

The icon is now available to use:

```tsx
import { Icon } from '@/shared/ui';

<Icon name="my-icon" size={24} />
```

## Usage

### Basic Usage

```tsx
import { Icon } from '@/shared/ui';

function MyComponent() {
  return <Icon name="board" />;
}
```

### With Size

```tsx
// Number (in pixels)
<Icon name="check" size={24} />

// String (any CSS unit)
<Icon name="cross" size="2rem" />
```

### With Color

```tsx
// Using theme colors
<Icon name="board" color="var(--mantine-color-primary-2)" />

// Using hex colors
<Icon name="check" color="#635FC7" />

// Using currentColor (default)
<Icon name="chevron-down" />
```

### With Custom Styling

```tsx
<Icon
  name="vertical-ellipsis"
  size={20}
  className="my-icon-class"
  style={{ opacity: 0.8 }}
/>
```

### Type-Safe Icon Names

The `IconName` type is auto-generated and includes all available icons:

```tsx
import { Icon, IconName } from '@/shared/ui';

const iconName: IconName = 'board'; // TypeScript will autocomplete
<Icon name={iconName} />
```

## Available Icons

Current icons (auto-generated list):

- `add-task-mobile` - Add task button (mobile)
- `board` - Board/grid layout icon
- `check` - Checkmark icon
- `chevron-down` - Downward pointing chevron
- `chevron-up` - Upward pointing chevron
- `cross` - Close/delete icon
- `hide-sidebar` - Hide sidebar icon
- `show-sidebar` - Show sidebar icon
- `vertical-ellipsis` - Three dots menu

## Component Props

```tsx
interface IconProps {
  name: IconName;           // Icon name (required)
  size?: number | string;   // Size in px or CSS unit (default: 16)
  color?: string;           // CSS color value
  className?: string;       // Additional CSS classes
  style?: CSSProperties;    // Inline styles
}
```

## Examples

### In Buttons

```tsx
import { Button } from '@mantine/core';
import { Icon } from '@/shared/ui';

<Button leftSection={<Icon name="add-task-mobile" />}>
  Add Task
</Button>
```

### In Navigation

```tsx
import { Icon } from '@/shared/ui';

<nav>
  <a href="/boards">
    <Icon name="board" size={20} />
    <span>Boards</span>
  </a>
</nav>
```

### Conditional Icons

```tsx
import { Icon } from '@/shared/ui';

function Collapsible({ isOpen }) {
  return (
    <Icon
      name={isOpen ? 'chevron-up' : 'chevron-down'}
      size={16}
    />
  );
}
```

### With Theme Colors

```tsx
import { Icon } from '@/shared/ui';
import { useMantineTheme } from '@mantine/core';

function ThemedIcon() {
  const theme = useMantineTheme();

  return (
    <Icon
      name="check"
      color={theme.colors.primary[2]}
      size={24}
    />
  );
}
```

## Best Practices

1. **Use Consistent Sizes**: Stick to common sizes (16, 20, 24, 32px)
2. **Leverage currentColor**: Let parent components control color via CSS
3. **Keep SVGs Simple**: Optimize and simplify paths before adding
4. **Name Clearly**: Use descriptive, kebab-case names
5. **Run Generator**: Always run `yarn icons:generate` after adding icons
6. **Version Control**: Commit both source SVGs and generated files

## How It Works

The icon system uses inline SVG sprite injection for optimal performance:

1. **Source Icons** - Individual SVG files stored in `assets/`
2. **Vite Plugin** - Automatically generates sprite during build
3. **Inline Injection** - Sprite injected directly into HTML
4. **Zero Requests** - No separate file, no extra HTTP request
5. **Icon Component** - References inline sprites using `<use href="#icon-name">`

### Build Process

**Development:**
```
assets/*.svg → Vite plugin → Dev server serves at /sprite.svg (on-the-fly)
```

**Production:**
```
assets/*.svg → Vite plugin → Injected inline into dist/index.html
```

The sprite is:
- ✅ Automatically generated during build
- ✅ Injected inline into HTML (no separate file)
- ✅ Available instantly with page load
- ✅ No flash of missing icons
- ✅ Zero extra HTTP requests

## Maintenance

### Updating Icons

1. Edit the SVG file in `assets/`
2. Run `yarn icons:generate`
3. Verify changes in your component
4. Commit both source SVGs and `public/sprite.svg`

### Removing Icons

1. Delete the SVG file from `assets/`
2. Run `yarn icons:generate`
3. Update any components using the removed icon
4. TypeScript will catch missing icon names

### Troubleshooting

**Icon not appearing:**
- Check that you ran `yarn icons:generate`
- Verify the icon name matches the filename (without .svg)
- Check that `public/sprite.svg` exists
- Verify preload link in index.html: `<link rel="preload" href="/sprite.svg" ...>`
- Check browser Network tab for `/sprite.svg` request

**Icon color not working:**
- Check that the SVG uses `currentColor` for fill/stroke
- If needed, regenerate the sprite (it auto-converts colors)

**TypeScript errors:**
- Run `yarn icons:generate` to update types
- Check that icon name exactly matches filename

**Changes not reflecting:**
- Run `yarn icons:generate` after modifying SVGs
- Hard refresh browser (Cmd/Ctrl + Shift + R)
- Restart dev server if needed

## Performance

Benefits of using SVG sprites with public folder:
- ✅ Single HTTP request for all icons (~3KB)
- ✅ Efficient browser caching (separate asset)
- ✅ Preloaded for instant availability
- ✅ Reused across all pages
- ✅ Smaller than icon fonts
- ✅ Crisp rendering at any size
- ✅ Full CSS control (color, size, filters)
- ✅ Type-safe icon names
- ✅ No JavaScript processing needed

## Testing

Icons should be testable using data-testid:

```tsx
import { render } from '@test-utils';
import { Icon } from './index';

it('should render icon', () => {
  const { getByTestId } = render(<Icon name="check" />);
  expect(getByTestId('icon')).toBeInTheDocument();
});
```
