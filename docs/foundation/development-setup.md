# Foundation Release development setup

## Prerequisites

All runtime, package manager, database, and service versions are **TBD** until the implementation stack is selected.

## Expected setup flow

1. Clone the repository.
2. Install the documented runtime version.
3. Copy the committed environment example to a local environment file.
4. Add development-only credentials through the approved secret channel.
5. Start required local services.
6. Apply database migrations.
7. Load non-sensitive seed data, if provided.
8. Run the application.
9. Run the automated test suite.

## Environment variables

Maintain an `.env.example` when implementation begins. For every variable, document:

| Field | Description |
| --- | --- |
| Name | Exact environment key |
| Required | Whether startup fails without it |
| Scope | Client-safe or server-only |
| Example | Non-secret example value |
| Owner | System or person responsible |
| Rotation | How replacement is performed |

Never place real secrets in documentation, examples, fixtures, or source control.

## Contributor workflow

- Keep changes small enough to review.
- Add or update tests with behavior changes.
- Add a migration with schema changes.
- Update documentation in the same change.
- Record cross-cutting decisions as ADRs.
- Run formatting, static checks, and tests before review.

## Troubleshooting template

For each common setup failure, record the visible symptom, likely cause, safe diagnostic, resolution, and owner. Avoid instructions that require copying secrets or production data.
