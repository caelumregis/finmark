import { useEffect, useState } from "react";

import { getHealth } from "../api/health";

type HealthState =
  | { status: "loading" }
  | { status: "healthy"; service: string }
  | { status: "unavailable"; message: string };

export function useHealthStatus() {
  const [state, setState] = useState<HealthState>({
    status: "loading",
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    void getHealth(controller.signal)
      .then((health) => {
        setState({
          status: "healthy",
          service: health.service,
        });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setState({
          status: "unavailable",
          message:
            error instanceof Error
              ? error.message
              : "The API could not be reached.",
        });
      });

    return () => {
      controller.abort();
    };
  }, [attempt]);

  function checkAgain() {
    setState({ status: "loading" });
    setAttempt((currentAttempt) => currentAttempt + 1);
  }

  return {
    state,
    checkAgain,
  };
}
