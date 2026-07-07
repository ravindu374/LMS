import { useState } from "react";

import StudentLayout from "../../layouts/StudentLayout";
import SubjectCard from "../../components/cards/SubjectCard";
import SearchBar from "../../components/ui/SearchBar";

import { useSubjectsApi } from "../../hooks/useSubjectsApi";
import { useAuth, } from "../../context/AuthContext";

import { useEnrollmentsApi,} from "../../hooks/useEnrollmentsApi";

export default function Subjects() {
  const [search, setSearch] = useState("");

  const { subjects } = useSubjectsApi();

  const filteredSubjects =
    subjects.filter((subject) =>
      subject.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  const { user } = useAuth();

  const {
      enrollments,
      addEnrollment,
      deleteEnrollmentById,
    } =
      useEnrollmentsApi(
        user?.id || 0
      );

  


  return (
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-6">
        Subjects
      </h1>

      <SearchBar
        value={search}
        onChange={setSearch}
      />
      <div className="grid md:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => {

          const enrollment =
            enrollments.find(
              (e) =>
                e.subject_id ===
                subject.id
            );

          return (

            <div key={subject.id}>

              <SubjectCard
                name={subject.name}
                lecturer={subject.lecturer}
              />

              <div className="mt-3">

                {enrollment?.is_paid ? (

                  <button
                    disabled
                    className="
                      bg-gray-500
                      text-white
                      px-4
                      py-2
                      rounded
                      cursor-not-allowed
                    "
                  >
                    ✅ Paid Subject
                  </button>

                ) : enrollment ? (

                  <button
                    onClick={() =>
                      deleteEnrollmentById(
                        enrollment.id
                      )
                    }
                    className="
                      bg-red-600
                      text-white
                      px-4
                      py-2
                      rounded
                    "
                  >
                    Unenroll
                  </button>

                ) : (

                  <button
                    onClick={() =>
                      addEnrollment(
                        subject.id
                      )
                    }
                    className="
                      bg-blue-600
                      text-white
                      px-4
                      py-2
                      rounded
                    "
                  >
                    Enroll
                  </button>

                )}

              </div>

            </div>

          );
        })}
      </div>
    </StudentLayout>
    
  );
}