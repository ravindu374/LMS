interface Props {
  title: string;
  value: number;
}

export default function StatCard({
  title,
  value,
}: Props) {

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
        hover:shadow-lg
        transition
        p-6
      "
    >

      <p
        className="
          text-sm
          font-medium
          uppercase
          tracking-wide
          text-slate-500
          dark:text-slate-400
        "
      >
        {title}
      </p>

      <h2
        className="
          mt-5
          text-5xl
          font-bold
          text-slate-800
          dark:text-white
        "
      >
        {value}
      </h2>

    </div>

  );

}