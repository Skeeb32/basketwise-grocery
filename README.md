# BasketWise

A consumer-first grocery comparison concept, starting with a web-first Goshen and Elkhart County pilot. BasketWise is designed to help shoppers compare equivalent products, plan a budget-aware basket, and understand local prices with clear source and freshness labels.

> **Prototype notice:** every displayed price is illustrative sample data. This prototype is not connected to retailer inventory, retailer pricing feeds, coupon validation, or checkout. It makes no claim about actual prices, savings, or pricing discrimination.

## Run locally

Open `index.html` in a modern browser. No build step or install is required. Basket contents and the optional weekly budget are saved in browser local storage on the current device.

## What works in this prototype

- Search the sample staple catalog and filter the displayed retailer set.
- Compare listed sample prices and unit prices for Kroger, Target, and Whole Foods.
- Add products and adjust quantities in a basket.
- Compare that basket across single-store totals.
- Compare the lowest single-store basket with an item-by-item split-store plan, using a shopper-entered extra-stop estimate.
- Set a weekly budget and see the remaining amount.
- Try illustrative coupon codes and add/remove sample offers from basket comparisons.
- Save products to a local price watch and view clearly labeled illustrative trends.
- Review a local transparency explainer that distinguishes price variation from claims about cause.
- Copy a share link and see clear prototype/data-source disclosures.

The coupon checker, price-watch trends, optimizer, and local insights use sample records. Retailer coupon rules, actual route costs, price history, and neighborhood observations are not connected.

## Implementation plan

See [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) for the phased MVP roadmap, architecture, data model, privacy and evidence policy, launch gates, and measurable success criteria.

## Product principles

1. **Source and freshness are part of the price.** A displayed price needs a retailer/store identity, channel, observation time, and evidence status.
2. **Compare like with like.** UPC and package attributes should be matched before calculating unit price or savings.
3. **Observed differences are not causal claims.** Store- and neighborhood-level price gaps can have many explanations.
4. **Protect shoppers.** Do not sell individual shopping histories, use income to target prices, or let paid placement change the underlying price order.
5. **Be honest about gaps.** Missing products and stores should be visible; incomplete baskets must not masquerade as complete lowest-cost options.

## License

This project is available under the MIT License. See [LICENSE](LICENSE).
