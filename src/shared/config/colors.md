# Color Palette Reference

This document provides a reference for the design system color palette implemented in the Mantine theme.

## Color System Overview

The color palette is based on the Kanban board design system and includes primary purple tones, neutral grays, and accent colors for actions and states.

## Primary Colors

### Purple (Primary Brand Color)

| Index | Hex Code | RGB | HSL | Usage |
|-------|----------|-----|-----|-------|
| 0 | `#E4EBFA` | 228, 235, 250 | 221°, 69%, 94% | Lightest tint - backgrounds, borders |
| 1 | `#A8A4FF` | 168, 164, 255 | 243°, 100%, 82% | Light purple - hover states |
| 2-9 | `#635FC7` | 99, 95, 199 | 242°, 48%, 58% | Main purple - primary actions, CTAs |

**Access in code:**
```tsx
theme.colors.primary[2] // Main purple
theme.colors.primary[1] // Light purple
theme.colors.primary[0] // Lightest tint
theme.other.mainPurple // #635FC7
theme.other.mainPurpleLight // #A8A4FF
```

## Neutral Colors (Dark Scale)

### Grays and Blacks

| Index | Hex Code | RGB | HSL | Usage |
|-------|----------|-----|-----|-------|
| 0 | `#FFFFFF` | 255, 255, 255 | 0°, 0%, 100% | White - text on dark, backgrounds |
| 1 | `#F4F7FD` | 244, 247, 253 | 220°, 69%, 97% | Very light gray - light backgrounds |
| 2 | `#E4EBFA` | 228, 235, 250 | 221°, 69%, 94% | Light gray - borders, dividers |
| 3 | `#828FA3` | 130, 143, 163 | 216°, 15%, 57% | Medium gray - secondary text |
| 4 | `#3E3F4E` | 62, 63, 78 | 236°, 11%, 27% | Dark gray - borders in dark mode |
| 5 | `#2B2C37` | 43, 44, 55 | 235°, 12%, 19% | Darker background |
| 6 | `#20212C` | 32, 33, 44 | 235°, 16%, 15% | Darkest background |
| 7-9 | `#000112` | 0, 1, 18 | 237°, 100%, 4% | Almost black - darkest elements |

**Access in code:**
```tsx
theme.colors.dark[0] // White
theme.colors.dark[1] // Very light gray background
theme.colors.dark[2] // Light gray
theme.colors.dark[3] // Medium gray (secondary text)
theme.colors.dark[4] // Dark gray
theme.colors.dark[5] // Darker background
theme.colors.dark[6] // Darkest background
theme.colors.dark[7] // Almost black

// Named references
theme.other.white // #FFFFFF
theme.other.lightGreyBg // #F4F7FD
theme.other.linesLight // #E4EBFA
theme.other.mediumGrey // #828FA3
theme.other.linesDark // #3E3F4E
theme.other.darkGrey // #2B2C37
theme.other.veryDarkGrey // #20212C
theme.other.black // #000112
```

## Accent Colors

### Red (Error/Destructive Actions)

| Index | Hex Code | RGB | HSL | Usage |
|-------|----------|-----|-----|-------|
| 0-4 | `#FF9898` | 255, 152, 152 | 0°, 100%, 80% | Light red - hover states |
| 5-9 | `#EA5555` | 234, 85, 85 | 0°, 78%, 63% | Main red - errors, delete actions |

**Access in code:**
```tsx
theme.colors.red[6] // Main red
theme.colors.red[0] // Light red hover
theme.other.red // #EA5555
theme.other.redLight // #FF9898
```

## Usage Examples

### Buttons

```tsx
// Primary button - purple background
<Button variant="primary">Action</Button>
// Uses: theme.colors.primary[2] (#635FC7)
// Hover: theme.colors.primary[1] (#A8A4FF)

// Secondary button - transparent with purple text
<Button variant="secondary">Cancel</Button>
// Uses: alpha(theme.colors.primary[2], 0.1) for background
// Text: theme.colors.primary[2] (#635FC7)

// Destructive button - red background
<Button variant="destructive">Delete</Button>
// Uses: theme.colors.red[6] (#EA5555)
// Hover: theme.colors.red[0] (#FF9898)
```

### Text Colors

```tsx
// Primary text
<Text c="dark.7">Main content</Text>  // #000112

// Secondary text
<Text c="dark.3">Secondary info</Text>  // #828FA3

// Light text on dark backgrounds
<Text c="dark.0">White text</Text>  // #FFFFFF
```

### Backgrounds

```tsx
// Light background
<Box bg="dark.1">Content</Box>  // #F4F7FD

// Dark background
<Box bg="dark.6">Content</Box>  // #20212C

// Darker background
<Box bg="dark.5">Content</Box>  // #2B2C37
```

### Borders and Dividers

```tsx
// Light mode borders
<Divider color="dark.2" />  // #E4EBFA

// Dark mode borders
<Divider color="dark.4" />  // #3E3F4E
```

## Theme Configuration

All colors are defined in `src/shared/config/theme.ts`. The theme also includes named color references in the `other` object for semantic usage:

```tsx
import { theme } from '@/shared/config';

// Access named colors
const mainColor = theme.other.mainPurple;  // #635FC7
const errorColor = theme.other.red;        // #EA5555
const bgColor = theme.other.lightGreyBg;   // #F4F7FD
```

## Best Practices

1. **Use semantic names**: Prefer `theme.other.mainPurple` over hardcoded hex values
2. **Consistent spacing**: Use theme colors for consistency across the app
3. **Accessibility**: Ensure sufficient contrast ratios (WCAG AA minimum)
4. **Dark mode**: The color system supports both light and dark modes
5. **Component variants**: Use predefined button variants (primary, secondary, destructive) instead of custom colors

## Color Contrast Guidelines

- **Primary purple on white**: ✅ AA compliant
- **Medium gray text**: ✅ Suitable for secondary text
- **Red on white**: ✅ AA compliant
- **White on primary purple**: ✅ AA compliant

Always test color combinations for accessibility compliance.
