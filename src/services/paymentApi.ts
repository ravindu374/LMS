import api from "./api";

export const getPayments =
  async () => {

    const response =
      await api.get(
        "/payments"
      );

    return response.data;

  };

export const updatePayment =
  async (
    enrollmentId: number,
    is_paid: boolean
  ) => {

    const response =
      await api.put(
        `/payments/${enrollmentId}`,
        {
          is_paid,
        }
      );

    return response.data;

  };