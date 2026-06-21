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
      <h1 className="text-3xl font-bold mb-6">
        Quizzes
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            title={quiz.title}
            deadline={quiz.deadline}
            link={quiz.formLink}
          />
        ))}
      </div>
    </StudentLayout>
  );
}