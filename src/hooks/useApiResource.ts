import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Minimal fetch cache for the API layer.
 *
 * Two problems this solves:
 *
 * 1. Duplicate in-flight requests. The student dashboard mounts four hooks at
 *    once, and useEnrollmentsApi is used by Dashboard, Subjects and
 *    MySubjects. Without dedupe each mount opened its own request to Render.
 *
 * 2. Refetch on every navigation. Moving Subjects -> Dashboard -> Subjects
 *    re-downloaded the same rows each time. Entries live for TTL_MS, so
 *    tab-to-tab navigation is instant, and mutations refresh immediately
 *    via refresh() / invalidate().
 *
 * Entries expire on a timer rather than by comparing timestamps on read.
 * That keeps the render path free of Date.now(), which React treats as an
 * impure call during render.
 */

const TTL_MS = 60_000;

const cache = new Map<string, unknown>();
const expiryTimers = new Map<string, ReturnType<typeof setTimeout>>();
const inFlight = new Map<string, Promise<unknown>>();

function clearTimer(key: string) {
  const timer = expiryTimers.get(key);

  if (timer !== undefined) {
    clearTimeout(timer);
    expiryTimers.delete(key);
  }
}

function store(key: string, data: unknown) {
  clearTimer(key);

  cache.set(key, data);

  expiryTimers.set(
    key,
    setTimeout(() => {
      cache.delete(key);
      expiryTimers.delete(key);
    }, TTL_MS)
  );
}

function drop(key: string) {
  clearTimer(key);
  cache.delete(key);
}

/** Drop cached entries whose key starts with `prefix` (all keys if omitted). */
export function invalidate(prefix?: string) {
  for (const key of [...cache.keys()]) {
    if (!prefix || key.startsWith(prefix)) {
      drop(key);
    }
  }
}

function fetchWithDedupe<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const existing = inFlight.get(key);

  if (existing) {
    return existing as Promise<T>;
  }

  const request = fetcher()
    .then((data) => {
      store(key, data);

      return data;
    })
    .finally(() => {
      inFlight.delete(key);
    });

  inFlight.set(key, request);

  return request;
}

function describeError(err: unknown): string {
  const code = (err as { code?: string } | null)?.code;

  return code === "ECONNABORTED"
    ? "The server is taking too long to respond. It may be waking up — please try again."
    : "Could not load data. Please check your connection and try again.";
}

interface State<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

function initialState<T>(key: string | null, fallback: T): State<T> {
  if (!key) {
    return { data: fallback, loading: false, error: null };
  }

  if (cache.has(key)) {
    return { data: cache.get(key) as T, loading: false, error: null };
  }

  return { data: fallback, loading: true, error: null };
}

export interface ApiResource<T> {
  data: T;
  loading: boolean;
  error: string | null;
  /** Refetch, bypassing the cache. Use after a create/update/delete. */
  refresh: () => Promise<void>;
}

export function useApiResource<T>(
  /** Cache key. Pass null to skip fetching (e.g. user not loaded yet). */
  key: string | null,
  fetcher: () => Promise<T>,
  fallback: T
): ApiResource<T> {
  const [state, setState] = useState<State<T>>(() =>
    initialState(key, fallback)
  );

  // React's "adjust state when a prop changes" pattern: when the key changes
  // (e.g. the user id resolves), reset during render rather than firing an
  // extra effect + render pass.
  const [trackedKey, setTrackedKey] = useState(key);

  if (key !== trackedKey) {
    setTrackedKey(key);
    setState(initialState(key, fallback));
  }

  // Callers pass an inline arrow, so the fetcher's identity changes every
  // render. Keep the latest one in a ref (assigned in an effect, never during
  // render) so the fetch effect can depend on `key` alone.
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    if (!key) return;

    // A fresh entry was already picked up by initialState.
    if (cache.has(key)) return;

    let cancelled = false;

    void fetchWithDedupe(key, () => fetcherRef.current())
      .then((data) => {
        if (cancelled) return;

        setState({ data: data as T, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;

        setState((prev) => ({
          ...prev,
          loading: false,
          error: describeError(err),
        }));
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  // Fetches directly (rather than re-triggering the effect) so that callers
  // can `await refresh()` after a mutation and know the data has landed.
  const refresh = useCallback(async () => {
    if (!key) return;

    drop(key);

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await fetchWithDedupe(key, () => fetcherRef.current());

      setState({ data: data as T, loading: false, error: null });
    } catch (err: unknown) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: describeError(err),
      }));
    }
  }, [key]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refresh,
  };
}
