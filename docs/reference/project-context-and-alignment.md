# Project context and alignment reference

## Purpose

This document preserves the supplied project brief used to align the portfolio documentation. It is a reference source, not the public-facing architecture narrative. The active documentation removes classroom framing while retaining the required analysis, architecture, validation, and presentation deliverables.

## Organization and modernization goal

FinMark Corporation is a business consulting and analytics firm serving small and medium-sized enterprises. Project Finer FinMark redesigns its legacy platform into a scalable, secure, reliable, and data-driven SaaS application.

## Supplied current problems

- System crashes and unavailable pages during peak usage
- Dashboard load times of approximately 20 seconds with 200 concurrent employees
- Failed orders, financial report generation, and planning requests
- Vague errors and unhandled exceptions
- Product catalog lag with inventories above 200 items
- No authentication rate limiting, social login, or two-factor authentication
- Internal-only checkout APIs with no coupon or promotion integrations
- No real-time order notifications or webhooks
- Basic feedback without ratings
- Admin panel without audit logs or analytics
- Static reporting without CSV/PDF export, external APIs, or real-time streaming

## Supplied measurable goals

- Scale from 500 to 3,000 daily orders.
- Support at least 200 concurrent employee users.
- Load the operational dashboard in under three seconds.
- Provide real-time financial and order information.
- Reduce failed transactions and system crashes.
- Support secure access and tenant data isolation.
- Provide meaningful error handling and auditability.
- Enable future external API integrations.
- Include monitoring, metrics, dashboards, and alerts.

## Required architecture deliverables

1. Define the problem statement and business impact.
2. Analyze current system behavior.
3. Diagram the inferred current architecture in Mermaid.
4. Identify failure points and likely root causes.
5. Design a revised software architecture.
6. Diagram the proposed architecture in Mermaid.
7. Explain scalability, security, reliability, performance, and maintainability improvements.
8. Define testing and validation strategy.
9. Prepare a concise presentation outline.

Because legacy source code and production telemetry were unavailable when the brief was written, the current architecture must remain labeled as an **inferred architecture based on the supplied audit and observed behavior**.

## Supplied technical direction

- React with TypeScript frontend
- Node.js, Express, and TypeScript backend
- PostgreSQL primary database
- Redis caching and rate limiting
- RabbitMQ asynchronous jobs and system events
- Background workers for reports, notifications, and other long-running tasks
- Prometheus metrics and Grafana dashboards
- Docker Compose local environment
- Reverse proxy/load balancer in front of horizontally scalable API instances
- Modular monolith with event-driven workers, not premature full microservices
- Multi-tenant SaaS with tenant-aware authorization and database access

## Portfolio presentation rule

The repository and active documentation should be professional and portfolio-facing. School- or milestone-specific folder names should not appear in the public documentation structure. All architecture diagrams use Mermaid inside Markdown.

## Alignment record

| Brief requirement | Active document |
| --- | --- |
| Problem and business impact | [Product overview](../product-overview.md) |
| Current behavior and inferred architecture | [Current architecture](../current-architecture.md) |
| Failure points and likely causes | [Current architecture](../current-architecture.md) |
| Proposed architecture and technologies | [Proposed architecture](../proposed-architecture.md) |
| Scalability and reliability improvements | [Scalability and reliability](../scalability-and-reliability.md) |
| Security and tenant isolation | [Security](../security.md) |
| Testing and validation | [Testing strategy](../testing-strategy.md) |
| Metrics, dashboards, and alerts | [Observability](../observability.md) |
| Incremental delivery | [Delivery roadmap](../delivery-roadmap.md) |
| Concise presentation | [Presentation outline](../presentation.md) |
| Modular-monolith rationale | [ADR 0001](../decisions/0001-modular-monolith.md) |
