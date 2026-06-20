import {
  useEffect,
  useState,
} from "react";

import {
  getStudentQuizzes,
} from "../services/quizApi";

export function useStudentQuizzes(
  userId: number
) {

  const [quizzes, setQuizzes] =
    useState<any[]>([]);

  const loadQuizzes =
    async () => {

      if (!userId) return;

      const data =
        await getStudentQuizzes(
          userId
        );

      setQuizzes(
        data.map(
          (item: any) => ({
            id: item.id,
            title: item.title,
            deadline:
              item.deadline,
            formLink:
              item.form_link,
            subject_id:
              item.subject_id,
          })
        )
      );
    };

  useEffect(() => {
    loadQuizzes();
  }, [userId]);

  return {
    quizzes,
  };
}