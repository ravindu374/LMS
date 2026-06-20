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

          const enrolled =
            enrollments.some(
              (e) =>
                e.subject_id ===
                subject.id
            );

          return (
            <SubjectCard
              key={subject.id}
              name={subject.name}
              lecturer={subject.lecturer}
              enrolled={enrolled}
              onEnroll={() =>
                addEnrollment(
                  subject.id
                )
              }
            />
          );
        })}
      </div>
    </StudentLayout>
    
  );
}