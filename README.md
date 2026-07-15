# FinMark

FinMark is a portfolio-ready SaaS architecture project that redesigns a legacy business consulting and analytics platform for secure, reliable, and scalable operation.

The proposed platform supports multi-tenant SME clients, at least 200 concurrent employee users, and growth from 500 to 3,000 daily orders. Its architecture uses a React frontend, a TypeScript modular-monolith API, PostgreSQL, Redis, RabbitMQ, background workers, and production-grade observability.

## Architecture goals

- Operational dashboards load in under three seconds.
- Tenant-aware authorization isolates client data.
- Long-running reports and notifications run asynchronously.
- API instances scale horizontally behind a reverse proxy.
- Metrics, dashboards, alerts, audit logs, and structured errors support operations.
- Clear module boundaries allow selective service extraction when evidence justifies it.

## Documentation

Start with the [documentation index](docs/README.md), then review:

- [Product overview](docs/product-overview.md)
- [Current architecture assessment](docs/current-architecture.md)
- [Proposed architecture](docs/proposed-architecture.md)
- [Architecture decision records](docs/decisions/README.md)

All architecture diagrams use Mermaid and render directly in compatible Markdown viewers.
