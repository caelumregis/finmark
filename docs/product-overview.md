# Product overview

## Organization and product

FinMark Corporation is a business consulting and analytics firm serving small and medium-sized enterprises. Project Finer FinMark modernizes its legacy platform into a scalable, secure, reliable, and data-driven multi-tenant SaaS application.

## Business problem

The current platform cannot reliably support increasing user and transaction volumes. Peak traffic causes unavailable pages, failed orders, failed financial reports, and failed planning requests. Dashboard response times reach approximately 20 seconds with 200 concurrent employees, reducing operational visibility and user confidence.

The platform also lacks controls and integration capabilities expected from a modern SaaS product: authentication rate limiting, stronger authentication options, tenant-aware access, audit logs, real-time notifications, exportable reports, and external API support.

## Users and stakeholders

| Stakeholder | Need |
| --- | --- |
| SME client users | Secure access to their organization’s orders, reports, planning, and analytics |
| FinMark employees | Fast operational dashboards and dependable business workflows |
| Administrators | Tenant management, auditability, access control, and operational insight |
| Engineering and operations | Measurable performance, safe releases, actionable failures, and horizontal scaling |
| Business leadership | Capacity for growth from 500 to 3,000 daily orders without proportional operational risk |

## Product outcomes

- Support at least 200 concurrent employee users.
- Scale from 500 to 3,000 daily orders.
- Load the operational dashboard in under three seconds.
- Provide near-real-time order and financial information.
- Reduce failed transactions, unhandled exceptions, and peak-load outages.
- Isolate SME data through tenant-aware authorization and data access.
- Enable external integrations through stable APIs and event/webhook patterns.
- Provide monitoring, metrics, dashboards, alerts, and auditability.

## Modernization scope

The architecture covers authentication, tenant-aware access, product and inventory operations, order and checkout workflows, promotions, reports and planning, feedback and ratings, administration, auditing, integrations, notifications, caching, asynchronous processing, and observability.

## Architecture posture

FinMark begins as a modular monolith with event-driven background workers. This balances delivery speed and operational simplicity with clear domain boundaries. Components can be extracted into independently deployed services later only when measured scale, reliability, or team ownership requires it.
