import {
  useEffect,
  useState,
} from "react";

import {
  getPayments,
  updatePayment,
} from "../services/paymentApi";

export function usePaymentsApi() {

  const [
    payments,
    setPayments,
  ] = useState<any[]>([]);

  const loadPayments =
    async () => {

      const data =
        await getPayments();

      setPayments(data);

    };

  useEffect(() => {
    loadPayments();
  }, []);

  const togglePayment =
    async (
      id: number,
      is_paid: boolean
    ) => {

      await updatePayment(
        id,
        is_paid
      );

      await loadPayments();

    };

  return {
    payments,
    togglePayment,
  };

}