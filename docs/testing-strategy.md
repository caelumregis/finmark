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
| Resilience | Instance/zone loss, database failover and restore, broker outage, retry storms, backlog recovery, cache loss, and poison messages |

## Critical scenarios

1. Two tenants create similarly identified data and cannot access each other’s records.
2. Two hundred concurrent employees use the dashboard for 30 minutes while the server response remains below three seconds at p95 using the documented dataset and cache profiles.
3. Order submission is retried without creating a duplicate order or payment effect.
4. A database error rolls back the complete order transaction.
5. A report request returns promptly and completes through a worker.
6. A failed webhook retries with backoff and eventually reaches the dead-letter path.
7. Redis becomes unavailable without corrupting authoritative data.
8. One API instance terminates while traffic continues through remaining instances.
9. Catalog queries remain bounded and responsive beyond 200 inventory items.
10. CSV and PDF exports contain only the requesting tenant’s permitted data.
11. PostgreSQL primary failover completes within the RTO without losing a committed order.
12. A backup and point-in-time restoration meets the disaster RTO/RPO and passes integrity checks.
13. RabbitMQ loses a node or becomes temporarily unavailable while outbox events remain recoverable.
14. A retry storm is contained by retry budgets, jitter, concurrency limits, and dead-letter handling.
15. A full availability-zone or simulated network-path failure preserves service or recovers within the stated objective.
16. A 10,000-job backlog drains within 30 minutes without starving interactive API traffic.
17. Load beyond the autoscaling ceiling produces bounded `429`/`503` responses instead of cascading failure.

## Performance test profiles

- **Baseline:** current daily volume and normal concurrency.
- **Target:** 200 concurrent employees for 30 minutes, 25 requests/second, 5 order creations/second for 15 minutes, the documented representative dataset, and the separate browser render profile.
- **Spike:** 50 requests/second for 5 minutes with bounded overload behavior.
- **Soak:** sustained representative load to expose leaks and pool exhaustion.
- **Queue recovery:** worker outage followed by recovery of a 10,000-job backlog within 30 minutes.
- **Failover:** API, zone, PostgreSQL primary, Redis node, and RabbitMQ node failures under traffic.
- **Disaster recovery:** restore an encrypted backup and replay to the approved recovery point.

## Release gates

- Critical functional, integration, and tenant-isolation tests pass.
- Dashboard and order-capacity targets pass under documented conditions.
- No unresolved critical security finding remains.
- Migrations are rehearsed against representative data.
- Failure injection demonstrates safe recovery for API/zone loss, database failover, RabbitMQ outage, cache loss, worker failure, retry storms, and backlog recovery.
- Backup restoration is timed and validated against the stated RTO/RPO.
- The outbox relay test proves a process crash after database commit cannot lose the event.
- Observability identifies the test-induced failures without exposing sensitive data.
