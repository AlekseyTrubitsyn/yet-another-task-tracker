import { alpha, rem } from '@mantine/core';

export const components = {
  Button: {
    defaultProps: {
      fw: 'bold',
    },

    styles: (theme: any, props: any) => {
      const { size, variant } = props;
      type TCustomSize = 'md' | 'lg';

      const sizeStyles = {
        lg: {
          height: rem(48),
          fontSize: rem(15),
          padding: `0 ${rem(24)}`,
          borderRadius: rem(24),
        },
        md: {
          height: rem(40),
          fontSize: rem(13),
          padding: `0 ${rem(20)}`,
          borderRadius: rem(20),
        },
      };

      const safeSize = (size === 'lg' || size === 'md' ? size : 'md') as TCustomSize;
      const isDark = theme.colorScheme === 'dark';

      const variantStyles = {
        primary: {
          backgroundColor: theme.colors.primary[2], // #635FC7 - main purple
          color: theme.white,
          '&:hover': {
            backgroundColor: theme.colors.primary[1], // #A8A4FF - light purple
          },
        },

        secondary: {
          backgroundColor: isDark
            ? alpha(theme.colors.primary[2], 0.15)
            : alpha(theme.colors.primary[2], 0.1),
          color: theme.colors.primary[2], // #635FC7 - main purple
          '&:hover': {
            backgroundColor: isDark
              ? alpha(theme.colors.primary[2], 0.25)
              : alpha(theme.colors.primary[2], 0.25),
          },
        },

        destructive: {
          backgroundColor: theme.colors.red[6], // #EA5555 - main red
          color: theme.white,
          '&:hover': {
            backgroundColor: theme.colors.red[0], // #FF9898 - light red
          },
        },
      };

      return {
        root: {
          ...sizeStyles[safeSize],
          ...(variantStyles[variant as keyof typeof variantStyles] ?? {}),
          textTransform: 'none',
          fontWeight: 700,
        },
      };
    },
  },
};
