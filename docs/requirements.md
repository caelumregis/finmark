# Requirements

## Functional requirements

| ID | Requirement | Acceptance summary |
| --- | --- | --- |
| FR-001 | Authenticate users securely and apply rate limiting to authentication endpoints. | Repeated failed attempts are limited and recorded without exposing credentials. |
| FR-002 | Support optional social login and two-factor authentication. | Configured identity providers and a second factor can complete the sign-in flow. |
| FR-003 | Isolate all client data by tenant. | Cross-tenant reads and writes fail in API and database integration tests. |
| FR-004 | Provide product catalog and inventory workflows beyond 200 items. | Listing, filtering, and updates remain within performance targets at representative volume. |
| FR-005 | Process orders and checkout reliably. | Valid orders commit atomically; failed operations do not leave partial state. |
| FR-006 | Support coupons and promotions through explicit domain rules. | Eligible discounts apply consistently and invalid combinations return actionable errors. |
| FR-007 | Produce financial reports and planning outputs asynchronously when long-running. | Requests return a job identifier and complete without blocking API capacity. |
| FR-008 | Provide real-time or near-real-time order notifications. | Order events reach subscribed clients or integrations through approved channels. |
| FR-009 | Support ratings and structured feedback. | Users can submit permitted ratings and administrators can review them. |
| FR-010 | Record administrative and security-relevant actions in an audit log. | Events include tenant, actor, action, target, timestamp, and safe context. |
| FR-011 | Export supported reports as CSV and PDF. | Generated files match the selected tenant, filters, and reporting period. |
| FR-012 | Expose versioned external APIs and signed webhooks. | Consumers can authenticate, handle documented errors, and verify webhook authenticity. |
| FR-013 | Provide meaningful validation and failure responses. | Errors use stable codes, correlation IDs, and safe user-facing messages. |

## Quality requirements

| ID | Quality | Target |
| --- | --- | --- |
| NFR-001 | Dashboard performance | p95 server response under 3 seconds for 200 concurrent users over 30 minutes, using the documented dataset and cache profiles |
| NFR-002 | Order capacity | Support 3,000 daily orders and sustain 5 order creations/second for 15 minutes |
| NFR-003 | Availability | API, workers, PostgreSQL, Redis, and RabbitMQ tolerate a single instance/node failure; application compute spans two availability zones |
| NFR-004 | Data integrity | Order and financial state changes are transactional and recoverable |
| NFR-005 | Tenant isolation | Every tenant-owned query and command enforces tenant context |
| NFR-006 | API scalability | Stateless API instances scale horizontally behind a load balancer |
| NFR-007 | Operability | Critical workflows expose metrics, structured logs, traces, dashboards, and alerts |
| NFR-008 | Maintainability | Domain modules have explicit boundaries and automated contract/integration tests |
| NFR-009 | Security | Secrets are managed externally; sensitive data is encrypted and excluded from logs |
| NFR-010 | Accessibility | Core web workflows target WCAG 2.1 AA |
| NFR-011 | Burst handling | Sustain 50 API requests/second for 5 minutes with bounded degradation and no unsafe errors |
| NFR-012 | Queue recovery | Drain a 10,000-job backlog within 30 minutes after worker recovery |
| NFR-013 | Recovery | PostgreSQL standby failover targets RTO 15 minutes/RPO 0; disaster restore targets RTO 4 hours/RPO 15 minutes |
| NFR-014 | Dashboard user experience | p95 usable dashboard render under 5 seconds using the documented client and network profile |

## Performance profile

The canonical dataset, network, cache, traffic, and recovery conditions are defined in [Scalability and reliability](scalability-and-reliability.md). These are initial engineering targets and must be recalibrated when production telemetry becomes available.
