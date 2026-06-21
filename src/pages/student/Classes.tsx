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
      <h1 className="text-3xl font-bold mb-6">
        Classes
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
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
    </StudentLayout>
  );
}