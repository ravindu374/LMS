import { lazy, Suspense, useMemo } from "react";

import StudentLayout from "../../layouts/StudentLayout";

import StatCard from "../../components/cards/StatCard";
import ZoomCard from "../../components/cards/ZoomCard";
import QuizCard from "../../components/cards/QuizCard";

import AnnouncementCard from "../../components/cards/AnnouncementCard";
import DataState from "../../components/ui/DataState";

// recharts is ~400kb of the bundle and sits below the fold — load it
// separately so the dashboard stats paint without waiting for it.
const DashboardChart = lazy(
  () => import("../../components/cards/DashboardChart")
);

import { useAuth } from "../../context/AuthContext";

import { useStudentClasses } from "../../hooks/useStudentClasses";
import { useStudentQuizzes } from "../../hooks/useStudentQuizzes";
import { useStudentAnnouncements } from "../../hooks/useStudentAnnouncements";
import { useEnrollmentsApi } from "../../hooks/useEnrollmentsApi";

export default function Dashboard() {
  const { user } = useAuth();
  const userId = user?.id ?? 0;

  const { enrollments } = useEnrollmentsApi(userId);

  const {
    classes,
    loading: classesLoading,
    error: classesError,
    refresh: refreshClasses,
  } = useStudentClasses(userId);

  const {
    quizzes,
    loading: quizzesLoading,
    error: quizzesError,
    refresh: refreshQuizzes,
  } = useStudentQuizzes(userId);

  const {
    announcements,
    loading: announcementsLoading,
    error: announcementsError,
    refresh: refreshAnnouncements,
  } = useStudentAnnouncements(userId);

  // Newest three. slice() copies first, so reverse() does not mutate the
  // cached array shared with other pages.
  const recentAnnouncements = useMemo(
    () => announcements.slice(-3).reverse(),
    [announcements]
  );


  return (
  <StudentLayout>

    <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Continue your learning journey and stay updated with your latest activities.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <StatCard
          title="Enrolled Subjects"
          value={enrollments.length}
        />

        <StatCard
          title="Classes"
          value={classes.length}
        />

        <StatCard
          title="Quizzes"
          value={quizzes.length}
        />

      </div>

      <Suspense
        fallback={
          <div
            className="
              h-[27rem]
              rounded-3xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              animate-pulse
              mb-8
            "
          />
        }
      >
        <DashboardChart
          subjects={enrollments.length}
          classes={classes.length}
          quizzes={quizzes.length}
          announcements={announcements.length}
        />
      </Suspense>

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-5">
        Upcoming Classes
      </h2>

      <DataState
        loading={classesLoading}
        error={classesError}
        isEmpty={classes.length === 0}
        emptyMessage="No classes available for your enrolled subjects."
        onRetry={refreshClasses}
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {classes.map((item) => (

            <ZoomCard
              key={item.id}
              title={item.title}
              date={item.date}
              time={item.time}
              link={item.zoomLink}
            />

          ))}

        </div>
      </DataState>

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-5">
          Active Quizzes
        </h2>

        <DataState
          loading={quizzesLoading}
          error={quizzesError}
          isEmpty={quizzes.length === 0}
          emptyMessage="No quizzes available."
          onRetry={refreshQuizzes}
        >
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {quizzes.map((item) => (

              <QuizCard
                key={item.id}
                title={item.title}
                deadline={item.deadline}
                link={item.formLink}
              />

            ))}

          </div>
        </DataState>

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-5">
          Recent Announcements
        </h2>

        <DataState
          loading={announcementsLoading}
          error={announcementsError}
          isEmpty={announcements.length === 0}
          emptyMessage="No announcements available."
          onRetry={refreshAnnouncements}
          skeletonCount={2}
        >
          <div className="space-y-6">

            {recentAnnouncements.map((item) => (

              <AnnouncementCard
                key={item.id}
                title={item.title}
                description={item.description}
              />

            ))}

          </div>
        </DataState>

  </StudentLayout>
);
}