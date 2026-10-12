# BasketWise implementation plan

## Product decision

Build a responsive web app first, then reuse the same APIs and product/pricing model for a mobile client. Pilot in Goshen and Elkhart County, Indiana. Prioritize product and basket comparison. Begin with explicitly labeled sample data, and move to authorized feeds only after verifying current access, terms, price coverage, and channel details with each retailer.

## Target outcomes

For shoppers: a trustworthy way to compare exact products and estimate a basket total across nearby stores, including unit prices, price freshness, and important conditions.

For the pilot: determine whether reliable coverage can be established for a useful staple basket and whether shoppers act on travel-adjusted savings.

For price transparency: publish repeatable, aggregate observations that separate observed variation from explanations or claims about cause.

## MVP boundary

### Include

- Product search, exact-identity details, store selection, and source/freshness status.
- Single-store basket totals with missing-item disclosure.
- Unit-price normalization by comparable quantity and unit.
- Basic price history after sufficient observations accumulate.
- A budget preference stored locally at first.
- Price observation submission as a later pilot capability, with consent and fraud review.
- Retailer links for shoppers to verify details or continue to retailer checkout.

### Defer

- Coupon eligibility and retailer loyalty integration until terms and offer rules can be validated.
- Multi-stop route optimization until coverage, driving estimates, and user value are proven.
- Receipt extraction and barcode scanning until privacy, data retention, correction, and match accuracy are designed.
- Neighborhood fairness reports until there is enough comparable, repeated data and a pre-registered analysis method.
- Native mobile clients until web search and basket workflows are validated.

## Delivery roadmap

### Phase 0 — Access and pilot definition (weeks 1–2)

1. Select a representative staple basket, package attributes, store radii, and collection cadence.
2. Confirm official API and partner-feed terms, authentication requirements, allowed caching, commercial use, and attribution per retailer.
3. Test whether authorized sources return store-specific price, channel, promotion, availability, and timestamp fields.
4. Establish a source register and a fallback policy. Do not scrape behind access controls or infer live prices from stale catalog data.
5. Define acceptance criteria for identity matching and the minimum coverage to call a basket comparable.

**Exit gate:** written approval and a working data path for at least one local source, or keep the MVP in sample-data validation mode.

### Phase 1 — Trustworthy comparison MVP (weeks 3–6)

1. Deliver responsive search, product details, store filters, and local shopping lists.
2. Build source adapters that normalize authorized retailer data into a shared product and price model.
3. Implement UPC-first product matching, with package size and variant checks; send uncertain matches to review.
4. Add unit-price calculation, promotion conditions, fulfillment channel, observation age, and completeness indicators.
5. Add a single-store basket estimator that excludes unavailable items from the total and prominently discloses them.
6. Add privacy notice, correction/report flow, retention controls, and a documented deletion path before accounts or uploads.

**Exit gate:** price coverage, match accuracy, freshness, and completeness meet thresholds agreed in Phase 0; no UI treats illustrative or estimated prices as verified.

### Phase 2 — Savings workflow (weeks 7–10)

1. Add price watch alerts for products with adequate refresh cadence.
2. Add coupon records only where source and eligibility terms are available; calculate conditional savings separately from base price.
3. Add travel-aware comparison using a routing provider only after costs, routing rights, and user controls are clear.
4. Add receipt observations with explicit consent, minimal retention, and review/appeal for disputed matches.
5. Pilot with local shoppers and measure whether the recommendation improves the actual paid basket.

**Exit gate:** measured savings include item coverage, promotion eligibility, travel assumptions, and a comparison baseline; report median and distribution, not a single unsupported promise.

### Phase 3 — Local price intelligence (weeks 11–16+)

1. Accumulate repeated, time-aligned, exact-item observations across multiple stores.
2. Join aggregate Census/ACS and food-access measures at appropriate geographies; document vintage, geography, and limitations.
3. Compare standardized baskets and affordable store access, adjusting for format, package size, channel, promotions, availability, and time.
4. Publish only aggregated results with uncertainty, sample coverage, and a clear distinction between price variation, regional patterns, and individualized offers.
5. Invite independent research partners to review methodology before any fairness interpretation.

**Exit gate:** adequate sample coverage and a reviewed analysis plan; no inference of discriminatory intent from store-level differences alone.

## Proposed architecture

- **Client:** responsive React web application; React Native/Expo only after product validation.
- **API:** TypeScript/Node or Python/FastAPI, with retailer connectors isolated behind a normalized interface.
- **Storage:** PostgreSQL; PostGIS when store-distance and geographic aggregation become part of the pilot.
- **Jobs:** scheduled ingestion, source-health checks, matching/review queues, and alert delivery.
- **Identity:** defer accounts until required. Keep prototype lists on device; later use a managed auth provider with explicit data controls.
- **Analytics:** reproducible batch analysis in Python; access-controlled aggregate outputs.
- **Deployment:** managed app hosting and database with secrets outside source control, backups, and operational alerts.

### Core entities

- `retailers`: brand, source adapter, source terms review, attribution requirements.
- `stores`: retailer store identifier, address, coordinates, format, service area.
- `products`: canonical name, brand, UPC/GTIN, package quantity/unit, variant, category.
- `store_products`: source item ID, match confidence, store association, active status.
- `price_observations`: item, store, base price, promotional price, currency, channel, conditions, observed/ingested times, source, verification state.
- `promotions`: offer source, terms, eligibility, loyalty requirement, start/end, verification.
- `availability_observations`: store item, status, timestamp, source.
- `user_lists` and `list_items`: owner, item, quantity, optional preferences and retention policy.
- `price_reports`: user-submitted evidence reference, consent, moderation state, correction history.
- `area_rollups`: aggregated metrics, geography, period, methods version, sample size, suppression state.

A product catalog price, advertised promotion, shelf observation, receipt price, and checkout price are separate observation types. Keep provenance and conditions on every record.

## Data quality and comparison rules

1. Require the same UPC/GTIN where available; otherwise compare brand, variant, package count, and normalized quantity. Mark weaker matches and exclude them from exact-item claims.
2. Normalize comparable quantities (per ounce, pound, gallon, count, etc.) while retaining original package price and size.
3. Keep loyalty-only and coupon prices separate from generally available prices.
4. Keep pickup, delivery, and in-store prices as separate channels.
5. Timestamp observation and ingestion separately; display age and source status.
6. Expire or downgrade observations based on the source's refresh guarantees and observed volatility.
7. Do not describe a basket as cheapest if its item coverage is incomplete; show missing lines and coverage percentage.
8. Retain correction history and provide a way to report an inaccurate listing.

## Privacy and research safeguards

- Never sell identifiable shopping history or provide it for retailer price targeting.
- Do not personalize app fees, offers, or essential savings information based on inferred income or financial stress.
- Collect only data needed for a requested feature; make accountless use available where possible.
- Make receipt/photo use opt-in, document deletion timing, and avoid keeping raw receipt images after extraction and review needs end.
- Aggregate geographic results; suppress small samples and avoid reporting at a granularity that exposes households.
- Publish methods, source coverage, update cadence, limitations, and uncertainty.
- Use neutral phrasing such as “observed price difference”; do not attribute cause without stronger evidence.

## Revenue model and trust controls

Start free. Consider optional paid advanced alerts/budget tools and privacy-protected research subscriptions only after the core comparison is reliable. Affiliate links may be used when permitted and clearly disclosed. Sponsored placements must never alter the underlying price calculation or ranking; if ever introduced, label and isolate them from organic results.

## Success measures

- **Coverage:** share of the pilot basket with valid observations per store and channel.
- **Freshness:** age distribution and share meeting source-specific freshness targets.
- **Identity:** exact UPC match rate, reviewed match precision, and correction rate.
- **Completeness:** visible product coverage for each basket comparison.
- **Savings:** median and range of verified basket differences, adjusted for conditions and travel.
- **Coupon reliability:** eligible-offer success rate and expired/incorrect offer rate.
- **Usefulness:** repeat list use, alert action rate, and user-reported shopping outcomes.
- **Trust:** price correction resolution time, disclosure comprehension, and privacy deletion completion.

Do not advertise a savings percentage until the pilot has a defined baseline and sufficient verified observations.

## Key risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Retailer terms or APIs do not permit the needed use | Verify first; start with authorized feeds/links and sample data; keep adapters replaceable. |
| Stale prices or unavailable items mislead shoppers | Store timestamps, define expiry rules, show channel and availability, disclose basket gaps. |
| Product mismatches produce false savings | UPC-first matching, confidence thresholds, package attributes, review workflow. |
| Coupon terms are conditional or loyalty-bound | Model eligibility and conditions separately; do not subtract until validated. |
| User submissions are erroneous or manipulated | Evidence metadata, rate limits, outlier checks, moderation, corrections, provenance. |
| Price gaps are misread as discrimination | Separate descriptive results from causal claims; use repeated, controlled, reviewed analysis. |
| Business model harms trust | No personal data sales; visible affiliate disclosure; paid placement excluded from ranking. |

## First implementation backlog

1. Replace prototype product fixtures with versioned catalog and observation schemas.
2. Define an adapter contract and source-permission register.
3. Add store selection, channel selection, freshness indicators, and incomplete-basket labels.
4. Implement exact match confidence and unit conversion with review tooling.
5. Build a controlled ingestion job for one authorized retailer source.
6. Add database migrations and API endpoints for search, offers, and basket estimates.
7. Add source-health logging, correction flow, retention/deletion controls, and operational monitoring.
8. Run a small local pilot, assess data quality, then decide whether to expand sources or add savings features.

## Decisions to confirm before production

- Which authorized price source can cover local stores and what its permitted use allows.
- The initial store radius, staple basket, and refresh service-level expectations.
- Whether pilot users need accounts or whether local-only lists are sufficient.
- The thresholds for exact matches, freshness, and basket completeness.
- Whether data submissions and public geographic research are in scope for the pilot.
