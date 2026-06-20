import {
  useEffect,
  useState,
} from "react";

import {
  getQuizzes,
  createQuiz,
  deleteQuiz,
} from "../services/quizApi";

export function useQuizzesApi() {
  const [quizzes, setQuizzes] =
    useState<any[]>([]);

  const loadQuizzes =
    async () => {
      const data =
        await getQuizzes();

      setQuizzes(data);
    };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const addQuiz =
    async (
      title: string,
      deadline: string,
      form_link: string,
      subject_id: number
    ) => {
      await createQuiz(
        title,
        deadline,
        form_link,
        subject_id
      );

      await loadQuizzes();
    };

  const removeQuiz =
    async (id: number) => {
      await deleteQuiz(id);

      await loadQuizzes();
    };

  return {
    quizzes,
    addQuiz,
    removeQuiz,
  };
}