interface AnnouncementCardProps {
  title: string;
  description: string;
}

export default function AnnouncementCard({
  title,
  description,
}: AnnouncementCardProps) {

  if (!title) return null;

  return (

    <div
      className="
        group
        bg-white
        dark:bg-slate-800
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-700
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition
        overflow-hidden
      "
    >

      <div
        className="
          h-1.5
          bg-gradient-to-r
          from-blue-500
          via-indigo-500
          to-purple-500
        "
      />

      <div className="p-6">

        <div className="flex items-start justify-between">

          <div>

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

            <div
              className="
                w-14
                h-1
                rounded-full
                bg-blue-500
                mt-3
              "
            />

          </div>

        </div>

        <p
          className="
            mt-5
            leading-7
            text-slate-600
            dark:text-slate-300
          "
        >
          {description}
        </p>

      </div>

    </div>

  );

}