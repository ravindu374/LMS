import api from "./api";

export const getUsers =
  async () => {
    const response =
      await api.get("/users");

    return response.data;
  };

export const createUser =
  async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    const response =
      await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

    return response.data;
  };

export const deleteUser =
  async (id: number) => {
    const response =
      await api.delete(
        `/users/${id}`
      );

    return response.data;
  };

  export const updatePayment =
  async (
    userId: number,
    is_paid: boolean
  ) => {

    const response =
      await api.put(
        `/users/${userId}/payment`,
        {
          is_paid,
        }
      );

    return response.data;
  };