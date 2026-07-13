interface QuizCardProps {
  title: string;
  deadline: string;
  link: string;
}

export default function QuizCard({
  title,
  deadline,
  link,
}: QuizCardProps) {

  return (

    <div
      className="
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
          from-indigo-500
          to-blue-500
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
          {title}
        </h3>

        <p
          className="
            mt-4
            text-slate-500
            dark:text-slate-400
          "
        >
          Deadline
        </p>

        <p
          className="
            font-medium
            text-slate-700
            dark:text-slate-300
          "
        >
          {deadline}
        </p>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="
            mt-8
            w-full
            flex
            justify-center
            items-center
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            transition
          "
        >
          Start Quiz
        </a>

      </div>

    </div>

  );

}