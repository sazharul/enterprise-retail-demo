# Architecture

## Three-tier read/write split

```
React Storefront ──fast reads──► Node.js Catalog API ──► MySQL
       │
       └──cart, auth, orders──► Laravel REST API ──► MySQL
                                        ▲
                                   Admin Panel
```

### Why Node.js?

Under production traffic, public catalog endpoints (homepage sections, product filters, attribute facets) became a bottleneck on Laravel. A dedicated **read-only Express layer** with GZIP compression and raw SQL queries offloads those paths while Laravel remains the source of truth for writes.

### Laravel (backend)

- Sanctum authentication for web and mobile
- Cart, checkout, orders, wishlist
- Admin CMS: products, brands, categories, homepage sections
- Blog, policies, FAQs
- Warehouse and stock management (demo subset)

### Catalog API (catalog-api)

Read-only Express routes:

- Homepage aggregation (`get-home-web`)
- Product filter/search with pagination
- Brand, category, and attribute facets
- Product detail aggregation

**Stubbed in demo:** `getShippingCharge`, `getRewardData`, `get-available-offers`, `get-general-setting` return static JSON — no production pricing or reward engines.

### React storefront (frontend)

- Vite + Redux Toolkit + RTK Query
- Separate API clients for Laravel (`baseApi`) and Node (`nodeBaseApi`)
- Ant Design components

### Flutter mobile

Production APIs are Laravel-compatible. Flutter source is not included in this demo; see README for API compatibility notes.

## DEMO_MODE

| Integration | Demo behavior |
|-------------|---------------|
| Pathao | Canned city/zone/area lists |
| OTP | Fixed `123456` |
| Offers/shipping/rewards (Node) | Static JSON |
| Firebase push | Disabled — empty env vars |
