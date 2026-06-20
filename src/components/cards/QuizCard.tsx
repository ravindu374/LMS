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
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-5">
      <h3 className="font-bold">
        {title}
      </h3>

      <p className="text-gray-500 mt-2">
        Deadline: {deadline}
      </p>

      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Quiz
      </a>
    </div>
  );
}