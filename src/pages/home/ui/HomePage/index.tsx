import { Group, Stack, Text, Title } from '@mantine/core';
import { Icon } from '@/shared/ui/Icon';

export function HomePage() {
  return (
    <div data-testid="HomePage">
      <Stack gap="xl" p="xl">
        <Title order={1}>Welcome to Kanban Board</Title>
        <Text size="lg" c="dark.3">
          Icon System Test - All 9 design system icons:
        </Text>
        <Group gap="lg">
          <div>
            <Icon name="board" size={24} />
            <Text size="sm" mt="xs">
              board
            </Text>
          </div>
          <div>
            <Icon name="chevron-down" size={24} />
            <Text size="sm" mt="xs">
              chevron-down
            </Text>
          </div>
          <div>
            <Icon name="cross" size={24} />
            <Text size="sm" mt="xs">
              cross
            </Text>
          </div>
          <div>
            <Icon name="eye" size={24} />
            <Text size="sm" mt="xs">
              eye
            </Text>
          </div>
          <div>
            <Icon name="eye-slash" size={24} />
            <Text size="sm" mt="xs">
              eye-slash
            </Text>
          </div>
          <div>
            <Icon name="logo" size={24} />
            <Text size="sm" mt="xs">
              logo
            </Text>
          </div>
          <div>
            <Icon name="moon" size={24} />
            <Text size="sm" mt="xs">
              moon
            </Text>
          </div>
          <div>
            <Icon name="show-more" size={24} />
            <Text size="sm" mt="xs">
              show-more
            </Text>
          </div>
          <div>
            <Icon name="sun" size={24} />
            <Text size="sm" mt="xs">
              sun
            </Text>
          </div>
        </Group>
      </Stack>
    </div>
  );
}
