# Finmark documentation

## Foundation Release

| Document | Purpose |
| --- | --- |
| [Foundation overview](foundation/README.md) | Scope, goals, deliverables, and completion criteria |
| [Product requirements](foundation/product-requirements.md) | Users, use cases, functional requirements, and acceptance criteria |
| [User journeys](foundation/user-journeys.md) | Expected end-to-end user flows |
| [Architecture](foundation/architecture.md) | System context, components, boundaries, and constraints |
| [Data model](foundation/data-model.md) | Core entities, relationships, ownership, and retention |
| [API contract](foundation/api-contract.md) | API conventions and endpoint inventory |
| [Security and privacy](foundation/security-and-privacy.md) | Threats, controls, and sensitive-data handling |
| [Development setup](foundation/development-setup.md) | Local environment and contributor workflow |
| [Testing strategy](foundation/testing-strategy.md) | Test levels, cases, and release gates |
| [Deployment and operations](foundation/deployment-and-operations.md) | Environments, release, rollback, and observability |
| [Open questions](foundation/open-questions.md) | Unresolved decisions required to finish the Foundation Release |
| [Release checklist](foundation/checklist.md) | Documentation and delivery sign-off checklist |
| [Decision records](decisions/README.md) | Architecture and product decision log |

## Documentation conventions

- **TBD** means a decision or fact still needs confirmation.
- **Out of scope** means the item is deliberately excluded from the Foundation Release.
- Requirements use stable IDs such as `FR-001` and `NFR-001`.
- Decisions that affect multiple areas should receive an ADR in `docs/decisions/`.
- Update the relevant document in the same change that alters product behavior or architecture.
