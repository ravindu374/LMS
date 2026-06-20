import api from "./api";

const API_URL = "/subjects";

export const getSubjects =
  async () => {
    const response =
      await api.get(API_URL);

    return response.data;
  };

export const createSubject =
  async (
    name: string,
    lecturer: string
  ) => {
    const response =
      await api.post(
        API_URL,
        {
          name,
          lecturer,
        }
      );

    return response.data;
  };

export const updateSubject =
  async (
    id: number,
    name: string,
    lecturer: string
  ) => {
    const response =
      await api.put(
        `${API_URL}/${id}`,
        {
          name,
          lecturer,
        }
      );

    return response.data;
  };

export const deleteSubject =
  async (id: number) => {
    const response =
      await api.delete(
        `${API_URL}/${id}`
      );

    return response.data;
  };