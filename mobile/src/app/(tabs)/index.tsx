import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppScreen, colors, SampleNotice, ScreenTitle, SectionTitle } from '../../components/screen';
import { ProductCard } from '../../components/product-card';
import { products, stores, StoreName } from '../../data/products';
import { useBasket } from '../../context/basket-context';

export default function CompareScreen() {
  const [query, setQuery] = useState('');
  const [retailer, setRetailer] = useState<StoreName | 'All stores'>('All stores');
  const { basket, watchlist, addToBasket, toggleWatch } = useBasket();
  const matches = useMemo(() => products.filter((product) => {
    const textMatch = `${product.name} ${product.detail}`.toLowerCase().includes(query.toLowerCase().trim());
    const storeMatch = retailer === 'All stores' || product.offers.some((offer) => offer.store === retailer);
    return textMatch && storeMatch;
  }), [query, retailer]);

  return (
    <AppScreen>
      <View style={styles.brandRow}><View style={styles.brandMark}><Text style={styles.brandLetter}>b</Text></View><Text style={styles.brandName}>basketwise</Text><View style={styles.location}><Text style={styles.locationDot}>⌖</Text><Text style={styles.locationText}>Goshen, Indiana</Text></View></View>
      <ScreenTitle title="Make every grocery dollar go a little further." subtitle="Compare staples at nearby stores and build a basket that works for you." />
      <TextInput value={query} onChangeText={setQuery} placeholder="Search milk, eggs, chicken…" placeholderTextColor="#8a9187" returnKeyType="search" accessibilityLabel="Search grocery products" style={styles.search} />
      <SampleNotice>Sample prices only. These are not live retailer prices. We’ll label verified prices with their store, source, and observation time.</SampleNotice>
      <SectionTitle title="Staples near you" trailing={`${matches.length} sample items`} />
      <View style={styles.filters}>
        {(['All stores', ...stores] as const).map((name) => (
          <Pressable key={name} accessibilityRole="button" accessibilityState={{ selected: retailer === name }} onPress={() => setRetailer(name)} style={[styles.filter, retailer === name && styles.filterActive]}>
            <Text style={[styles.filterText, retailer === name && styles.filterTextActive]}>{name}</Text>
          </Pressable>
        ))}
      </View>
      {matches.length ? matches.map((product) => (
        <ProductCard key={product.id} product={product} quantity={basket[product.id] || 0} watching={watchlist.includes(product.id)} onAdd={() => addToBasket(product.id)} onWatch={() => toggleWatch(product.id)} />
      )) : (
        <View style={styles.empty}><Text style={styles.emptyTitle}>No matching staples</Text><Text style={styles.emptyCopy}>Try a different search or choose another store.</Text></View>
      )}
      <View style={styles.footer}><Text style={styles.footerTitle}>Built around trust</Text><Text style={styles.footerCopy}>No personal shopping data sold. No hidden sponsored rankings.</Text></View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingBottom: 5 },
  brandMark: { width: 29, height: 29, borderRadius: 9, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  brandLetter: { color: colors.white, fontWeight: '800', fontSize: 19, lineHeight: 22 },
  brandName: { color: colors.ink, fontSize: 16, fontWeight: '800', letterSpacing: -0.5 },
  location: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 7, paddingHorizontal: 9, borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white },
  locationDot: { color: colors.green, fontSize: 14 },
  locationText: { color: colors.ink, fontSize: 10, fontWeight: '600' },
  search: { height: 46, borderRadius: 8, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.white, paddingHorizontal: 14, fontSize: 13, color: colors.ink },
  filters: { flexDirection: 'row', gap: 7, flexWrap: 'wrap', marginTop: -7 },
  filter: { borderColor: colors.line, backgroundColor: colors.white, borderWidth: 1, borderRadius: 18, paddingHorizontal: 11, paddingVertical: 7 },
  filterActive: { borderColor: '#d8e6d6', backgroundColor: colors.mint },
  filterText: { color: colors.muted, fontSize: 10, fontWeight: '600' },
  filterTextActive: { color: colors.greenDark },
  empty: { padding: 20, borderRadius: 10, backgroundColor: colors.white, alignItems: 'center', gap: 5 },
  emptyTitle: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  emptyCopy: { color: colors.muted, textAlign: 'center', fontSize: 12 },
  footer: { padding: 14, borderRadius: 9, backgroundColor: '#edf2e9', gap: 4 },
  footerTitle: { color: colors.greenDark, fontSize: 12, fontWeight: '700' },
  footerCopy: { color: colors.muted, fontSize: 11, lineHeight: 16 },
});
