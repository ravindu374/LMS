import {
  useEffect,
  useState,
} from "react";

import {
  enrollSubject,
  getEnrollments,
  checkEnrollment,
  removeEnrollment,
} from "../services/enrollmentApi";

export function useEnrollmentsApi(
  userId: number
) {

  const [
    enrollments,
    setEnrollments,
  ] = useState<any[]>([]);

  // const isEnrolled =
  // async (
  //   subjectId: number
  // ) => {

  //   const result =
  //     await checkEnrollment(
  //       userId,
  //       subjectId
  //     );

  //   return result.enrolled;
  // };

  const loadEnrollments =
    async () => {

      if (!userId) return;

      const data =
        await getEnrollments(
          userId
        );

      setEnrollments(data);
    };

  useEffect(() => {
    loadEnrollments();
  }, [userId]);

  const addEnrollment =
    async (
      subjectId: number
    ) => {

      await enrollSubject(
        userId,
        subjectId
      );

      await loadEnrollments();
    };
  
  const deleteEnrollmentById =
    async (
      enrollmentId: number
    ) => {

      await removeEnrollment(
        enrollmentId
      );

      await loadEnrollments();

    };
    
  return {
  enrollments,
  addEnrollment,
  deleteEnrollmentById,
};
}
