import api from "./api";

export const enrollSubject =
  async (
    user_id: number,
    subject_id: number
  ) => {

    const response =
      await api.post(
        "/enrollments",
        {
          user_id,
          subject_id,
        }
      );

    return response.data;
  };

export const getEnrollments =
  async (
    userId: number
  ) => {

    const response =
      await api.get(
        `/enrollments/${userId}`
      );

    return response.data;
  };

  export const checkEnrollment =
  async (
    userId: number,
    subjectId: number
  ) => {

    const response =
      await api.get(
        `/enrollments/check/${userId}/${subjectId}`
      );

    return response.data;
  };