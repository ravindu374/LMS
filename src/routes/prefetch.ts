/**
 * Route chunk prefetching.
 *
 * Code splitting means a route's JS is only fetched when you navigate to it,
 * which trades a smaller first load for a short delay on each navigation.
 * Prefetching on hover/focus buys back that delay: by the time the click
 * lands, the chunk is usually already in the browser cache.
 *
 * The dynamic import specifiers must match the ones in AppRoutes.tsx exactly,
 * otherwise the bundler treats them as separate chunks.
 */

type Loader = () => Promise<unknown>;

const loaders: Record<string, Loader> = {
  "/dashboard": () => import("../pages/student/Dashboard"),
  "/subjects": () => import("../pages/student/Subjects"),
  "/my-subjects": () => import("../pages/student/MySubjects"),
  "/classes": () => import("../pages/student/Classes"),
  "/quizzes": () => import("../pages/student/Quizzes"),
  "/announcements": () => import("../pages/student/Announcements"),
  "/register": () => import("../pages/public/register"),

  "/admin/dashboard": () => import("../pages/admin/AdminDashboard"),
  "/admin/subjects": () => import("../pages/admin/ManageSubjects"),
  "/admin/users": () => import("../pages/admin/ManageUsers"),
  "/admin/classes": () => import("../pages/admin/ManageClasses"),
  "/admin/quizzes": () => import("../pages/admin/ManageQuizzes"),
  "/admin/announcements": () => import("../pages/admin/ManageAnnouncements"),
  "/admin/payments": () => import("../pages/admin/ManagePayments"),
};

const started = new Set<string>();

/** Start downloading the chunk for `path`. Safe to call repeatedly. */
export function prefetchRoute(path: string) {
  if (started.has(path)) return;

  const load = loaders[path];
  if (!load) return;

  started.add(path);

  // Failures are non-fatal: the route still loads normally on navigation.
  void load().catch(() => {
    started.delete(path);
  });
}

/**
 * Warm the landing route for the current session once the browser is idle,
 * so the post-login navigation does not pay for a chunk download.
 */
export function prefetchLandingRoute(role: string | undefined) {
  const path =
    role === "admin" ? "/admin/dashboard" : "/dashboard";

  const run = () => prefetchRoute(path);

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 2000 });
  } else {
    setTimeout(run, 300);
  }
}
