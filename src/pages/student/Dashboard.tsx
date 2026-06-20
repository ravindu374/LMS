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
  const { user } =
      useAuth();

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

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-600 mt-2">
          View upcoming classes and quizzes.
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

      <h2 className="text-2xl font-bold mb-4">
        Upcoming Classes
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
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

      <h2 className="text-2xl font-bold mb-4">
        Active Quizzes
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {quizzes.map((item) => (
          <QuizCard
            key={item.id}
            title={item.title}
            deadline={item.deadline}
            link={item.formLink}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Recent Announcements
      </h2>

      <div className="space-y-4">
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

    </StudentLayout>
  );
}