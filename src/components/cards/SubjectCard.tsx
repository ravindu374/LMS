interface SubjectCardProps {
  name: string;
  lecturer: string;
}

export default function SubjectCard({
  name,
  lecturer,
}: SubjectCardProps) {

  return (

    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-800
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition
        overflow-hidden
      "
    >

      <div
        className="
          h-2
          bg-gradient-to-r
          from-blue-500
          via-indigo-500
          to-purple-500
        "
      />

      <div className="p-6">

        <h3
          className="
            text-xl
            font-bold
            text-slate-800
            dark:text-white
          "
        >
          {name}
        </h3>

        <p
          className="
            mt-4
            text-slate-500
            dark:text-slate-400
          "
        >
          Lecturer
        </p>

        <p
          className="
            font-medium
            text-slate-700
            dark:text-slate-300
          "
        >
          {lecturer}
        </p>

      </div>

    </div>

  );

}