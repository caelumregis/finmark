# Foundation Release user journeys

## Journey 1: First successful use

### Preconditions

- User has access to the Foundation environment.
- Required product configuration exists.

### Flow

1. User enters Finmark.
2. System establishes the user’s identity and access.
3. User starts the primary workflow.
4. User supplies the required information.
5. System validates the information.
6. User confirms the action.
7. System persists the result and shows a clear success state.
8. User can return later and find the same result.

### Acceptance criteria

- The journey can be completed without operator intervention.
- Validation does not discard valid user input.
- A repeated submission does not create unintended duplicates.
- A successful result remains available after a new session.

## Journey 2: Correct invalid input

1. User submits missing or invalid information.
2. System rejects only the invalid action.
3. System identifies the affected fields and expected correction.
4. User corrects the input and completes the workflow.

## Journey 3: Recover from a system failure

1. A dependency or server operation fails.
2. System preserves a safe state and does not claim success.
3. User sees a recoverable message without internal or sensitive details.
4. Operator can correlate the failure using logs.

## Journey 4: Unauthorized access

1. A user requests a resource they do not own or cannot access.
2. System returns the approved denial response.
3. No restricted resource data is revealed.
4. The event is recorded according to the security policy.

## Journey details to confirm

- Final user role names
- Final domain object and field names
- Authentication entry point
- Whether removal means archive, soft delete, or permanent deletion
- Offline, import, approval, or collaboration behavior, if any
