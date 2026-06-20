import api from "./api";

const API_URL = "/quizzes";

export const getQuizzes =
  async () => {
    const response =
      await api.get(API_URL);

    return response.data;
  };

export const createQuiz =
  async (
    title: string,
    deadline: string,
    form_link: string,
    subject_id: number
  ) => {
    const response =
      await api.post(
        API_URL,
        {
          title,
          deadline,
          form_link,
          subject_id
        }
      );

    return response.data;
  };

export const deleteQuiz =
  async (id: number) => {
    const response =
      await api.delete(
        `${API_URL}/${id}`
      );

    return response.data;
  };

export const getStudentQuizzes =
  async (
    userId: number
  ) => {

    const response =
      await api.get(
        `/quizzes/student/${userId}`
      );

    return response.data;
  };