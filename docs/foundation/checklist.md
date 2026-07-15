# Foundation Release checklist

## Product

- [ ] Primary user and problem are approved.
- [ ] Primary journey and success measure are approved.
- [ ] Foundation Release scope and explicit exclusions are approved.
- [ ] Functional requirements have testable acceptance criteria.
- [ ] Known limitations are documented.

## Design and accessibility

- [ ] All happy, empty, loading, validation, and failure states are defined.
- [ ] Core journey is usable by keyboard.
- [ ] Labels, focus order, contrast, and error announcements are reviewed.
- [ ] Target accessibility standard is recorded.

## Engineering

- [ ] Architecture and major technology choices are approved.
- [ ] Data ownership, schema, retention, and deletion are approved.
- [ ] API contract reflects the implemented behavior.
- [ ] Versioned migrations exist and have been rehearsed.
- [ ] Critical code paths have automated tests.
- [ ] No real secrets or production data exist in the repository.

## Security and privacy

- [ ] Authentication and server-side authorization are tested.
- [ ] Cross-owner access tests pass.
- [ ] Inputs are validated and bounded.
- [ ] Logs are checked for sensitive information.
- [ ] Dependencies and secrets are scanned.
- [ ] Data classification and privacy questions are resolved.

## Release and operations

- [ ] Production configuration is documented.
- [ ] Build and deployment are repeatable.
- [ ] Health checks and critical metrics are available.
- [ ] Alert owner and escalation path are known.
- [ ] Rollback process is documented and safe.
- [ ] Backup and restore expectations are confirmed.
- [ ] Post-deployment smoke test is defined.

## Documentation

- [ ] Release-blocking TBDs are resolved.
- [ ] Open questions have owners and dates.
- [ ] ADRs capture cross-cutting decisions.
- [ ] Setup instructions have been tested by another contributor.
- [ ] Product and technical owners sign off on the Foundation Release.
