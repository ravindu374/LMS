import api from "./api";

const API_URL = "/classes";

export const getClasses =
  async () => {
    const response =
      await api.get(API_URL);

    return response.data;
  };

export const createClass =
  async (
    title: string,
    class_date: string,
    class_time: string,
    zoom_link: string,
    subject_id: number
  ) => {
    const response =
      await api.post(
        API_URL,
        {
          title,
          class_date,
          class_time,
          zoom_link,
          subject_id
        }
      );

    return response.data;
  };

export const deleteClass =
  async (id: number) => {
    const response =
      await api.delete(
        `${API_URL}/${id}`
      );

    return response.data;
  };

export const getStudentClasses =
  async (
    userId: number
  ) => {

    const response =
      await api.get(
        `/classes/student/${userId}`
      );

    return response.data;
  };