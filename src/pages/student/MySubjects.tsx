import StudentLayout from "../../layouts/StudentLayout";

import {
  BookOpen,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useEnrollmentsApi,
} from "../../hooks/useEnrollmentsApi";

import DataState from "../../components/ui/DataState";

export default function MySubjects() {

  const { user } =
    useAuth();

  const {
    enrollments,
    loading,
    error,
  } =
    useEnrollmentsApi(
      user?.id || 0
    );

  return (

<StudentLayout>

<div className="mb-10">

<h1 className="text-4xl font-bold text-slate-800 dark:text-white">
📚 My Learning
</h1>

<p className="mt-2 text-slate-500 dark:text-slate-400">
Access your enrolled subjects and continue your learning journey.
</p>

</div>

<DataState
loading={loading}
error={error}
isEmpty={enrollments.length === 0}
emptyMessage="Enroll in a subject to begin your learning experience."
>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

{enrollments.map((subject) => (

<div
key={subject.subject_id}
className="
group
rounded-3xl
bg-white
dark:bg-slate-800
border
border-slate-200
dark:border-slate-700
shadow-sm
hover:shadow-xl
hover:-translate-y-2
transition
overflow-hidden
"
>

<div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"/>

<div className="p-6">

<div
className="
w-14
h-14
rounded-2xl
bg-blue-100
dark:bg-blue-900/40
flex
items-center
justify-center
mb-6
"
>

<BookOpen
className="text-blue-600"
size={28}
/>

</div>

<h2 className="text-xl font-bold text-slate-800 dark:text-white">
{subject.name}
</h2>

<div className="flex items-center gap-2 mt-4 text-slate-500 dark:text-slate-400">

<GraduationCap size={18}/>

<span>
{subject.lecturer}
</span>

</div>

<button
className="
mt-8
w-full
flex
justify-center
items-center
gap-2
rounded-xl
bg-blue-600
hover:bg-blue-700
text-white
py-3
transition
"
>

Continue Learning

<ArrowRight size={18}/>

</button>

</div>

</div>

))}

</div>

</DataState>

</StudentLayout>

);
}