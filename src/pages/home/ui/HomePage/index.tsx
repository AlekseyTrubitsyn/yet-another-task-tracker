import { Button } from '@mantine/core';
import { ColorSchemeToggle } from '@/features/theme-switcher';
import { Welcome } from '@/widgets/welcome';

export function HomePage() {
  return (
    <div data-testid="HomePage">
      <Welcome />
      <ColorSchemeToggle />
      <Button variant="primary" size="lg" data-testid="button">
        Button Primary (L)
      </Button>
      <Button variant="secondary" size="sm" data-testid="button">
        Button Secondary
      </Button>
      <Button variant="destructive" size="lg" data-testid="button">
        Button Destructive
      </Button>
    </div>
  );
}
