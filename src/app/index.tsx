import { AppProvider } from './providers';
import { AppRouter } from './router';

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
