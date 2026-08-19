/**
 * Shown while a lazily-loaded route chunk is downloading.
 * Deliberately dependency-free so it lives in the main chunk.
 */
export default function RouteFallback() {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-slate-100
        dark:bg-slate-950
      "
    >
      <div
        className="
          w-10
          h-10
          rounded-full
          border-4
          border-slate-300
          dark:border-slate-700
          border-t-blue-600
          animate-spin
        "
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
