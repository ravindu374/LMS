import { useCallback } from "react";

import {
  getPayments,
  updatePayment,
} from "../services/paymentApi";

import { invalidate, useApiResource } from "./useApiResource";

const EMPTY: any[] = [];

export function usePaymentsApi() {
  const {
    data: payments,
    loading,
    error,
    refresh,
  } = useApiResource<any[]>("payments", getPayments, EMPTY);

  const togglePayment = useCallback(
    async (id: number, is_paid: boolean) => {
      await updatePayment(id, is_paid);

      // The student's Subjects page reads is_paid off the enrollment row.
      invalidate("enrollments:");

      await refresh();
    },
    [refresh]
  );

  return {
    payments,
    loading,
    error,
    refresh,
    togglePayment,
  };
}
