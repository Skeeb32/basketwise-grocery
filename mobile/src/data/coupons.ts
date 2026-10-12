export type SampleCoupon = { code: string; retailer: string; productId: string; title: string; terms: string; discount: number };

export const sampleCoupons: SampleCoupon[] = [
  { code: 'BASKET1', retailer: 'Kroger', productId: 'milk', title: '$0.50 off a gallon of milk', terms: 'One per basket · sample offer', discount: 0.5 },
  { code: 'EGGSMART', retailer: 'Target', productId: 'eggs', title: '$0.75 off large white eggs', terms: '12-count package · sample offer', discount: 0.75 },
  { code: 'PANTRY25', retailer: 'Target', productId: 'rice', title: '$0.25 off long grain rice', terms: 'One package · sample offer', discount: 0.25 },
  { code: 'PASTA20', retailer: 'Kroger', productId: 'pasta', title: '$0.20 off penne pasta', terms: '16 oz package · sample offer', discount: 0.2 },
];
