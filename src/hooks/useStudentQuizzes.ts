import { useMemo } from "react";

import { getStudentQuizzes } from "../services/quizApi";

import { useApiResource } from "./useApiResource";

export interface StudentQuiz {
  id: number;
  title: string;
  deadline: string;
  formLink: string;
  subject_id: number;
}

const EMPTY: any[] = [];

export function useStudentQuizzes(userId: number) {
  const { data, loading, error, refresh } = useApiResource<any[]>(
    userId ? `quizzes:student:${userId}` : null,
    () => getStudentQuizzes(userId),
    EMPTY
  );

  const quizzes = useMemo<StudentQuiz[]>(
    () =>
      data.map((item) => ({
        id: item.id,
        title: item.title,
        deadline: item.deadline,
        formLink: item.form_link,
        subject_id: item.subject_id,
      })),
    [data]
  );

  return { quizzes, loading, error, refresh };
}
