# Foundation Release API contract

## Status

Endpoint names and domain resources are **TBD**. This document defines the contract conventions and inventory required before implementation is considered complete.

## Conventions

- Base path: `/api/v1` unless the selected framework or architecture defines another boundary.
- Content type: `application/json`.
- Authentication: TBD.
- Resource identifiers are opaque strings.
- Timestamps use ISO 8601 UTC.
- Requests are validated before domain logic runs.
- Errors use one stable envelope and never expose stack traces.
- Mutating operations define conflict and idempotency behavior.

## Proposed endpoint inventory

| Method | Path | Purpose | Authentication |
| --- | --- | --- | --- |
| `GET` | `/health` | Runtime health signal | TBD |
| `POST` | `/api/v1/records` | Create the primary Foundation record | Required |
| `GET` | `/api/v1/records` | List permitted records | Required |
| `GET` | `/api/v1/records/{id}` | Read one permitted record | Required |
| `PATCH` | `/api/v1/records/{id}` | Update permitted fields | Required |
| `DELETE` | `/api/v1/records/{id}` | Apply approved removal behavior | Required |

Rename `records` after the domain term is approved.

## Success envelope

```json
{
  "data": {},
  "meta": {
    "requestId": "opaque-request-id"
  }
}
```

## Error envelope

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Check the highlighted values and try again.",
    "fields": {
      "exampleField": "This value is required."
    },
    "requestId": "opaque-request-id"
  }
}
```

## Error codes

| Code | HTTP status | Meaning |
| --- | --- | --- |
| `VALIDATION_FAILED` | 400 or 422 | Input is incomplete or invalid |
| `UNAUTHENTICATED` | 401 | No valid identity is established |
| `FORBIDDEN` | 403 | Caller lacks permission |
| `NOT_FOUND` | 404 | Resource is unavailable to the caller |
| `CONFLICT` | 409 | Request conflicts with current state |
| `RATE_LIMITED` | 429 | Caller exceeded an approved limit |
| `INTERNAL_ERROR` | 500 | Unexpected safe server failure |

## Contract completion checklist

- Final resource names and schemas
- Required and optional fields
- Validation limits
- Pagination and ordering
- Authentication and authorization behavior
- Idempotency and concurrency rules
- Rate limits
- Examples for every Foundation endpoint
