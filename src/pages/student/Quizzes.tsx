import StudentLayout from "../../layouts/StudentLayout";
import QuizCard from "../../components/cards/QuizCard";
import DataState from "../../components/ui/DataState";

import {
  useStudentQuizzes,
} from "../../hooks/useStudentQuizzes";

import { useAuth } from "../../context/AuthContext";

export default function Quizzes() {

  const { user } = useAuth();

  const { quizzes, loading, error, refresh } =
    useStudentQuizzes(user?.id || 0);

  return (

      <StudentLayout>

      <div className="mb-10">

      <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
      Quizzes
      </h1>

      <p className="mt-2 text-slate-500 dark:text-slate-400">
      Complete your quizzes before the deadline.
      </p>

      </div>

      <DataState
      loading={loading}
      error={error}
      isEmpty={quizzes.length === 0}
      emptyMessage="No quizzes available."
      onRetry={refresh}
      >

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

      {quizzes.map((quiz) => (

      <QuizCard
      key={quiz.id}
      title={quiz.title}
      deadline={quiz.deadline}
      link={quiz.formLink}
      />

      ))}

      </div>

      </DataState>

      </StudentLayout>

      );
}