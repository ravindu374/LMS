import api from "./api";

const API_URL = "/announcements";

export const getAnnouncements =
  async () => {
    const response =
      await api.get(API_URL);

    return response.data;
  };

export const createAnnouncement =
  async (
    title: string,
    description: string,
    subject_id: number
  ) => {
    const response =
      await api.post(
        API_URL,
        {
          title,
          description,
          subject_id
        }
      );

    return response.data;
  };

export const deleteAnnouncement =
  async (id: number) => {
    const response =
      await api.delete(
        `${API_URL}/${id}`
      );

    return response.data;
  };

export const getStudentAnnouncements =
  async (
    userId: number
  ) => {

    const response =
      await api.get(
        `/announcements/student/${userId}`
      );

    return response.data;
  };