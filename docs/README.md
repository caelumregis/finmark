# FinMark documentation

This documentation describes the modernization of FinMark Corporation’s legacy business consulting and analytics platform into a multi-tenant SaaS application.

## Core documents

| Document | Purpose |
| --- | --- |
| [Product overview](product-overview.md) | Business context, users, problems, goals, and scope |
| [Requirements](requirements.md) | Functional and measurable quality requirements |
| [Current architecture](current-architecture.md) | Inferred legacy architecture, failure points, and root causes |
| [Proposed architecture](proposed-architecture.md) | Target components, request flows, and technology choices |
| [Security](security.md) | Tenant isolation, authentication, authorization, and audit controls |
| [Scalability and reliability](scalability-and-reliability.md) | Capacity approach, performance design, and resilience |
| [Testing strategy](testing-strategy.md) | Validation levels, performance tests, and release gates |
| [Observability](observability.md) | Metrics, logs, traces, dashboards, and alerts |
| [Delivery roadmap](delivery-roadmap.md) | Incremental implementation plan and exit criteria |
| [Presentation outline](presentation.md) | Concise narrative for presenting the architecture work |
| [Decision records](decisions/README.md) | Cross-cutting architecture decisions |
| [Implementation guides](implementation/README.md) | Branch-by-branch code explanations, commands, verification, and lessons learned |

## Reference

- [Project context and alignment summary](reference/project-context-and-alignment.md) — preserved source brief used to align this documentation.

## Conventions

- Current-state claims without source code or production telemetry are explicitly labeled **inferred**.
- Requirements use stable IDs such as `FR-001` and `NFR-001`.
- Architecture decisions are recorded as ADRs rather than silently embedded in implementation notes.
- All diagrams use Mermaid in Markdown.
