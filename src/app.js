const products = [
  { id: 'milk', name: 'Whole milk', detail: 'Gallon · 128 fl oz', unit: '$0.02 / fl oz', emoji: '🥛', tone: 'blue', category: 'Dairy', offers: [{ store: 'Kroger', price: 3.00, unit: '$0.02 / fl oz' }, { store: 'Target', price: 3.10, unit: '$0.02 / fl oz' }, { store: 'Whole Foods', price: 3.29, unit: '$0.03 / fl oz' }] },
  { id: 'eggs', name: 'Large white eggs', detail: 'Grade A · 12 count', unit: '$0.25 / egg', emoji: '🥚', tone: 'yellow', category: 'Dairy', offers: [{ store: 'Kroger', price: 3.49, unit: '$0.29 / egg' }, { store: 'Target', price: 2.99, unit: '$0.25 / egg' }, { store: 'Whole Foods', price: 3.79, unit: '$0.32 / egg' }] },
  { id: 'bread', name: 'Whole wheat bread', detail: '20 oz · sliced', unit: '$0.14 / oz', emoji: '🍞', tone: 'yellow', category: 'Bakery', offers: [{ store: 'Kroger', price: 2.79, unit: '$0.14 / oz' }, { store: 'Target', price: 2.89, unit: '$0.14 / oz' }, { store: 'Whole Foods', price: 4.29, unit: '$0.21 / oz' }] },
  { id: 'chicken', name: 'Chicken breast', detail: 'Boneless · approx. 1 lb', unit: '$4.99 / lb', emoji: '🍗', tone: 'pink', category: 'Meat', offers: [{ store: 'Kroger', price: 5.49, unit: '$5.49 / lb' }, { store: 'Target', price: 5.99, unit: '$5.99 / lb' }, { store: 'Whole Foods', price: 7.99, unit: '$7.99 / lb' }] },
  { id: 'rice', name: 'Long grain rice', detail: '2 lb bag · enriched', unit: '$0.06 / oz', emoji: '🍚', tone: 'green', category: 'Pantry', offers: [{ store: 'Kroger', price: 2.19, unit: '$0.07 / oz' }, { store: 'Target', price: 1.99, unit: '$0.06 / oz' }, { store: 'Whole Foods', price: 3.49, unit: '$0.11 / oz' }] },
  { id: 'cereal', name: 'Honey oat cereal', detail: 'Family size · 18 oz', unit: '$0.19 / oz', emoji: '🥣', tone: 'yellow', category: 'Pantry', offers: [{ store: 'Kroger', price: 3.49, unit: '$0.19 / oz' }, { store: 'Target', price: 3.29, unit: '$0.18 / oz' }, { store: 'Whole Foods', price: 4.99, unit: '$0.28 / oz' }] },
  { id: 'apples', name: 'Gala apples', detail: 'Per pound · loose', unit: '$1.49 / lb', emoji: '🍎', tone: 'pink', category: 'Produce', offers: [{ store: 'Kroger', price: 1.49, unit: '$1.49 / lb' }, { store: 'Target', price: 1.69, unit: '$1.69 / lb' }, { store: 'Whole Foods', price: 2.49, unit: '$2.49 / lb' }] },
  { id: 'yogurt', name: 'Plain Greek yogurt', detail: '32 oz · whole milk', unit: '$0.09 / oz', emoji: '🥣', tone: 'blue', category: 'Dairy', offers: [{ store: 'Kroger', price: 3.29, unit: '$0.10 / oz' }, { store: 'Target', price: 2.99, unit: '$0.09 / oz' }, { store: 'Whole Foods', price: 4.49, unit: '$0.14 / oz' }] },
  { id: 'pasta', name: 'Penne pasta', detail: '16 oz · durum wheat', unit: '$0.09 / oz', emoji: '🍝', tone: 'yellow', category: 'Pantry', offers: [{ store: 'Kroger', price: 1.49, unit: '$0.09 / oz' }, { store: 'Target', price: 1.39, unit: '$0.09 / oz' }, { store: 'Whole Foods', price: 2.49, unit: '$0.16 / oz' }] },
  { id: 'spinach', name: 'Baby spinach', detail: '5 oz · washed', unit: '$0.60 / oz', emoji: '🥬', tone: 'green', category: 'Produce', offers: [{ store: 'Kroger', price: 2.99, unit: '$0.60 / oz' }, { store: 'Target', price: 2.79, unit: '$0.56 / oz' }, { store: 'Whole Foods', price: 3.49, unit: '$0.70 / oz' }] },
  { id: 'beans', name: 'Black beans', detail: '15 oz · no salt added', unit: '$0.08 / oz', emoji: '🫘', tone: 'pink', category: 'Pantry', offers: [{ store: 'Kroger', price: 1.19, unit: '$0.08 / oz' }, { store: 'Target', price: 1.09, unit: '$0.07 / oz' }, { store: 'Whole Foods', price: 1.79, unit: '$0.12 / oz' }] },
  { id: 'butter', name: 'Salted butter', detail: '1 lb · four sticks', unit: '$0.31 / oz', emoji: '🧈', tone: 'yellow', category: 'Dairy', offers: [{ store: 'Kroger', price: 4.49, unit: '$0.28 / oz' }, { store: 'Target', price: 4.99, unit: '$0.31 / oz' }, { store: 'Whole Foods', price: 5.49, unit: '$0.34 / oz' }] },
];
const state = { query: '', retailer: 'all', basket: JSON.parse(localStorage.getItem('basketwise-basket') || '{}'), budget: Number(localStorage.getItem('basketwise-budget') || 0), toastTimer: null };
const money = value => `$${value.toFixed(2)}`;
const byPrice = product => [...product.offers].sort((a,b) => a.price - b.price);
function renderProducts() {
  const matches = products.filter(p => p.name.toLowerCase().includes(state.query.toLowerCase()) && (state.retailer === 'all' || p.offers.some(o => o.store === state.retailer)));
  document.querySelector('#empty-state').hidden = matches.length > 0;
  document.querySelector('#results-list').innerHTML = matches.map(product => {
    const offers = byPrice(product), best = offers[0];
    return `<article class="product-card"><div class="product-art" data-tone="${product.tone}" aria-hidden="true">${product.emoji}</div><div class="product-name"><h3>${product.name}</h3><p>${product.detail}</p><span class="unit-note">Unit price comparison</span></div><div class="offers">${offers.map(offer => `<div class="offer ${offer.store === best.store ? 'best' : ''}"><div class="offer-head"><i class="retailer-mini ${retailerClass(offer.store)}"></i>${offer.store}</div><div class="offer-price">${money(offer.price)}</div><div class="offer-unit">${offer.unit}</div>${offer.store === best.store ? '<div class="best-label">Lowest shown</div>' : ''}</div>`).join('')}</div><button class="add-button" data-add="${product.id}" aria-label="Add ${product.name} to basket">+</button></article>`;
  }).join('');
}
function retailerClass(store) { return store === 'Kroger' ? 'kroger' : store === 'Target' ? 'target' : 'whole'; }
function renderBasket() {
  const entries = Object.entries(state.basket).filter(([,qty]) => qty > 0);
  const totalCount = entries.reduce((sum,[,qty]) => sum + qty, 0);
  document.querySelector('#nav-count').textContent = totalCount;
  document.querySelector('#basket-total-count').textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;
  const basketItems = document.querySelector('#basket-items');
  document.querySelector('#basket-summary').hidden = entries.length === 0;
  if (!entries.length) { basketItems.innerHTML = '<div class="basket-empty"><span class="basket-illustration">◫</span><strong>Your basket is waiting</strong><p>Add a few staples to compare your total across stores.</p></div>'; return; }
  basketItems.innerHTML = entries.map(([id,qty]) => { const p = products.find(item => item.id === id); return `<div class="basket-line"><span class="basket-emoji">${p.emoji}</span><span class="basket-line-name"><strong>${p.name}</strong><small>from ${byPrice(p)[0].store} · ${money(byPrice(p)[0].price)} ea.</small></span><span class="quantity-control"><button data-qty="${id}" data-change="-1" aria-label="Remove one ${p.name}">−</button><span>${qty}</span><button data-qty="${id}" data-change="1" aria-label="Add one ${p.name}">+</button></span></div>`; }).join('');
  const totals = ['Kroger','Target','Whole Foods'].map(store => ({store,total:entries.reduce((sum,[id,qty]) => sum + products.find(p => p.id === id).offers.find(o => o.store === store).price*qty,0)})).sort((a,b)=>a.total-b.total);
  document.querySelector('#basket-total').textContent = money(totals[0].total);
  document.querySelector('#summary-store').textContent = `at ${totals[0].store} · ${totals[1].store} ${money(totals[1].total)} · ${totals[2].store} ${money(totals[2].total)}`;
  const percent = state.budget ? Math.min(100, totals[0].total/state.budget*100) : 0;
  document.querySelector('#budget-progress').style.width = `${percent}%`;
  document.querySelector('#budget-button').innerHTML = state.budget ? `${money(state.budget)} <span>✎</span>` : 'Set budget <span>＋</span>';
  document.querySelector('#budget-copy').textContent = state.budget ? `${percent >= 100 ? 'Over budget by ' + money(totals[0].total-state.budget) : money(state.budget-totals[0].total) + ' left'} in your weekly budget.` : 'Set a budget to see how your basket fits.';
}
function toast(message) { const el=document.querySelector('#toast');el.textContent=message;el.classList.add('show');clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>el.classList.remove('show'),2400); }
function persist() { localStorage.setItem('basketwise-basket',JSON.stringify(state.basket));renderBasket(); }
document.querySelector('#search-form').addEventListener('submit', event => { event.preventDefault();state.query=document.querySelector('#search-input').value.trim();renderProducts(); });
document.querySelector('#search-input').addEventListener('input', event => { state.query=event.target.value.trim();renderProducts(); });
document.querySelectorAll('.filter-pill[data-retailer]').forEach(button => button.addEventListener('click',()=>{document.querySelectorAll('.filter-pill[data-retailer]').forEach(item=>item.classList.remove('active'));button.classList.add('active');state.retailer=button.dataset.retailer;renderProducts();}));
document.querySelector('#results-list').addEventListener('click',event=>{const add=event.target.closest('[data-add]');if(!add)return;const id=add.dataset.add;state.basket[id]=(state.basket[id]||0)+1;persist();toast(`${products.find(p=>p.id===id).name} added to your basket`);});
document.querySelector('#basket-items').addEventListener('click',event=>{const button=event.target.closest('[data-qty]');if(!button)return;const id=button.dataset.qty;state.basket[id]=(state.basket[id]||0)+Number(button.dataset.change);if(state.basket[id]<=0)delete state.basket[id];persist();});
const budgetDialog=document.querySelector('#budget-dialog');document.querySelector('#budget-button').addEventListener('click',()=>{document.querySelector('#budget-input').value=state.budget||'';budgetDialog.showModal();});
document.querySelector('#budget-form').addEventListener('submit',event=>{if(event.submitter?.id==='save-budget'){event.preventDefault();const value=Number(document.querySelector('#budget-input').value);if(value>0){state.budget=value;localStorage.setItem('basketwise-budget',String(value));budgetDialog.close();renderBasket();toast('Weekly budget saved on this device');}}});
document.querySelector('#optimize-button').addEventListener('click',()=>{const count=Object.values(state.basket).reduce((sum,qty)=>sum+qty,0);toast(count>0?'Basket totals compare one store at a time; multi-store planning is on the roadmap.':'Add products to compare your basket.');});
document.querySelector('#share-button').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);toast('Link copied to clipboard');}catch{toast('Share this view using your browser address bar');}});
document.querySelector('#scan-button').addEventListener('click',()=>toast('Barcode scanning is planned for the MVP data pilot.'));
document.querySelector('#sort-button').addEventListener('click',()=>toast('Showing lowest displayed price first for each item.'));
document.querySelector('#note-dismiss').addEventListener('click',()=>document.querySelector('.data-note').remove());
document.querySelectorAll('.nav-item').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.nav-item').forEach(item=>item.classList.remove('active'));button.classList.add('active');const view=button.dataset.view;if(view!=='compare')toast(`${button.textContent.trim()} is part of the implementation roadmap.`);else window.scrollTo({top:0,behavior:'smooth'});}));
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();document.querySelector('#search-input').focus();}});
renderProducts();renderBasket();
