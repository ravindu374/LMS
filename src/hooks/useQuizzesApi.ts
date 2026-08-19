import { useCallback } from "react";

import {
  getQuizzes,
  createQuiz,
  deleteQuiz,
} from "../services/quizApi";

import { invalidate, useApiResource } from "./useApiResource";

const EMPTY: any[] = [];

export function useQuizzesApi() {
  const {
    data: quizzes,
    loading,
    error,
    refresh,
  } = useApiResource<any[]>("quizzes", getQuizzes, EMPTY);

  const addQuiz = useCallback(
    async (
      title: string,
      deadline: string,
      form_link: string,
      subject_id: number
    ) => {
      await createQuiz(title, deadline, form_link, subject_id);

      invalidate("quizzes");
      await refresh();
    },
    [refresh]
  );

  const removeQuiz = useCallback(
    async (id: number) => {
      await deleteQuiz(id);

      invalidate("quizzes");
      await refresh();
    },
    [refresh]
  );

  return {
    quizzes,
    loading,
    error,
    refresh,
    addQuiz,
    removeQuiz,
  };
}
