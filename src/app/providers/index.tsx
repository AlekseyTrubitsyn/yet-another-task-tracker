import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { theme } from '@/shared/config';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
