# Repository foundation

## Branch

`chore/repository-foundation`

## Goal

Establish a reproducible monorepo foundation for the FinMark frontend and backend before installing application dependencies.

## Commit history

| Commit | Purpose |
| --- | --- |
| `chore: configure npm workspace` | Configure the root npm workspace, Node version, formatting conventions, and ignored files |

The commit hash is intentionally omitted because hashes change when a commit is amended or rebased. The commit subject remains the stable reference.

## Repository structure

```text
finmark/
├── backend/
├── frontend/
├── docs/
├── .editorconfig
├── .gitignore
├── .nvmrc
└── package.json
```

The frontend and backend will be separate npm packages managed from a shared workspace root.

## npm workspace

The root `package.json` declares both application directories as workspaces:

```json
{
  "workspaces": [
    "frontend",
    "backend"
  ]
}
```

An npm workspace allows FinMark to:

- Manage frontend and backend packages from one repository.
- Install dependencies into a shared dependency tree where possible.
- Generate one root `package-lock.json`.
- Run common commands across both applications.
- Keep frontend and backend package boundaries explicit.

## Root scripts

```json
{
  "scripts": {
    "dev": "npm run dev --workspaces --if-present",
    "build": "npm run build --workspaces --if-present",
    "test": "npm run test --workspaces --if-present",
    "lint": "npm run lint --workspaces --if-present",
    "typecheck": "npm run typecheck --workspaces --if-present"
  }
}
```

`--workspaces` forwards the command to every configured workspace.

`--if-present` skips a workspace when it does not define the requested script. This is helpful during incremental setup because the frontend and backend will not receive every script at the same time.

Once both applications are established, the team may remove `--if-present` from required validation commands so missing scripts fail continuous integration instead of being silently skipped.

## Runtime version

`.nvmrc` contains:

```text
25.9.0
```

The root package also declares:

```json
{
  "engines": {
    "node": "25.9.x",
    "npm": "11.12.x"
  },
  "packageManager": "npm@11.12.1"
}
```

The project currently standardizes on Node.js 25.9 and npm 11.12 to match the required development and evaluation environment.

The exact npm version is recorded through `packageManager`, while the accepted patch ranges are documented through `engines`. Dependency versions will be made reproducible through the committed root `package-lock.json`.

Node.js 25 is not a long-term-support release. Before a production deployment, FinMark should migrate to a supported even-numbered LTS release and validate the complete build and test suite.

## Editor conventions

`.editorconfig` standardizes:

- UTF-8 encoding
- LF line endings
- Two-space indentation
- Final newlines
- Removal of trailing whitespace

Markdown files allow intentional trailing spaces because Markdown uses two trailing spaces for explicit line breaks.

## Ignored files

`.gitignore` prevents generated and sensitive files from entering source control, including:

- `node_modules`
- Build and coverage output
- Local environment files
- Logs
- Editor configuration
- Operating-system metadata

`.env.example` is explicitly allowed so the repository can document required configuration without storing real secrets.

## Commands used

```bash
git switch -c chore/repository-foundation
git add package.json .nvmrc .editorconfig .gitignore
git commit -m "chore: configure npm workspace"
git commit --amend --no-edit
```

## Verification

The implementation was checked with:

```bash
git show --check --stat --oneline HEAD
git status --short
```

The final worktree was clean, and all text files ended with a final newline.

## Challenge encountered

The first version of the files did not contain final newline characters. The issue was corrected and folded into the original commit with `git commit --amend --no-edit`.

Amending was appropriate because the newline correction belonged to the same logical change and the branch had not been shared.

## Possible refinements

- Remove `--if-present` from mandatory validation scripts after every workspace defines them.
- Add continuous integration after the frontend and backend validation commands exist.
- Add package-manager and dependency-update policies.
- Migrate from Node.js 25 to a supported even-numbered LTS release before production deployment.

## Lessons learned

- A monorepo can contain independently structured applications while sharing repository-level tooling.
- npm workspaces coordinate packages; they do not combine application responsibilities.
- Reproducible runtime and formatting rules should be established before dependency installation.
- Small formatting details such as final newlines affect repository quality and diff consistency.
- An amend updates the latest commit rather than creating a separate correction commit.
