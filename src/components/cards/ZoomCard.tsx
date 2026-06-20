interface ZoomCardProps {
  title: string;
  date: string;
  time: string;
  link: string;
}

export default function ZoomCard({
  title,
  date,
  time,
  link,
}: ZoomCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-5">
      <h3 className="font-bold">
        {title}
      </h3>

      <p className="text-gray-600 mt-2">
        {date}
      </p>

      <p className="text-gray-600">
        {time}
      </p>

      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Join Class
      </a>
    </div>
  );
}