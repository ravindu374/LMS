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

    <div className="mb-8">

    <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
    Available Subjects
    </h1>

    <p className="mt-2 text-slate-500 dark:text-slate-400">
    Enroll in subjects to access classes, quizzes and announcements.
    </p>

    </div>

    <div className="mb-8">
    <SearchBar
    value={search}
    onChange={setSearch}
    />
    </div>

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

    {filteredSubjects.map((subject) => {

    const enrollment =
    enrollments.find(
    (e) =>
    e.subject_id ===
    subject.id
    );

    return (

    <div
    key={subject.id}
    className="
    bg-white
    dark:bg-slate-800
    rounded-2xl
    border
    border-slate-200
    dark:border-slate-700
    shadow-sm
    hover:shadow-xl
    hover:-translate-y-1
    transition
    overflow-hidden
    "
    >

    <div className="p-6">

    <SubjectCard
    name={subject.name}
    lecturer={subject.lecturer}
    />

    <div className="mt-6">

    {enrollment?.is_paid ? (

    <button
    disabled
    className="
    w-full
    bg-green-600
    text-white
    py-3
    rounded-xl
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
    w-full
    bg-red-500
    hover:bg-red-600
    text-white
    py-3
    rounded-xl
    transition
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
    w-full
    bg-blue-600
    hover:bg-blue-700
    text-white
    py-3
    rounded-xl
    transition
    "
    >
    Enroll
    </button>

    )}

    </div>

    </div>

    </div>

    );

    })}

    </div>

    </StudentLayout>

    );
}