# Icon System Architecture

This document describes the complete icon system implementation with automatic SVG sprite injection.

## Overview

The icon system provides a performant, type-safe way to use SVG icons throughout the application. It uses SVG sprites that are automatically injected inline into the HTML during build - no separate file, no extra HTTP request.

## Architecture

### Components

1. **Source Icons** (`src/shared/ui/Icon/assets/`)
   - Individual SVG files
   - Design system icons
   - Version-controlled source of truth

2. **Sprite Generator Library** (`src/shared/ui/Icon/lib/sprite-generator.js`)
   - Shared logic for generating sprites
   - Extracts SVG content and creates symbols
   - Generates TypeScript type definitions
   - Used by both Vite plugin and standalone script

3. **Vite Plugin** (`vite-plugins/icon-sprite-plugin.js`)
   - Automatically generates sprite during build
   - Uses shared sprite generator library
   - Injects sprite inline into HTML (no separate file)
   - Serves sprite on-the-fly in dev mode
   - Zero extra HTTP requests

4. **Generation Script** (`src/shared/ui/Icon/generate-sprite.js`)
   - Thin wrapper around sprite generator library
   - Optional manual type generation for development
   - Used when you want to regenerate types without building
   - Located with Icon component for easy access

5. **Icon Component** (`src/shared/ui/Icon/index.tsx`)
   - React component for rendering icons
   - Type-safe icon names
   - Customizable size, color, styling
   - References inline sprite symbols
   - Uses `<use href="#icon-name">`

### Data Flow

```
┌─────────────────┐
│  assets/*.svg   │ Source SVG files
└────────┬────────┘
         │
         │ Vite build
         ↓
┌─────────────────┐
│ Vite Plugin     │ icon-sprite-plugin.js
│  - Generate     │
│  - Combine      │
│  - Inject HTML  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ index.html      │ Sprite injected inline
│  <body>         │ (~14KB including sprite)
│    <svg>...</svg>│
│    <div>...</div>│
└────────┬────────┘
         │
         │ Icon component references
         ↓
┌─────────────────┐
│  <Icon name=/>  │ Uses inline sprite symbols
│  href="#icon-  │ No HTTP request needed
│    board"       │
└─────────────────┘
```

## File Structure

```
project-root/
├── index.html                          # HTML entry point (no preload needed)
├── vite.config.mjs                     # Vite config with icon plugin
├── vite-plugins/
│   └── icon-sprite-plugin.js          # Vite plugin for sprite generation
└── src/
    ├── vite-env.d.ts                  # Virtual module TypeScript declarations
    └── shared/ui/Icon/
        ├── assets/                     # Source SVG files
        │   ├── board.svg
        │   ├── check.svg
        │   └── ...
        ├── lib/
        │   └── sprite-generator.js    # Shared sprite generation logic
        ├── generate-sprite.js          # Standalone generation script (thin wrapper)
        ├── index.tsx                   # Icon component
        ├── icon-names.ts               # Auto-generated types
        └── README.md                   # Usage documentation
```

## Usage

### Adding New Icons

1. Place SVG file in `src/shared/ui/Icon/assets/my-icon.svg`
2. Run `yarn icons:generate`
3. Use in code: `<Icon name="my-icon" />`

### Build Commands

```bash
# Optional: Generate types manually (not required, happens automatically during build)
yarn icons:generate

# Development (sprite served on-the-fly at /sprite.svg, hot reload enabled)
yarn dev

# Production build (sprite injected inline into HTML)
yarn build
```

## Technical Details

### SVG Sprite Format

The generated sprite uses SVG symbols:

```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="icon-board" viewBox="0 0 16 16">
    <path d="..." fill="currentColor"/>
  </symbol>
  <symbol id="icon-check" viewBox="0 0 10 8">
    <path d="..." stroke="currentColor"/>
  </symbol>
</svg>
```

### Icon Component Usage

The Icon component references the sprite using SVG `<use>`:

```tsx
<svg>
  <use href="/sprite.svg#icon-board" />
</svg>
```

### Preload Implementation

The sprite is preloaded in `index.html` for optimal performance:

```html
<link rel="preload" href="/sprite.svg" as="image" type="image/svg+xml" />
```

This ensures:
- Browser fetches sprite early in page load
- Icons are instantly available when needed
- Single HTTP request for all icons
- Efficient browser caching

## Performance Benefits

✅ **Zero Extra Requests** - Sprite injected inline in HTML (no separate file)
✅ **Instant Availability** - Icons available immediately with HTML
✅ **Small Size** - ~14KB total HTML including sprite (~5.6KB gzipped)
✅ **No Flash** - Icons render instantly, no delayed loading
✅ **Cache Friendly** - HTML caching includes sprite automatically
✅ **Zero Runtime** - No JavaScript processing needed
✅ **Type Safety** - Compile-time icon name validation
✅ **Hot Reload** - Icons auto-reload during development

## Comparison with Alternatives

| Approach | Bundle Size | HTTP Requests | Type Safety | Dev Experience | Loading |
|----------|-------------|---------------|-------------|----------------|---------|
| **SVG Sprite (ours)** | ~5.6KB gzipped | 0 (inline) | ✅ Yes | ✅ Excellent | ✅ Instant |
| Icon Font | ~50KB+ | 1 | ❌ No | ⚠️ Good | ⚠️ Delayed |
| React Icons | ~100KB+ | 0 (in JS bundle) | ✅ Yes | ✅ Good | ⚠️ After JS |
| Individual SVGs | Variable | Many | ⚠️ Partial | ⚠️ Fair | ⚠️ Complex |

## Best Practices

1. **Optimize SVGs** - Use SVGO or similar before adding
2. **Use currentColor** - Makes icons themeable
3. **Consistent Naming** - Use kebab-case (e.g., `add-task-mobile`)
4. **Run Generator** - Always run after modifying assets
5. **Commit Generated Files** - Include sprite and types in git
6. **Document Icons** - Update README when adding icons

## Troubleshooting

### Icon Not Appearing

**Problem:** Icon component renders but shows nothing

**Solutions:**
1. Verify sprite was generated: `ls src/shared/ui/Icon/sprite.svg`
2. Check placeholder in index.html: `grep SVG_SPRITE_PLACEHOLDER index.html`
3. Rebuild: `yarn build`
4. Check browser console for errors

### TypeScript Errors

**Problem:** Icon name not recognized

**Solutions:**
1. Regenerate types: `yarn icons:generate`
2. Restart TypeScript server in IDE
3. Verify icon exists in `assets/`

### Sprite Not Loading

**Problem:** Icons not appearing

**Solutions:**
1. Verify sprite exists: `ls public/sprite.svg`
2. Check preload link in index.html
3. Check browser Network tab for `/sprite.svg` request (should be 200 OK)
4. Verify sprite copied to dist: `ls dist/sprite.svg`
5. Check console for CORS or loading errors

### Changes Not Reflecting

**Problem:** Icon updates not showing

**Solutions:**
1. Run `yarn icons:generate` after modifying SVGs
2. Hard refresh browser (Cmd/Ctrl + Shift + R)
3. Clear browser cache
4. Restart dev server
5. Check that `public/sprite.svg` was updated

## Maintenance

### Regular Tasks

- **Adding Icons**: As needed per design
- **Optimizing SVGs**: Before adding to assets
- **Reviewing Bundle**: Check icon sprite size
- **Updating Docs**: When adding new icons

### Version Control

**Commit:**
- Source SVGs in `assets/`
- Generated `sprite.svg`
- Generated `icon-names.ts`
- Updated `index.html`

**Don't Commit:**
- Nothing to ignore (all files needed)

## Future Enhancements

Potential improvements:

1. **SVGO Integration** - Auto-optimize SVGs during generation
2. **Icon Preview** - Storybook stories for all icons
3. **Accessibility** - Add aria-labels to Icon component
4. **Color Variants** - Pre-defined color schemes
5. **Size Presets** - Named sizes (sm, md, lg, xl)
6. **Animation Support** - CSS animation utilities

## References

- [SVG Sprites Guide](https://css-tricks.com/svg-sprites-use-better-icon-fonts/)
- [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html)
- [TypeScript Type Generation](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html)
