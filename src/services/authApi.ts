import api from "./api";

const API_URL = "/auth";

export const loginUser =
  async (
    email: string,
    password: string
  ) => {
    const response =
      await api.post(
        `${API_URL}/login`,
        {
          email,
          password,
        }
      );

    return response.data;
  };