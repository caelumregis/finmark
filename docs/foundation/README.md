# Foundation Release overview

## Objective

Define and deliver the smallest coherent version of Finmark that proves its primary user workflow. The exact workflow and target user remain **TBD** pending product confirmation.

## Release outcomes

By the end of the Foundation Release, the team should have:

1. A confirmed product problem, target user, and primary workflow.
2. An implementation that completes the agreed happy path.
3. Defined data ownership and API boundaries.
4. Automated checks for the critical workflow.
5. A repeatable deployment and rollback process.
6. Sufficient logging and error reporting to operate the release safely.
7. Updated documentation with no release-blocking TBDs.

## Proposed scope

The following is a planning scaffold, not an approved feature list:

- User can access the product through the agreed authentication model.
- User can create, view, update, and remove the primary Finmark record.
- User receives clear validation and error feedback.
- Data is persisted and isolated according to the agreed ownership model.
- Operators can deploy, observe, and roll back the service.

## Out of scope

Unless explicitly included in the Foundation Release:

- Advanced analytics and reporting
- Bulk workflows and complex imports
- Third-party integrations
- Native mobile applications
- Fine-grained enterprise permissions
- Billing and subscription management
- Multi-region or high-availability architecture

## Deliverables

- Approved product requirements
- Approved architecture and data model
- API contract for the Foundation workflow
- Working implementation of the primary journey
- Automated critical-path tests
- Deployment and rollback instructions
- Security and privacy review
- Resolved release-blocking open questions

## Definition of done

The Foundation Release is complete when every release gate in [the checklist](checklist.md) is satisfied, critical acceptance tests pass, known limitations are recorded, and the product owner and technical owner approve the release.

## Owners and dates

| Item | Value |
| --- | --- |
| Product owner | TBD |
| Technical owner | TBD |
| Release start date | TBD |
| Target completion date | TBD |
| Reviewers | TBD |
