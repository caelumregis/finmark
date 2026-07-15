# Foundation Release security and privacy

## Security objectives

- Only authenticated and authorized actors can access protected behavior.
- One user or tenant cannot access another’s data.
- Secrets and restricted data never enter source control or routine logs.
- Invalid input cannot alter unintended state.
- Operators can investigate security-relevant failures.

## Threat checklist

| Area | Foundation control | Status |
| --- | --- | --- |
| Authentication | Use an approved identity and session mechanism | TBD |
| Authorization | Enforce ownership or role checks on the server | TBD |
| Input handling | Schema validation, bounds, and safe encoding | TBD |
| Injection | Parameterized database access; no command construction from input | TBD |
| Secrets | Environment or managed secret store; documented rotation | TBD |
| Transport | TLS in deployed environments | TBD |
| Data at rest | Provider encryption plus approved access controls | TBD |
| Logging | Redaction and restricted retention | TBD |
| Dependencies | Lock versions and review known critical vulnerabilities | TBD |
| Abuse | Rate or size limits on exposed operations | TBD |

## Privacy questions

- What personal, financial, or regulated data does the Foundation Release process?
- What is the lawful and product purpose for each collected field?
- How long is each data class retained?
- Can a user export or delete their data?
- Which vendors receive data, and under what agreement?
- Where is data stored and processed?

## Logging rules

Do not log:

- Passwords, tokens, cookies, or authorization headers
- Full financial records
- Unredacted personal information
- Raw request or response bodies by default

Prefer logging request ID, actor ID where appropriate, resource ID, action, result, duration, and a safe error code.

## Security release gate

Before release, complete an access-control test, secret scan, dependency review, input-validation review, and manual check that logs contain no restricted data.
