import AdminLayout from "../../layouts/AdminLayout";

import {
  usePaymentsApi,
} from "../../hooks/usePaymentsApi";

export default function ManagePayments() {

  const {
    payments,
    togglePayment,
  } = usePaymentsApi();

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Manage Payments
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <table className="w-full">

          <thead>

            <tr>
              <th className="text-left p-2">
                Student
              </th>

              <th className="text-left p-2">
                Subject
              </th>

              <th className="text-left p-2">
                Status
              </th>

              <th className="text-left p-2">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.map(
              (item) => (
                <tr key={item.id}>

                  <td className="p-2">
                    {item.student_name}
                  </td>

                  <td className="p-2">
                    {item.subject_name}
                  </td>

                  <td className="p-2">

                    {item.is_paid
                      ? "✅ Paid"
                      : "❌ Unpaid"}

                  </td>

                  <td className="p-2">

                    <button
                      onClick={() =>
                        togglePayment(
                          item.id,
                          !item.is_paid
                        )
                      }
                      className={
                        item.is_paid
                          ? "bg-orange-500 text-white px-3 py-1 rounded"
                          : "bg-green-600 text-white px-3 py-1 rounded"
                      }
                    >

                      {item.is_paid
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

    </AdminLayout>
  );
}