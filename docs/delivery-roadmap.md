# Delivery roadmap

The roadmap converts the modernization into portfolio-ready increments. Each stage ends with evidence rather than document completion alone.

## Stage 1: Discovery and baselines

- Confirm the inferred current architecture against code, configuration, and stakeholder interviews.
- Baseline dashboard latency, error rate, order volume, database behavior, and peak concurrency.
- Inventory sensitive data, tenant rules, dependencies, and failure history.
- Finalize service-level objectives and acceptance-test conditions.

**Exit evidence:** validated current-state diagram, measured baseline, approved requirements, and prioritized risks.

## Stage 2: Platform foundation

- Establish React, TypeScript, Express, PostgreSQL, Redis, RabbitMQ, and Docker Compose development environment.
- Define modular boundaries, migrations, configuration, error envelope, correlation IDs, and health endpoints.
- Implement authentication rate limiting, tenant context, and audit-event foundations.
- Add continuous checks and representative synthetic data.

**Exit evidence:** repeatable setup, deployment skeleton, tenant-isolation tests, and base observability.

## Stage 3: Critical business workflows

- Modernize catalog/inventory and order/checkout paths.
- Add transactional integrity, idempotency, promotions, and meaningful errors.
- Move reports, exports, notifications, and webhooks to background jobs.
- Add ratings/feedback and administrative auditing.

**Exit evidence:** end-to-end workflows, integration tests, safe retries, and audit records.

## Stage 4: Performance and resilience

- Profile and index critical PostgreSQL queries.
- Add measured caching and dashboard aggregation.
- Scale API and worker instances behind the reverse proxy.
- Run target, spike, soak, and failure-injection tests.

**Exit evidence:** dashboard p95 server response under three seconds and p95 usable render under five seconds for 200 concurrent employees using the documented 30-minute test profiles, plus sustained and burst capacity evidence for the order workload.

## Stage 5: Operational readiness

- Finalize Grafana dashboards, alerts, runbooks, backup/restore, deployment, and rollback.
- Complete threat model, accessibility review, dependency/secret scans, and log-redaction review.
- Exercise queue recovery, instance loss, cache loss, and database slowdown.

**Exit evidence:** release checklist, operational rehearsal, documented limitations, and architecture presentation.
