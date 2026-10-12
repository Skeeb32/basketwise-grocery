import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppScreen, colors, SampleNotice, ScreenTitle, Surface } from '../../components/screen';
import { money, products } from '../../data/products';
import { lowestOffer } from '../../data/products';
import { useBasket } from '../../context/basket-context';

export default function WatchScreen() {
  const { watchlist, toggleWatch } = useBasket();
  const watched = products.filter((product) => watchlist.includes(product.id));
  return (
    <AppScreen>
      <ScreenTitle title="Keep an eye on the things you buy." subtitle="Add a staple to Price watch from Compare. This list lives only in this app preview." />
      <SampleNotice>Trend examples are illustrative visuals, not recorded retailer price history.</SampleNotice>
      {watched.length === 0 ? (
        <Surface style={styles.empty}><Text style={styles.emptyIcon}>◷</Text><Text style={styles.emptyTitle}>Your watch list is empty</Text><Text style={styles.copy}>Tap the star on a product in Compare to keep it here.</Text></Surface>
      ) : watched.map((product) => (
        <Surface key={product.id} style={styles.card}>
          <View style={styles.cardHead}><Text style={styles.emoji}>{product.emoji}</Text><View style={styles.details}><Text style={styles.productName}>{product.name}</Text><Text style={styles.copy}>{product.detail}</Text></View><Pressable accessibilityRole="button" accessibilityLabel={`Stop watching ${product.name}`} onPress={() => toggleWatch(product.id)} style={styles.remove}><Text style={styles.removeText}>×</Text></Pressable></View>
          <View style={styles.chartLabelRow}><Text style={styles.chartLabel}>EXAMPLE PRICE TREND</Text><Text style={styles.lowest}>{money(lowestOffer(product).price)} lowest shown</Text></View>
          <View accessible accessibilityLabel="Illustrative trend only; there is no recorded history" style={styles.chart}>{[22, 34, 27, 47, 38, 57, 49, 69, 54, 77, 64, 86].map((height, index) => <View key={index} style={[styles.bar, { height }]} />)}</View>
          <Text style={styles.chartNote}>We’ll show a real trend after repeated, timestamped observations are available.</Text>
        </Surface>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', paddingVertical: 34, gap: 8 }, emptyIcon: { color: '#91a18e', fontSize: 28 },
  emptyTitle: { color: colors.ink, fontWeight: '700', fontSize: 15 }, copy: { color: colors.muted, fontSize: 10, lineHeight: 15 },
  card: { gap: 12, padding: 14 }, cardHead: { flexDirection: 'row', alignItems: 'center', gap: 9 }, emoji: { fontSize: 23 },
  details: { flex: 1, gap: 3 }, productName: { color: colors.ink, fontSize: 13, fontWeight: '700' },
  remove: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f5f0', borderRadius: 14 }, removeText: { color: colors.muted, fontSize: 19, lineHeight: 21 },
  chartLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, chartLabel: { color: '#7b8978', fontSize: 8, fontWeight: '800', letterSpacing: 0.8 }, lowest: { color: colors.greenDark, fontSize: 9, fontWeight: '700' },
  chart: { height: 90, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 4, borderBottomWidth: 1, borderColor: colors.line },
  bar: { width: '6%', borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: '#d9e6d5' },
  chartNote: { color: colors.muted, fontSize: 9, lineHeight: 14 },
});
