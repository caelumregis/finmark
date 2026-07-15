# Foundation Release testing strategy

## Goals

- Prove the primary user journey works.
- Protect authorization and ownership boundaries.
- Catch schema and contract regressions before deployment.
- Make failures easy to reproduce.

## Test levels

| Level | Covers | Foundation expectation |
| --- | --- | --- |
| Unit | Domain rules, validation, transformations | Required for meaningful branches |
| Integration | Database, API handlers, identity boundary | Required for critical operations |
| End-to-end | Primary user workflow | At least one happy path and critical failure paths |
| Manual | Accessibility, usability, operational readiness | Documented release pass |

## Critical test cases

| ID | Scenario | Expected result |
| --- | --- | --- |
| T-001 | Authorized user completes the primary journey | State persists and success is shown |
| T-002 | Required input is missing | No state change; actionable validation appears |
| T-003 | Input exceeds allowed limits | Safe rejection; no partial write |
| T-004 | Unauthenticated request reaches protected operation | Request is rejected |
| T-005 | User requests another owner’s resource | Request is rejected without data leakage |
| T-006 | Same create request is repeated | Approved duplicate or idempotent behavior occurs |
| T-007 | Database operation fails | Transaction rolls back; safe error is returned |
| T-008 | Stored record is updated | Only approved fields change |
| T-009 | Removal is requested | Approved archive or deletion behavior occurs |
| T-010 | Migration runs against representative data | Upgrade succeeds without unintended loss |

## Test data

- Use synthetic records only.
- Use deterministic factories or fixtures.
- Represent ownership boundaries explicitly.
- Include boundary values and Unicode where accepted.
- Never copy production personal or financial data.

## Release gates

- Critical tests pass.
- No known critical or high-severity security defect remains.
- Static analysis and formatting checks pass.
- Database migration is reviewed and rehearsed.
- Primary journey receives a manual smoke test.
- Rollback procedure is available.
