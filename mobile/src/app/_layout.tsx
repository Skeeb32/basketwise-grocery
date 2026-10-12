import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BasketProvider } from '../context/basket-context';

export default function RootLayout() {
  return (
    <BasketProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </BasketProvider>
  );
}
