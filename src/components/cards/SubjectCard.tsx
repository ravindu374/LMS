interface SubjectCardProps {
  name: string;
  lecturer: string;
}

export default function SubjectCard({
  name,
  lecturer,
}: SubjectCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-5">

      <h3 className="font-bold text-lg">
        {name}
      </h3>

      <p className="text-gray-600 mt-2">
        {lecturer}
      </p>

    </div>
  );
}