import { useHealthStatus } from "./hooks/useHealthStatus";

import "./App.css";

export function App() {
  const { state, checkAgain } = useHealthStatus();

  return (
    <main className="app">
      <section className="app__content">
        <p className="app__eyebrow">FinMark</p>
        <h1>Business intelligence for growing SMEs</h1>
        <p className="app__introduction">
          A reliable financial operations platform for growing businesses.
        </p>

        <section className="health-card" aria-live="polite">
          <p className="health-card__label">Platform status</p>

          {state.status === "loading" && (
            <>
              <h2>Checking API</h2>
              <p>Confirming that the FinMark service is available.</p>
            </>
          )}

          {state.status === "healthy" && (
            <>
              <h2 className="health-card__success">API operational</h2>
              <p>
                Connected successfully to <strong>{state.service}</strong>.
              </p>
            </>
          )}

          {state.status === "unavailable" && (
            <>
              <h2 className="health-card__error">API unavailable</h2>
              <p>{state.message}</p>
              <button type="button" onClick={checkAgain}>
                Check again
              </button>
            </>
          )}
        </section>
      </section>
    </main>
  );
}
