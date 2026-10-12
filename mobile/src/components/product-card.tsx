import { Pressable, StyleSheet, Text, View } from 'react-native';
import { lowestOffer, money, Product } from '../data/products';
import { colors, Surface } from './screen';

export function ProductCard({ product, quantity, watching, onAdd, onWatch }: {
  product: Product; quantity: number; watching: boolean; onAdd: () => void; onWatch: () => void;
}) {
  const low = lowestOffer(product);
  return (
    <Surface style={styles.card}>
      <View style={styles.headingRow}>
        <View style={styles.emoji}><Text style={styles.emojiText}>{product.emoji}</Text></View>
        <View style={styles.productInfo}>
          <Text accessibilityRole="header" style={styles.name}>{product.name}</Text>
          <Text style={styles.detail}>{product.detail} · {product.unit}</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel={`${watching ? 'Remove' : 'Add'} ${product.name} ${watching ? 'from' : 'to'} price watch`} onPress={onWatch} hitSlop={8} style={styles.watchButton}>
          <Text style={[styles.watchIcon, watching && styles.watching]}>{watching ? '★' : '☆'}</Text>
        </Pressable>
      </View>
      <View style={styles.priceRows}>
        {product.offers.map((offer) => {
          const isLowest = offer.store === low.store;
          return (
            <View key={offer.store} style={[styles.priceRow, isLowest && styles.lowestRow]}>
              <View style={styles.storeLabel}><View style={[styles.storeDot, isLowest && styles.lowDot]} /><Text style={styles.store}>{offer.store}</Text></View>
              <Text style={[styles.price, isLowest && styles.lowPrice]}>{money(offer.price)}</Text>
              {isLowest ? <Text style={styles.lowLabel}>LOWEST SHOWN</Text> : null}
            </View>
          );
        })}
      </View>
      <View style={styles.cardActions}>
        <Text style={styles.lowestSummary}>Best shown: {low.store} · {money(low.price)}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel={`Add ${product.name} to basket`} onPress={onAdd} style={styles.addButton}>
          <Text style={styles.addButtonText}>{quantity ? `Add another · ${quantity} in list` : 'Add to basket'}  +</Text>
        </Pressable>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: { gap: 12, padding: 13 },
  headingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  emoji: { width: 42, height: 42, borderRadius: 9, backgroundColor: '#f5f3ec', alignItems: 'center', justifyContent: 'center' },
  emojiText: { fontSize: 23 },
  productInfo: { flex: 1, gap: 3 },
  name: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  detail: { color: colors.muted, fontSize: 10, lineHeight: 14 },
  watchButton: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.soft, alignItems: 'center', justifyContent: 'center' },
  watchIcon: { color: '#748174', fontSize: 21 },
  watching: { color: '#9b742b' },
  priceRows: { borderTopWidth: 1, borderColor: '#f0f1ed', paddingTop: 5, gap: 2 },
  priceRow: { minHeight: 36, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, borderRadius: 6 },
  lowestRow: { backgroundColor: '#f1f6ef' },
  storeLabel: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 7 },
  storeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#9aa398' },
  lowDot: { backgroundColor: colors.green },
  store: { fontSize: 12, color: colors.ink },
  price: { color: colors.ink, fontSize: 13, fontWeight: '600', minWidth: 54, textAlign: 'right' },
  lowPrice: { color: colors.greenDark, fontWeight: '800' },
  lowLabel: { width: 86, textAlign: 'right', color: colors.green, fontSize: 8, fontWeight: '800', letterSpacing: 0.3 },
  cardActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  lowestSummary: { flex: 1, color: colors.muted, fontSize: 10, lineHeight: 14 },
  addButton: { backgroundColor: colors.green, borderRadius: 7, paddingHorizontal: 12, paddingVertical: 10 },
  addButtonText: { color: colors.white, fontSize: 11, fontWeight: '700' },
});
