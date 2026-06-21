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

  export const registerUser =
  async (
    name: string,
    email: string,
    password: string
  ) => {

    const response =
      await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

    return response.data;
  };