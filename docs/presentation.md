# Architecture presentation outline

## 1. FinMark and the modernization goal

- Business consulting and analytics for SMEs
- Legacy platform must become a scalable, secure, reliable, data-driven SaaS product
- Growth target: 500 to 3,000 daily orders

## 2. Current operational pain

- Peak-load crashes and unavailable pages
- Approximately 20-second dashboard load with 200 employees
- Failed orders, financial reports, and planning requests
- Catalog slowdown above 200 inventory items
- Weak errors, auditability, authentication protections, and integration capabilities

## 3. Inferred current architecture

- Present the diagram from [current-architecture.md](current-architecture.md)
- State clearly that source code and production telemetry were unavailable
- Show how synchronous work and shared bottlenecks concentrate failure

## 4. Root causes to validate

- Blocking reports and planning requests
- Slow or unbounded database access
- Single-instance and shared-connection constraints
- Missing cache, queue, standard error handling, and observability

## 5. Proposed architecture

- Present the diagram from [proposed-architecture.md](proposed-architecture.md)
- React + TypeScript frontend
- Node.js/Express modular monolith
- PostgreSQL, Redis, RabbitMQ, and background workers
- Reverse proxy with horizontally scalable stateless API instances
- Prometheus and Grafana

## 6. Why a modular monolith

- Clear domain boundaries without distributed-system overhead
- Shared transactions where business consistency requires them
- Event-driven workers remove long-running work from request paths
- Modules remain candidates for later extraction based on evidence

## 7. Security and tenant isolation

- Verified tenant context on every protected request
- Server-side authorization and tenant-scoped queries
- Rate limiting, optional 2FA/social login, signed webhooks, and audit logs

## 8. Scalability and reliability improvements

- Horizontal API/worker scaling
- Indexed and bounded queries
- Measured caching and dashboard aggregation
- Transactional orders, idempotency, outbox, retries, and dead-letter handling

## 9. Validation strategy

- 200-user dashboard test and 3,000-daily-order capacity profile
- Tenant-isolation, resilience, spike, soak, and queue-recovery tests
- Metrics, logs, traces, dashboards, and alerts as acceptance evidence

## 10. Delivery path and expected outcome

- Discovery and baselines
- Platform foundation
- Critical workflows
- Performance and resilience
- Operational readiness
- Result: faster dashboards, fewer failed transactions, safe tenant growth, and a maintainable path to future integrations
