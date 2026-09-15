# GlowCart — Enterprise Retail Platform Demo

Open-source portfolio demo of an enterprise skincare e-commerce stack: **Laravel** write API + **React** storefront + **Node.js** catalog read layer. Rebranded as **GlowCart**.

> **Portfolio demonstration only.** This repository is an independent showcase for recruiters and engineers.
> It uses the same technologies and architectural patterns from my production work, but it is **not**
> the source code of any client, employer, or live product. Fictional branding and synthetic data only.
> See [DISCLAIMER.md](DISCLAIMER.md).
>
> Production experience reference: [perfectobd.com](https://perfectobd.com/) (code not published).

## Architecture

| Layer | Stack | Port |
|-------|-------|------|
| Storefront | React 18, Vite, Redux, Ant Design | `:5174` |
| Write API | Laravel 10, Sanctum | `:8002` |
| Catalog API | Express, MySQL2, compression | `:4001` |
| Database | MySQL 8 | `:3309` |

Laravel handles auth, cart, orders, and admin. The Node catalog API offloads heavy product listing, filters, and homepage reads.

## Quick start

```bash
git clone https://github.com/sazharul/enterprise-retail-demo.git
cd enterprise-retail-demo
docker compose up --build
```

| Service | URL |
|---------|-----|
| Storefront | http://localhost:5174 |
| Laravel API | http://localhost:8002/api |
| Catalog API | http://localhost:4001/api/node |
| Admin panel | http://localhost:8002/admin |

Demo accounts: [docs/DEMO_ACCOUNTS.md](docs/DEMO_ACCOUNTS.md)

## DEMO_MODE

When `DEMO_MODE=true`:

- Fixed OTP: `123456`
- Pathao shipping API returns canned city/zone/area data
- Catalog API returns static demo JSON for offers, shipping (60 BDT), and rewards
- No external payment or push notification calls

## Monorepo layout

```
enterprise-retail-demo/
├── backend/       # Laravel 10
├── frontend/      # React storefront (GlowCart)
├── catalog-api/   # Express read API
├── docker-compose.yml
└── docs/
```

## Documentation

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — system design and performance story
- [DEMO_ACCOUNTS.md](docs/DEMO_ACCOUNTS.md) — login credentials

## License

MIT — see [LICENSE](LICENSE).
