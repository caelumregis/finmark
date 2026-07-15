# Foundation Release deployment and operations

## Environments

| Environment | Purpose | Data policy | Access |
| --- | --- | --- | --- |
| Local | Individual development | Synthetic only | Developer |
| Test or preview | Automated and review validation | Synthetic only | Team/reviewers |
| Production | Approved Foundation Release use | Approved user data | Restricted |

Final environment names and providers are **TBD**.

## Deployment flow

1. Merge an approved, tested change.
2. Build an immutable release artifact.
3. Apply reviewed migrations using the approved order.
4. Deploy to the target environment.
5. Run health and primary-journey smoke checks.
6. Observe error rate and latency during the release window.
7. Record release identifier and outcome.

## Rollback

- Define whether application rollback is automatic or operator-triggered.
- Keep the last known-good application artifact available.
- Prefer backward-compatible database changes.
- Never roll back a destructive migration without an explicit data recovery plan.
- Record the rollback owner and decision threshold.

## Observability

The Foundation Release should expose:

- Application availability
- Request count, latency, and error rate
- Database connectivity and failed operations
- Authentication and authorization failures at a safe aggregation level
- Release identifier
- Correlation IDs for unexpected errors

## Alerts

Define owners and thresholds for availability failure, sustained error-rate increase, database failure, and security-relevant anomalies. Alert routing and escalation path are **TBD**.

## Runbook: service unavailable

1. Confirm the health signal and scope of impact.
2. Check the latest release and dependency status.
3. Stop further rollout if one is active.
4. Roll back when the latest release is the likely cause and rollback is safe.
5. Communicate status through the agreed channel.
6. Preserve useful logs and timeline information.
7. Record follow-up actions after recovery.

## Backup and recovery

Before production use, confirm backup frequency, retention, restore owner, restore-time objective, acceptable data-loss window, and evidence from a restore rehearsal.
