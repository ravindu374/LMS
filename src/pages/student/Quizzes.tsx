import StudentLayout from "../../layouts/StudentLayout";
import QuizCard from "../../components/cards/QuizCard";

import {
  useStudentQuizzes,
} from "../../hooks/useStudentQuizzes";

import { useAuth } from "../../context/AuthContext";

export default function Quizzes() {
  
  const { user } = useAuth();

  const { quizzes } =
    useStudentQuizzes(
      user?.id || 0
    );

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

      {quizzes.length === 0 ? (

      <div
      className="
      rounded-3xl
      border
      border-dashed
      border-slate-300
      dark:border-slate-700
      bg-white
      dark:bg-slate-800
      p-12
      text-center
      "
      >

      <p className="text-slate-500 dark:text-slate-400">

      No quizzes available.

      </p>

      </div>

      ) : (

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

      )}

      </StudentLayout>

      );
}