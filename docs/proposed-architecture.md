# Proposed architecture

## Architecture style

FinMark uses a modular monolith for synchronous business capabilities and event-driven background workers for long-running or fan-out work. This is an intentional alternative to premature microservices: it provides one primary deployment and transaction boundary while preserving domain seams for later extraction.

## Target architecture

```mermaid
flowchart TB
    users["SME users, employees,<br/>and administrators"]
    external["External API and<br/>webhook consumers"]
    proxy["Reverse proxy / load balancer"]

    subgraph web["Presentation"]
        react["React + TypeScript"]
    end

    subgraph app["Horizontally scalable application tier"]
        api1["Node.js / Express API"]
        api2["Node.js / Express API"]
        modules["Domain modules<br/>Identity · Tenants · Catalog · Orders<br/>Promotions · Reports · Feedback · Admin"]
    end

    redis[("Redis<br/>cache + rate limits")]
    postgres[("PostgreSQL<br/>system of record")]
    rabbit["RabbitMQ<br/>events and jobs"]

    subgraph workers["Background workers"]
        reports["Report and export worker"]
        notify["Notification / webhook worker"]
        analytics["Analytics and aggregation worker"]
    end

    prometheus["Prometheus"]
    grafana["Grafana"]

    users --> react
    react --> proxy
    external --> proxy
    proxy --> api1
    proxy --> api2
    api1 --- modules
    api2 --- modules
    modules --> postgres
    modules --> redis
    modules --> rabbit
    rabbit --> reports
    rabbit --> notify
    rabbit --> analytics
    reports --> postgres
    analytics --> postgres
    api1 --> prometheus
    api2 --> prometheus
    reports --> prometheus
    notify --> prometheus
    analytics --> prometheus
    prometheus --> grafana
```

## Responsibilities

| Component | Responsibility |
| --- | --- |
| React frontend | Accessible workflows, client state, live updates, and safe user feedback |
| Reverse proxy/load balancer | TLS termination, routing, request limits, and distribution across API instances |
| Express modular monolith | Authentication boundary, tenant authorization, validation, transactions, and domain rules |
| PostgreSQL | Authoritative relational state, tenant-owned data, orders, financial records, and audit events |
| Redis | Bounded caching, authentication/API rate limits, and short-lived coordination data |
| RabbitMQ | Durable jobs and domain-event distribution with retries and dead-letter handling |
| Workers | Reports, PDF/CSV export, notifications, webhooks, and expensive aggregation |
| Prometheus and Grafana | Metrics collection, dashboards, alerts, and capacity insight |

## Order flow

```mermaid
sequenceDiagram
    actor User
    participant UI as React client
    participant API as Express API
    participant DB as PostgreSQL
    participant MQ as RabbitMQ
    participant Worker as Notification worker

    User->>UI: Submit order
    UI->>API: Authenticated tenant-scoped request
    API->>API: Rate limit, authorize, and validate
    API->>DB: Commit order and outbox event
    DB-->>API: Order committed
    API-->>UI: Order accepted
    API->>MQ: Publish committed event
    MQ->>Worker: Deliver order event
    Worker-->>User: Send status notification
```

## Key design rules

- API instances remain stateless and horizontally scalable.
- Every data access path carries a verified tenant identifier.
- Order and financial writes are transactional and idempotent where retried.
- Database changes and event publication use an outbox-style consistency mechanism.
- Worker retries are bounded; poison messages move to a dead-letter queue.
- Caches have explicit ownership, expiry, invalidation, and fallback behavior.
- Synchronous requests do not generate large reports or wait on third-party notifications.
