export type StoreName = 'Kroger' | 'Target' | 'Whole Foods';

export type Offer = { store: StoreName; price: number };

export type Product = {
  id: string;
  name: string;
  detail: string;
  unit: string;
  emoji: string;
  offers: Offer[];
};

export const stores: StoreName[] = ['Kroger', 'Target', 'Whole Foods'];

export const products: Product[] = [
  { id: 'milk', name: 'Whole milk', detail: 'Gallon · 128 fl oz', unit: '$0.02 / fl oz', emoji: '🥛', offers: [{ store: 'Kroger', price: 3.0 }, { store: 'Target', price: 3.1 }, { store: 'Whole Foods', price: 3.29 }] },
  { id: 'eggs', name: 'Large white eggs', detail: 'Grade A · 12 count', unit: '$0.25 / egg', emoji: '🥚', offers: [{ store: 'Kroger', price: 3.49 }, { store: 'Target', price: 2.99 }, { store: 'Whole Foods', price: 3.79 }] },
  { id: 'bread', name: 'Whole wheat bread', detail: '20 oz · sliced', unit: '$0.14 / oz', emoji: '🍞', offers: [{ store: 'Kroger', price: 2.79 }, { store: 'Target', price: 2.89 }, { store: 'Whole Foods', price: 4.29 }] },
  { id: 'chicken', name: 'Chicken breast', detail: 'Boneless · approx. 1 lb', unit: '$5.49 / lb', emoji: '🍗', offers: [{ store: 'Kroger', price: 5.49 }, { store: 'Target', price: 5.99 }, { store: 'Whole Foods', price: 7.99 }] },
  { id: 'rice', name: 'Long grain rice', detail: '2 lb bag · enriched', unit: '$0.06 / oz', emoji: '🍚', offers: [{ store: 'Kroger', price: 2.19 }, { store: 'Target', price: 1.99 }, { store: 'Whole Foods', price: 3.49 }] },
  { id: 'cereal', name: 'Honey oat cereal', detail: 'Family size · 18 oz', unit: '$0.18 / oz', emoji: '🥣', offers: [{ store: 'Kroger', price: 3.49 }, { store: 'Target', price: 3.29 }, { store: 'Whole Foods', price: 4.99 }] },
  { id: 'apples', name: 'Gala apples', detail: 'Per pound · loose', unit: '$1.49 / lb', emoji: '🍎', offers: [{ store: 'Kroger', price: 1.49 }, { store: 'Target', price: 1.69 }, { store: 'Whole Foods', price: 2.49 }] },
  { id: 'yogurt', name: 'Plain Greek yogurt', detail: '32 oz · whole milk', unit: '$0.09 / oz', emoji: '🥣', offers: [{ store: 'Kroger', price: 3.29 }, { store: 'Target', price: 2.99 }, { store: 'Whole Foods', price: 4.49 }] },
  { id: 'pasta', name: 'Penne pasta', detail: '16 oz · durum wheat', unit: '$0.09 / oz', emoji: '🍝', offers: [{ store: 'Kroger', price: 1.49 }, { store: 'Target', price: 1.39 }, { store: 'Whole Foods', price: 2.49 }] },
  { id: 'spinach', name: 'Baby spinach', detail: '5 oz · washed', unit: '$0.56 / oz', emoji: '🥬', offers: [{ store: 'Kroger', price: 2.99 }, { store: 'Target', price: 2.79 }, { store: 'Whole Foods', price: 3.49 }] },
  { id: 'beans', name: 'Black beans', detail: '15 oz · no salt added', unit: '$0.07 / oz', emoji: '🫘', offers: [{ store: 'Kroger', price: 1.19 }, { store: 'Target', price: 1.09 }, { store: 'Whole Foods', price: 1.79 }] },
  { id: 'butter', name: 'Salted butter', detail: '1 lb · four sticks', unit: '$0.28 / oz', emoji: '🧈', offers: [{ store: 'Kroger', price: 4.49 }, { store: 'Target', price: 4.99 }, { store: 'Whole Foods', price: 5.49 }] },
];

export const money = (amount: number) => `$${amount.toFixed(2)}`;

export function lowestOffer(product: Product): Offer {
  return product.offers.reduce((best, offer) => offer.price < best.price ? offer : best);
}
