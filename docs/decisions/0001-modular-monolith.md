# ADR 0001: Use a modular monolith with event-driven workers

- **Status:** Proposed
- **Date:** 2026-07-15
- **Owners:** Architecture team
- **Supersedes:** None
- **Superseded by:** None

## Context

FinMark must modernize a legacy application that suffers from slow dashboards, failed synchronous work, weak operational visibility, and limited scalability. The product needs clear domain boundaries and independent scaling for background tasks, but its current size and team topology do not justify the deployment, data consistency, and observability overhead of full microservices.

## Decision drivers

- Improve maintainability through explicit domain boundaries.
- Preserve straightforward transactions for orders and financial records.
- Remove report, export, notification, and webhook work from request threads.
- Scale API instances and workers independently where useful.
- Avoid premature distributed-system complexity.
- Preserve a path to extract services if measured constraints justify it.

## Options considered

### Continue the existing monolith without module boundaries

This has the lowest immediate change cost but retains coupling, unclear ownership, and shared failure modes.

### Modular monolith with event-driven workers

This creates enforceable modules inside one primary application and uses RabbitMQ-backed workers for asynchronous jobs and events. It improves boundaries and runtime isolation while retaining operational simplicity.

### Full microservices

This allows independent deployment and scaling but introduces distributed transactions, service discovery, contract versioning, more complex testing, and substantially greater operational overhead.

## Decision

Use a TypeScript modular monolith for synchronous API and domain behavior, backed by PostgreSQL. Use RabbitMQ and independently scalable workers for reports, exports, notifications, webhooks, and expensive analytics. Keep APIs stateless and use Redis for bounded caching and rate limiting.

## Consequences

### Positive

- Domain boundaries can be enforced without network boundaries.
- Order and financial transactions remain straightforward.
- Long-running work no longer consumes request capacity.
- One primary API deployment reduces operational overhead.
- High-pressure modules can be extracted later with clearer seams.

### Negative or accepted trade-offs

- Poor module discipline could recreate a tightly coupled monolith.
- A shared database requires explicit ownership rules between modules.
- Asynchronous flows require idempotency, retries, observability, and dead-letter handling.
- API modules cannot be deployed independently until extracted.

## Validation

Review module dependencies, transaction ownership, and queue contracts during implementation. Revisit this decision if one module requires independent deployment, materially different scaling, separate compliance boundaries, or autonomous team ownership that cannot be supported within the modular monolith.
