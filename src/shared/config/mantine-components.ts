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
          backgroundColor: theme.colors.primary[3],
          color: theme.white,
          '&:hover': {
            backgroundColor: theme.colors.primary[2],
          },
        },

        secondary: {
          backgroundColor: isDark ? theme.colors.primary[9] : alpha(theme.colors.primary[3], 0.1),
          color: theme.colors.primary[3],
          '&:hover': {
            backgroundColor: isDark
              ? alpha(theme.colors.primary[9], 0.9)
              : alpha(theme.colors.primary[3], 0.25),
          },
        },

        destructive: {
          backgroundColor: theme.colors.red[6],
          color: theme.white,
          '&:hover': {
            backgroundColor: theme.colors.red[4],
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
