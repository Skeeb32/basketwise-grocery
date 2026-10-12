import { StyleSheet, Text, View } from 'react-native';
import { AppScreen, colors, SampleNotice, ScreenTitle, SectionTitle, Surface } from '../../components/screen';
import { lowestOffer, money, products } from '../../data/products';

export default function InsightsScreen() {
  const itemwiseTotal = products.reduce((sum, product) => sum + lowestOffer(product).price, 0);
  const storeTotals = ['Kroger', 'Target', 'Whole Foods'].map((store) => ({
    store,
    total: products.reduce((sum, product) => sum + (product.offers.find((offer) => offer.store === store)?.price || 0), 0),
  }));
  const spread = Math.max(...storeTotals.map((store) => store.total)) - Math.min(...storeTotals.map((store) => store.total));
  const metrics = [
    { label: 'Sample catalog', value: '12 staples', note: 'Illustrative products' },
    { label: 'Sample retailers', value: '3 stores', note: 'Not local price feeds' },
    { label: 'Best shown item-by-item', value: money(itemwiseTotal), note: 'Before travel, offers, or tax' },
    { label: 'Store spread', value: money(spread), note: 'Sample totals only' },
  ];
  const requirements = [
    'The exact same item and package size',
    'Prices observed at similar times and shopping channels',
    'Promotion and loyalty conditions shown separately',
    'Repeated observations across enough stores to report a pattern',
  ];
  return (
    <AppScreen>
      <ScreenTitle title="See the price landscape with context." subtitle="A pilot view of the questions our local research layer will answer." />
      <SampleNotice>These sample comparisons do not establish why prices differ. There are no neighborhood-level observations or fairness findings here.</SampleNotice>
      <View style={styles.metricGrid}>
        {metrics.map((metric) => <Surface key={metric.label} style={styles.metric}><Text style={styles.metricLabel}>{metric.label}</Text><Text style={styles.metricValue}>{metric.value}</Text><Text style={styles.metricNote}>{metric.note}</Text></Surface>)}
      </View>
      <SectionTitle title="What a responsible comparison needs" />
      <Surface style={styles.list}>
        {requirements.map((item, index) => <View key={item} style={styles.listRow}><Text style={styles.listNumber}>0{index + 1}</Text><Text style={styles.listText}>{item}</Text></View>)}
      </Surface>
      <Text style={styles.disclaimer}>We’ll describe observed differences and uncertainty. A price gap by itself does not establish its cause.</Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  metricGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  metric: { width: '47%', minHeight: 98, padding: 12, gap: 4 },
  metricLabel: { color: colors.muted, fontSize: 9, fontWeight: '600' },
  metricValue: { color: colors.ink, fontSize: 19, fontWeight: '800', marginTop: 2 },
  metricNote: { color: '#899087', fontSize: 9 },
  list: { paddingVertical: 3 }, listRow: { flexDirection: 'row', gap: 11, paddingVertical: 12, borderBottomColor: '#eef0e9', borderBottomWidth: 1 },
  listNumber: { color: colors.green, fontSize: 9, fontWeight: '800', paddingTop: 2 }, listText: { flex: 1, color: colors.ink, fontSize: 11, lineHeight: 16 },
  disclaimer: { color: colors.muted, fontSize: 10, lineHeight: 15, paddingHorizontal: 2 },
});
