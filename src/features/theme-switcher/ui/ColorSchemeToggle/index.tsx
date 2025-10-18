import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl" data-testid="ColorSchemeToggle">
      <Button onClick={() => setColorScheme('light')} data-testid="button">
        Light
      </Button>
      <Button onClick={() => setColorScheme('dark')} data-testid="button">
        Dark
      </Button>
      <Button onClick={() => setColorScheme('auto')} data-testid="button">
        Auto
      </Button>
    </Group>
  );
}
