/**
 * Turns an axios/network error into copy a non-technical user can act on.
 * Centralized so every form (login, register, admin CRUD) reports failures
 * the same way instead of each catch block guessing at err.response.data shape.
 */
export function getErrorMessage(
  err: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (err && typeof err === "object") {
    const anyErr = err as {
      code?: string;
      message?: string;
      response?: { status?: number; data?: { message?: string } };
    };

    // Render's free tier sleeps after inactivity; the first request of a
    // session can take 30s+ to wake it, which surfaces as a timeout.
    if (anyErr.code === "ECONNABORTED") {
      return "The server is taking too long to respond. It may be waking up — please try again in a moment.";
    }

    const serverMessage = anyErr.response?.data?.message;
    if (serverMessage) return serverMessage;

    if (anyErr.response?.status === undefined) {
      return "Could not reach the server. Check your connection and try again.";
    }

    if (anyErr.response.status >= 500) {
      return "The server ran into a problem on its end. Please try again shortly.";
    }
  }

  return fallback;
}
