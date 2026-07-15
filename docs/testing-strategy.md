# Testing strategy

## Test layers

| Layer | Purpose |
| --- | --- |
| Unit | Domain rules for orders, promotions, ratings, tenant authorization, and validation |
| Integration | PostgreSQL repositories, Redis policies, RabbitMQ publishing/consumption, and external adapters |
| Contract | Versioned external API schemas and webhook payload compatibility |
| End-to-end | Authentication, catalog, checkout, reporting, feedback, and administration journeys |
| Security | Cross-tenant access, rate limiting, privilege escalation, injection, and webhook replay |
| Performance | Dashboard concurrency, catalog volume, order throughput, report queues, and soak behavior |
| Resilience | Instance loss, worker restart, database slowdown, cache loss, and poison messages |

## Critical scenarios

1. Two tenants create similarly identified data and cannot access each other’s records.
2. Two hundred concurrent employees use the dashboard while it remains within the agreed three-second objective.
3. Order submission is retried without creating a duplicate order or payment effect.
4. A database error rolls back the complete order transaction.
5. A report request returns promptly and completes through a worker.
6. A failed webhook retries with backoff and eventually reaches the dead-letter path.
7. Redis becomes unavailable without corrupting authoritative data.
8. One API instance terminates while traffic continues through remaining instances.
9. Catalog queries remain bounded and responsive beyond 200 inventory items.
10. CSV and PDF exports contain only the requesting tenant’s permitted data.

## Performance test profiles

- **Baseline:** current daily volume and normal concurrency.
- **Target:** 200 concurrent employees and projected 3,000 daily-order workload.
- **Spike:** sudden increase in dashboard and checkout requests.
- **Soak:** sustained representative load to expose leaks and pool exhaustion.
- **Queue recovery:** worker outage followed by backlog processing.

## Release gates

- Critical functional, integration, and tenant-isolation tests pass.
- Dashboard and order-capacity targets pass under documented conditions.
- No unresolved critical security finding remains.
- Migrations are rehearsed against representative data.
- Failure injection demonstrates safe recovery for cache, worker, and API-instance loss.
- Observability identifies the test-induced failures without exposing sensitive data.
