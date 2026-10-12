import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppScreen, colors, SampleNotice, ScreenTitle, Surface } from '../../components/screen';
import { sampleCoupons, SampleCoupon } from '../../data/coupons';
import { money, products } from '../../data/products';
import { useBasket } from '../../context/basket-context';

export default function CouponsScreen() {
  const { basket, addToBasket, applyCoupon, appliedCoupon } = useBasket();
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState('');

  const checkCode = (rawCode: string) => {
    const match = sampleCoupons.find((offer) => offer.code === rawCode.trim().toUpperCase());
    if (!match) { setFeedback('That code is not in the illustrative sample list.'); return; }
    if (!basket[match.productId]) { setFeedback(`Add ${products.find((product) => product.id === match.productId)?.name} to your basket before applying ${match.code}.`); return; }
    applyCoupon(match.code);
    setFeedback(`${match.code} added to your sample basket. Retailer checkout has not validated this offer.`);
  };

  const offerCard = (offer: SampleCoupon) => {
    const product = products.find((item) => item.id === offer.productId)!;
    const inBasket = Boolean(basket[offer.productId]);
    const isApplied = appliedCoupon === offer.code;
    return (
      <Surface key={offer.code} style={styles.offer}>
        <View style={styles.offerTop}><Text style={styles.offerTag}>SAMPLE OFFER</Text><Text style={styles.retailer}>{offer.retailer}</Text></View>
        <Text accessibilityRole="header" style={styles.offerTitle}>{offer.title}</Text>
        <Text style={styles.offerMeta}>{product.name} · {offer.terms}</Text>
        <View style={styles.offerBottom}><Text style={styles.code}>{offer.code} · {money(offer.discount)} off</Text>
          <Pressable accessibilityRole="button" accessibilityLabel={inBasket ? `Apply sample coupon ${offer.code}` : `Add ${product.name} to basket`} onPress={() => inBasket ? checkCode(offer.code) : (addToBasket(offer.productId), setFeedback(`${product.name} added. Tap the offer again to add the sample discount.`))} style={[styles.action, isApplied && styles.applied]}>
            <Text style={[styles.actionText, isApplied && styles.appliedText]}>{isApplied ? 'Applied' : inBasket ? 'Apply sample' : 'Add item'}</Text>
          </Pressable>
        </View>
      </Surface>
    );
  };

  return (
    <AppScreen>
      <ScreenTitle title="Coupon checker" subtitle="Try sample offers against your BasketWise list." />
      <SampleNotice>Illustrative offers only. No retailer code, loyalty requirement, or checkout eligibility has been verified.</SampleNotice>
      <Surface style={styles.codeBox}>
        <Text style={styles.label}>Have a sample offer code?</Text>
        <View style={styles.formRow}>
          <TextInput value={code} onChangeText={setCode} onSubmitEditing={() => checkCode(code)} autoCapitalize="characters" placeholder="e.g. BASKET1" placeholderTextColor="#8a9187" accessibilityLabel="Sample coupon code" style={styles.input} returnKeyType="done" />
          <Pressable accessibilityRole="button" onPress={() => checkCode(code)} style={styles.checkButton}><Text style={styles.checkText}>Check</Text></Pressable>
        </View>
        {feedback ? <Text accessibilityRole="alert" style={styles.feedback}>{feedback}</Text> : null}
      </Surface>
      <Text style={styles.sectionLabel}>Offers to explore</Text>
      {sampleCoupons.map(offerCard)}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  codeBox: { padding: 14, gap: 9 }, label: { color: colors.ink, fontSize: 12, fontWeight: '700' },
  formRow: { flexDirection: 'row', gap: 8 }, input: { flex: 1, height: 42, paddingHorizontal: 11, borderWidth: 1, borderColor: colors.line, borderRadius: 7, color: colors.ink, fontSize: 12 },
  checkButton: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, borderRadius: 7, backgroundColor: colors.green }, checkText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  feedback: { color: colors.greenDark, backgroundColor: '#f1f6ef', padding: 9, borderRadius: 6, fontSize: 10, lineHeight: 15 },
  sectionLabel: { color: colors.ink, fontSize: 16, fontWeight: '700', marginTop: 2 },
  offer: { gap: 8, padding: 14 }, offerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  offerTag: { color: '#8b6c2a', fontSize: 8, fontWeight: '800', letterSpacing: 1 }, retailer: { color: colors.muted, fontSize: 10, fontWeight: '600' },
  offerTitle: { color: colors.ink, fontSize: 15, fontWeight: '700' }, offerMeta: { color: colors.muted, fontSize: 10, lineHeight: 15 },
  offerBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingTop: 4 }, code: { color: colors.greenDark, fontSize: 10, fontWeight: '700' },
  action: { backgroundColor: colors.green, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 9 }, actionText: { color: colors.white, fontSize: 10, fontWeight: '700' },
  applied: { backgroundColor: colors.mint }, appliedText: { color: colors.greenDark },
});
