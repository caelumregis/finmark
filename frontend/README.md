# FinMark frontend

The FinMark frontend is a React and TypeScript application built with Vite.

## Requirements

- Node.js 25.9.x
- npm 11.12.x

Install dependencies from the repository root:

```bash
npm install
```

## Commands

Run commands from the repository root:

```bash
npm run dev --workspace @finmark/frontend
npm run typecheck --workspace @finmark/frontend
npm run lint --workspace @finmark/frontend
npm run build --workspace @finmark/frontend
```

## Configuration

Copy the example environment configuration when local overrides are needed:

```bash
cp frontend/.env.example frontend/.env
```

Available configuration:

```dotenv
VITE_API_BASE_URL=http://localhost:3001
```

Variables prefixed with `VITE_` are included in the browser bundle. They must never contain passwords, private API keys, database credentials, or other secrets.
