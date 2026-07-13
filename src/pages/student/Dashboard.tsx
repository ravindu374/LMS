import StudentLayout from "../../layouts/StudentLayout";

import StatCard from "../../components/cards/StatCard";
import ZoomCard from "../../components/cards/ZoomCard";
import QuizCard from "../../components/cards/QuizCard";

import DashboardChart from "../../components/cards/DashboardChart";
import AnnouncementCard from "../../components/cards/AnnouncementCard";

import { useAuth } from "../../context/AuthContext";

import { useStudentClasses } from "../../hooks/useStudentClasses";
import { useStudentQuizzes } from "../../hooks/useStudentQuizzes";
import { useStudentAnnouncements } from "../../hooks/useStudentAnnouncements";
import { useEnrollmentsApi } from "../../hooks/useEnrollmentsApi";

export default function Dashboard() {
  const { user } = useAuth();
  
  const { enrollments } =
    useEnrollmentsApi(
      user?.id || 0
    );

    const { classes } =
      useStudentClasses(
        user?.id || 0
      );

    const { quizzes } =
      useStudentQuizzes(
        user?.id || 0
      );

    const { announcements } =
      useStudentAnnouncements(
        user?.id || 0
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

      <DashboardChart
        subjects={enrollments.length}
        classes={classes.length}
        quizzes={quizzes.length}
        announcements={announcements.length}
      />

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-5">
        Upcoming Classes
      </h2>

      {classes.length === 0 ? (

        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-slate-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-800
            p-8
            text-center
          "
        >

          <p className="text-slate-500 dark:text-slate-400">
            No classes available for your enrolled subjects.
          </p>

        </div>

      ) : (

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

      )}

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-5">
          Active Quizzes
        </h2>

        {quizzes.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              p-8
              text-center
            "
          >

            <p className="text-slate-500 dark:text-slate-400">
              No quizzes available.
            </p>

          </div>

        ) : (

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

        )}

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-5">
          Recent Announcements
        </h2>

        {announcements.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              p-8
              text-center
            "
          >

            <p className="text-slate-500 dark:text-slate-400">
              No announcements available.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {announcements
              .slice(-3)
              .reverse()
              .map((item) => (

                <AnnouncementCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                />

              ))}

          </div>

        )}

  </StudentLayout>
);
}