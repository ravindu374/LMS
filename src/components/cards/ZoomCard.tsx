import {
  CalendarDays,
  Clock3,
  Video,
  ArrowRight,
} from "lucide-react";

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
        transition-all
        duration-300
        overflow-hidden
      "
    >

      <div
        className="
          h-2
          bg-gradient-to-r
          from-emerald-500
          via-teal-500
          to-blue-500
        "
      />

      <div className="p-6">

        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-emerald-100
            dark:bg-emerald-900/30
            text-emerald-700
            dark:text-emerald-300
            px-3
            py-1
            text-sm
            font-medium
          "
        >
          <Video size={16} />
          Live Class
        </div>

        <h2
          className="
            mt-5
            text-2xl
            font-bold
            text-slate-800
            dark:text-white
          "
        >
          {title}
        </h2>

        <div className="mt-6 space-y-4">

          <div className="flex items-center gap-3">

            <CalendarDays
              size={18}
              className="text-blue-500"
            />

            <span className="text-slate-600 dark:text-slate-300">
              {date}
            </span>

          </div>

          <div className="flex items-center gap-3">

            <Clock3
              size={18}
              className="text-orange-500"
            />

            <span className="text-slate-600 dark:text-slate-300">
              {time}
            </span>

          </div>

        </div>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-2
            w-full
            rounded-xl
            bg-emerald-600
            hover:bg-emerald-700
            text-white
            py-3
            font-medium
            transition
          "
        >
          Join Class

          <ArrowRight
            size={18}
            className="
              transition-transform
              group-hover:translate-x-1
            "
          />

        </a>

      </div>

    </div>

  );

}