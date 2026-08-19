import { useMemo, useState } from "react";

import StudentLayout from "../../layouts/StudentLayout";
import SubjectCard from "../../components/cards/SubjectCard";
import SearchBar from "../../components/ui/SearchBar";
import DataState from "../../components/ui/DataState";

import { useSubjectsApi } from "../../hooks/useSubjectsApi";
import { useAuth, } from "../../context/AuthContext";

import { useEnrollmentsApi,} from "../../hooks/useEnrollmentsApi";

interface Enrollment {
  id: number;
  subject_id: number;
  is_paid?: boolean;
}

export default function Subjects() {
  const [search, setSearch] = useState("");

  const {
    subjects,
    loading,
    error,
    refresh,
  } = useSubjectsApi();

  const { user } = useAuth();

  const {
    enrollments,
    addEnrollment,
    deleteEnrollmentById,
  } = useEnrollmentsApi(user?.id || 0);

  // Re-filter only when the query or the list actually changes, not on every
  // unrelated re-render (theme toggle, sidebar, enrollment refresh).
  const filteredSubjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return subjects;

    return subjects.filter((subject) =>
      subject.name.toLowerCase().includes(query)
    );
  }, [subjects, search]);

  // Index the enrollments once instead of running enrollments.find() inside
  // the render loop for every subject.
  const enrollmentBySubject = useMemo(() => {
    const map = new Map<number, Enrollment>();

    for (const enrollment of enrollments as Enrollment[]) {
      map.set(enrollment.subject_id, enrollment);
    }

    return map;
  }, [enrollments]);


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

    <DataState
    loading={loading}
    error={error}
    isEmpty={filteredSubjects.length === 0}
    emptyMessage={
    search.trim()
    ? "No subjects match your search."
    : "No subjects are available yet."
    }
    onRetry={refresh}
    >

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

    {filteredSubjects.map((subject) => {

    const enrollment =
    enrollmentBySubject.get(subject.id);

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

    </DataState>

    </StudentLayout>

    );
}