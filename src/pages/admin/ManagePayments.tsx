import { useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import DataState from "../../components/ui/DataState";

import {
  usePaymentsApi,
} from "../../hooks/usePaymentsApi";

import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../utils/errorMessage";

export default function ManagePayments() {

  const {
    payments,
    loading,
    error,
    refresh,
    togglePayment,
  } = usePaymentsApi();

  const toast = useToast();

  // Tracks which row's toggle is in flight so a slow request can't be
  // double-clicked into an inconsistent state.
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleToggle = async (
    id: number,
    nextIsPaid: boolean,
    studentName: string
  ) => {
    setUpdatingId(id);

    try {
      await togglePayment(id, nextIsPaid);

      toast.success(
        nextIsPaid
          ? `${studentName} marked as paid.`
          : `${studentName} marked as unpaid.`
      );
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Could not update payment status."));
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout>

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          Manage Payments
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Approve or revoke subject payments for enrolled students.
        </p>

      </div>
      <div
        className="
          rounded-3xl
          border
          border-slate-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-800
          shadow-sm
          overflow-hidden
        "
      >

        <div className="p-4">
          <DataState
            loading={loading}
            error={error}
            isEmpty={payments.length === 0}
            emptyMessage="No enrollments to manage yet."
            onRetry={refresh}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">

                <thead
                  className="
                    bg-slate-100
                    dark:bg-slate-900
                  "
                >

                  <tr>
                    <th className="
                              px-6
                              py-4
                              text-left
                              font-semibold
                              text-slate-700
                              dark:text-slate-300
                            ">
                      Student
                    </th>

                    <th className="
                          px-6
                          py-4
                          text-left
                          font-semibold
                          text-slate-700
                          dark:text-slate-300
                        ">

                      Subject
                    </th>

                    <th className="
                          px-6
                          py-4
                          text-left
                          font-semibold
                          text-slate-700
                          dark:text-slate-300
                        ">
                      Status
                    </th>

                    <th className="
                          px-6
                          py-4
                          text-left
                          font-semibold
                          text-slate-700
                          dark:text-slate-300
                        ">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {payments.map(
                    (item) => (
                      <tr
                          key={item.id}
                          className="
                            hover:bg-slate-50
                            dark:hover:bg-slate-700/40
                            transition-colors
                          "
                        >

                        <td className="
                            px-6
                            py-4
                            border-t
                            border-slate-200
                            dark:border-slate-700
                            text-slate-700
                            dark:text-slate-300
                          ">
                          {item.student_name}
                        </td>

                        <td className="
                            px-6
                            py-4
                            border-t
                            border-slate-200
                            dark:border-slate-700
                            text-slate-700
                            dark:text-slate-300
                          ">
                          {item.subject_name}
                        </td>

                        <td className="
                            px-6
                            py-4
                            border-t
                            border-slate-200
                            dark:border-slate-700
                          ">

                          <span
        className={
          item.is_paid
                        ? `
                          inline-flex
                          rounded-full
                          bg-emerald-100
                          dark:bg-emerald-900/30
                          text-emerald-700
                          dark:text-emerald-300
                          px-3
                          py-1
                          text-sm
                          font-medium
                        `
                        : `
                          inline-flex
                          rounded-full
                          bg-red-100
                          dark:bg-red-900/30
                          text-red-700
                          dark:text-red-300
                          px-3
                          py-1
                          text-sm
                          font-medium
                        `
                    }
                  >
                    {item.is_paid
                      ? "Paid"
                      : "Pending"}
                  </span>

                        </td>

                        <td className="
                            px-6
                            py-4
                            border-t
                            border-slate-200
                            dark:border-slate-700
                          ">

                          <button
                            onClick={() =>
                              handleToggle(
                                item.id,
                                !item.is_paid,
                                item.student_name
                              )
                            }
                            disabled={updatingId === item.id}
                            className={
                                        item.is_paid
                                          ? `
                                            rounded-xl
                                            bg-orange-500
                                            hover:bg-orange-600
                                            disabled:opacity-60
                                            disabled:cursor-not-allowed
                                            text-white
                                            px-5
                                            py-2
                                            transition
                                          `
                                          : `
                                            rounded-xl
                                            bg-green-600
                                            hover:bg-green-700
                                            disabled:opacity-60
                                            disabled:cursor-not-allowed
                                            text-white
                                            px-5
                                            py-2
                                            transition
                                          `
                                      }
                          >

                            {updatingId === item.id
                              ? "Updating…"
                              : item.is_paid
                              ? "Mark Unpaid"
                              : "Mark Paid"}

                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>
            </div>
          </DataState>
        </div>

      </div>

    </AdminLayout>
  );
}
