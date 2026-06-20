interface SubjectCardProps {
  name: string;
  lecturer: string;
  onEnroll?: () => void;
  enrolled?: boolean;
}

export default function SubjectCard({
  name,
  lecturer,
  onEnroll,
  enrolled,
}: SubjectCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-5">

      <h3 className="font-bold text-lg">
        {name}
      </h3>

      <p className="text-gray-600 mt-2">
        {lecturer}
      </p>

      {onEnroll && (
        <button
          disabled={enrolled}
          onClick={onEnroll}
          className={`
            mt-4
            px-4
            py-2
            rounded
            text-white
            ${
              enrolled
                ? "bg-green-600 cursor-not-allowed"
                : "bg-blue-600"
            }
          `}
        >
          {enrolled
            ? "✓ Enrolled"
            : "Enroll"}
        </button>
      )}

    </div>
  );
}