import StudentLayout
from "../../layouts/StudentLayout";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useEnrollmentsApi,
} from "../../hooks/useEnrollmentsApi";

export default function MySubjects() {

  const { user } =
    useAuth();

  const {
    enrollments,
  } =
    useEnrollmentsApi(
      user?.id || 0
    );

  return (
    <StudentLayout>

      <h1 className="text-3xl font-bold mb-6">
        My Subjects
      </h1>

      <div className="grid gap-4">

        {enrollments.map(
          (subject) => (

            <div
              key={
                subject.subject_id
              }
              className="
                bg-white
                p-4
                rounded-xl
                shadow
              "
            >
              <h2 className="font-bold">
                {subject.name}
              </h2>

              <p>
                {
                  subject.lecturer
                }
              </p>

            </div>

          )
        )}

      </div>

    </StudentLayout>
  );
}