import { useCallback } from "react";

import {
  enrollSubject,
  getEnrollments,
  removeEnrollment,
} from "../services/enrollmentApi";

import { invalidate, useApiResource } from "./useApiResource";

const EMPTY: any[] = [];

export function useEnrollmentsApi(userId: number) {
  const {
    data: enrollments,
    loading,
    error,
    refresh,
  } = useApiResource<any[]>(
    userId ? `enrollments:${userId}` : null,
    () => getEnrollments(userId),
    EMPTY
  );

  const addEnrollment = useCallback(
    async (subjectId: number) => {
      await enrollSubject(userId, subjectId);

      // Enrolling changes what classes/quizzes/announcements this student
      // sees, so those caches have to go too.
      invalidate(`classes:student:${userId}`);
      invalidate(`quizzes:student:${userId}`);
      invalidate(`announcements:student:${userId}`);

      await refresh();
    },
    [userId, refresh]
  );

  const deleteEnrollmentById = useCallback(
    async (enrollmentId: number) => {
      await removeEnrollment(enrollmentId);

      invalidate(`classes:student:${userId}`);
      invalidate(`quizzes:student:${userId}`);
      invalidate(`announcements:student:${userId}`);

      await refresh();
    },
    [userId, refresh]
  );

  return {
    enrollments,
    loading,
    error,
    addEnrollment,
    deleteEnrollmentById,
  };
}
