import type { ReactNode } from "react";

interface DataStateProps {
  loading: boolean;
  error: string | null;
  /** True when the request succeeded but returned nothing. */
  isEmpty: boolean;
  emptyMessage: string;
  onRetry?: () => void;
  /** Skeleton cards to show while loading. */
  skeletonCount?: number;
  children: ReactNode;
}

const panel = `
  rounded-2xl
  border
  border-dashed
  border-slate-300
  dark:border-slate-700
  bg-white
  dark:bg-slate-800
  p-8
  text-center
`;

/**
 * Distinguishes "still loading" from "nothing here".
 *
 * The API runs on Render's free tier, where the first request of a session
 * wakes a sleeping instance and can take 30s+. Previously every list rendered
 * its empty-state message during that window, so a cold start looked
 * identical to an account with no data.
 */
export default function DataState({
  loading,
  error,
  isEmpty,
  emptyMessage,
  onRetry,
  skeletonCount = 3,
  children,
}: DataStateProps) {
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div
            key={i}
            className="
              h-44
              rounded-2xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              animate-pulse
            "
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={panel}>
        <p className="text-slate-600 dark:text-slate-300">
          {error}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="
              mt-5
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-2.5
              font-medium
              transition
            "
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={panel}>
        <p className="text-slate-500 dark:text-slate-400">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
