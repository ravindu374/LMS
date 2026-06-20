import { useEffect, useState } from "react";

export interface Quiz {
  id: number;
  title: string;
  deadline: string;
  formLink: string;
}

const STORAGE_KEY = "quizzes";

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setQuizzes(JSON.parse(stored));
    } else {
      const initialData = [
        {
          id: 1,
          title: "Quiz 01",
          deadline: "2026-07-10",
          formLink: "https://forms.google.com",
        },
      ];

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialData)
      );

      setQuizzes(initialData);
    }
  }, []);

  const save = (data: Quiz[]) => {
    setQuizzes(data);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  };

  const addQuiz = (
    title: string,
    deadline: string,
    formLink: string
  ) => {
    save([
      ...quizzes,
      {
        id: Date.now(),
        title,
        deadline,
        formLink,
      },
    ]);
  };

  const deleteQuiz = (id: number) => {
    save(
      quizzes.filter(
        (quiz) => quiz.id !== id
      )
    );
  };

  return {
    quizzes,
    addQuiz,
    deleteQuiz,
  };
}