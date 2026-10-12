import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useBasket } from '../../context/basket-context';
import { colors } from '../../components/screen';

const glyphs: Record<string, string> = { index: '▦', basket: '◫', coupons: '%', watch: '◷', insights: '⌁' };
const labels: Record<string, string> = { index: 'Compare', basket: 'Basket', coupons: 'Coupons', watch: 'Price watch', insights: 'Insights' };

export default function TabLayout() {
  const { basket } = useBasket();
  const basketCount = Object.values(basket).reduce((sum, value) => sum + value, 0);
  return (
    <Tabs screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.greenDark,
      tabBarInactiveTintColor: '#838b80',
      tabBarLabel: labels[route.name] ?? route.name,
      tabBarLabelStyle: { fontSize: 9, fontWeight: '700', marginTop: 2 },
      tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size + 1, fontWeight: '700' }}>{glyphs[route.name] ?? '•'}</Text>,
      tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#e7eae2', height: 64, paddingTop: 6, paddingBottom: 7 },
    })}>
      <Tabs.Screen name="index" options={{ title: 'Compare' }} />
      <Tabs.Screen name="basket" options={{ title: basketCount ? `Basket (${basketCount})` : 'Basket' }} />
      <Tabs.Screen name="coupons" options={{ title: 'Coupons' }} />
      <Tabs.Screen name="watch" options={{ title: 'Price watch' }} />
      <Tabs.Screen name="insights" options={{ title: 'Insights' }} />
    </Tabs>
  );
}
