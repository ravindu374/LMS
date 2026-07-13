import StudentLayout from "../../layouts/StudentLayout";
import ZoomCard from "../../components/cards/ZoomCard";

import {
  useStudentClasses,
} from "../../hooks/useStudentClasses";

import { useAuth } from "../../context/AuthContext";

export default function Classes() {

  const { user } = useAuth();

  const { classes } =
    useStudentClasses(
      user?.id || 0
    );


  return (

      <StudentLayout>

      <div className="mb-10">

      <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
      Classes
      </h1>

      <p className="mt-2 text-slate-500 dark:text-slate-400">
      Join your upcoming live classes from here.
      </p>

      </div>

      {classes.length === 0 ? (

      <div
      className="
      rounded-3xl
      border
      border-dashed
      border-slate-300
      dark:border-slate-700
      bg-white
      dark:bg-slate-800
      p-12
      text-center
      "
      >

      <p className="text-slate-500 dark:text-slate-400">

      No upcoming classes.

      </p>

      </div>

      ) : (

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

      {classes.map((item) => (

      <ZoomCard
      key={item.id}
      title={item.title}
      date={item.date}
      time={item.time}
      link={item.zoomLink}
      />

      ))}

      </div>

      )}

      </StudentLayout>

      );
}