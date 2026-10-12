import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppScreen, colors, SampleNotice, ScreenTitle, SectionTitle, Surface } from '../../components/screen';
import { lowestOffer, money, products, stores } from '../../data/products';
import { sampleCoupons } from '../../data/coupons';
import { useBasket } from '../../context/basket-context';

export default function BasketScreen() {
  const { basket, addToBasket, removeFromBasket, appliedCoupon, applyCoupon } = useBasket();
  const [extraStopCost, setExtraStopCost] = useState('3');
  const items = products.filter((product) => basket[product.id]);
  const itemCount = Object.values(basket).reduce((sum, quantity) => sum + quantity, 0);
  const totals = useMemo(() => stores.map((store) => ({
    store,
    total: items.reduce((sum, product) => sum + (product.offers.find((offer) => offer.store === store)?.price || 0) * basket[product.id], 0),
  })), [items, basket]);
  const bestSingle = [...totals].sort((a, b) => a.total - b.total)[0];
  const splitTotal = items.reduce((sum, product) => sum + lowestOffer(product).price * basket[product.id], 0);
  const splitStops = new Set(items.map((product) => lowestOffer(product).store)).size;
  const extraCost = Number(extraStopCost) * Math.max(0, splitStops - 1);
  const coupon = sampleCoupons.find((offer) => offer.code === appliedCoupon && basket[offer.productId]);
  const savings = coupon ? Math.min(basket[coupon.productId], 1) * coupon.discount : 0;

  return (
    <AppScreen>
      <ScreenTitle title="Your basket" subtitle="Compare one-store and item-by-item totals before you make another stop." />
      <SampleNotice>Planning estimate only. Prices and coupons are samples; taxes, routes, inventory, and checkout totals are not included.</SampleNotice>
      {items.length === 0 ? (
        <Surface style={styles.empty}><Text style={styles.emptyIcon}>◫</Text><Text style={styles.emptyTitle}>Your basket is waiting</Text><Text style={styles.copy}>Add staples from Compare to see totals across three sample stores.</Text></Surface>
      ) : (
        <>
          <SectionTitle title={`${itemCount} ${itemCount === 1 ? 'item' : 'items'}`} />
          {items.map((product) => (
            <Surface key={product.id} style={styles.itemRow}>
              <Text style={styles.itemEmoji}>{product.emoji}</Text>
              <View style={styles.itemInfo}><Text style={styles.itemName}>{product.name}</Text><Text style={styles.copy}>Lowest shown · {lowestOffer(product).store} · {money(lowestOffer(product).price)} each</Text></View>
              <View style={styles.quantity}>
                <Pressable accessibilityRole="button" accessibilityLabel={`Remove one ${product.name}`} onPress={() => removeFromBasket(product.id)} style={styles.quantityButton}><Text style={styles.quantityText}>−</Text></Pressable>
                <Text style={styles.quantityValue}>{basket[product.id]}</Text>
                <Pressable accessibilityRole="button" accessibilityLabel={`Add one ${product.name}`} onPress={() => addToBasket(product.id)} style={styles.quantityButton}><Text style={styles.quantityText}>+</Text></Pressable>
              </View>
            </Surface>
          ))}
          <Surface style={styles.planner}>
            <Text style={styles.kicker}>LOWEST SINGLE STORE</Text>
            <Text style={styles.bigTotal}>{money(bestSingle.total)}</Text>
            <Text style={styles.copy}>at {bestSingle.store} · before discounts and travel</Text>
            <View style={styles.divider} />
            <Text style={styles.kicker}>BEST SHOWN PRICE PER ITEM</Text>
            <Text style={styles.bigTotal}>{money(splitTotal)}</Text>
            <Text style={styles.copy}>{splitStops} {splitStops === 1 ? 'store' : 'stores'} · extra stop estimate: {money(extraCost)}</Text>
            <View style={styles.travelInputRow}><Text style={styles.travelLabel}>Estimated cost per extra stop</Text><View style={styles.moneyInput}><Text style={styles.dollar}>$</Text><TextInput keyboardType="decimal-pad" accessibilityLabel="Estimated cost per extra store stop" value={extraStopCost} onChangeText={setExtraStopCost} style={styles.travelField} /></View></View>
            <View style={styles.compareCallout}><Text style={styles.calloutText}>{splitTotal + extraCost < bestSingle.total ? 'Split shopping looks lower after your stop estimate.' : 'One store looks better after your stop estimate.'}</Text></View>
            {coupon ? <View style={styles.savingRow}><Text style={styles.savingsText}>Sample coupon · {coupon.code}</Text><Text style={styles.savingsText}>−{money(savings)}</Text></View> : null}
            <View style={styles.totalRow}><Text style={styles.totalLabel}>Estimated basket total</Text><Text style={styles.total}>{money(Math.max(0, Math.min(bestSingle.total, splitTotal + extraCost) - savings))}</Text></View>
            {coupon ? <Pressable onPress={() => applyCoupon(null)} accessibilityRole="button" style={styles.clearCoupon}><Text style={styles.clearCouponText}>Remove sample coupon</Text></Pressable> : null}
          </Surface>
          <SectionTitle title="Single-store totals" />
          <Surface style={styles.storeTotals}>{totals.map((row) => <View key={row.store} style={styles.storeTotal}><Text style={styles.storeText}>{row.store}{row.store === bestSingle.store ? ' · Lowest single-store' : ''}</Text><Text style={styles.storePrice}>{money(row.total)}</Text></View>)}</Surface>
        </>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', paddingVertical: 34, gap: 8 }, emptyIcon: { color: '#91a18e', fontSize: 28 },
  emptyTitle: { color: colors.ink, fontWeight: '700', fontSize: 15 }, copy: { color: colors.muted, fontSize: 11, lineHeight: 16 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 11 }, itemEmoji: { fontSize: 23 },
  itemInfo: { flex: 1, gap: 3 }, itemName: { color: colors.ink, fontSize: 12, fontWeight: '700' },
  quantity: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  quantityButton: { width: 26, height: 26, borderWidth: 1, borderColor: colors.line, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  quantityText: { color: colors.green, fontSize: 16, fontWeight: '600', lineHeight: 19 }, quantityValue: { minWidth: 12, textAlign: 'center', color: colors.ink, fontSize: 12, fontWeight: '700' },
  planner: { gap: 6, padding: 16 }, kicker: { color: '#71806f', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  bigTotal: { color: colors.ink, fontSize: 25, lineHeight: 30, fontWeight: '800', letterSpacing: -0.5 },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 8 },
  travelInputRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 4 },
  travelLabel: { color: colors.muted, fontSize: 10, flex: 1 },
  moneyInput: { width: 80, height: 34, flexDirection: 'row', alignItems: 'center', borderColor: colors.line, borderWidth: 1, borderRadius: 6, paddingHorizontal: 9, backgroundColor: colors.white },
  dollar: { color: colors.muted, fontSize: 12 }, travelField: { flex: 1, color: colors.ink, fontSize: 12, textAlign: 'right', padding: 0 },
  compareCallout: { backgroundColor: colors.mint, borderRadius: 7, padding: 10, marginTop: 3 }, calloutText: { color: colors.greenDark, fontSize: 11, lineHeight: 16, fontWeight: '600' },
  savingRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 9 }, savingsText: { color: colors.green, fontSize: 11, fontWeight: '700' },
  totalRow: { borderTopWidth: 1, borderColor: colors.line, paddingTop: 11, marginTop: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  totalLabel: { color: colors.ink, fontSize: 12, fontWeight: '700' }, total: { color: colors.greenDark, fontSize: 18, fontWeight: '800' },
  clearCoupon: { alignSelf: 'flex-start', paddingTop: 5 }, clearCouponText: { color: colors.muted, fontSize: 10, textDecorationLine: 'underline' },
  storeTotals: { paddingVertical: 2 }, storeTotal: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f1ed' },
  storeText: { color: colors.ink, fontSize: 11 }, storePrice: { color: colors.ink, fontSize: 11, fontWeight: '700' },
});
