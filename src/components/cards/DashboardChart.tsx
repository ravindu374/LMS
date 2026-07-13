import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  subjects: number;
  classes: number;
  quizzes: number;
  announcements: number;
}

export default function DashboardChart({
  subjects,
  classes,
  quizzes,
  announcements,
}: Props) {

  const data = [
    {
      name: "Subjects",
      value: subjects,
    },
    {
      name: "Classes",
      value: classes,
    },
    {
      name: "Quizzes",
      value: quizzes,
    },
    {
      name: "Announcements",
      value: announcements,
    },
  ];

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
        p-8
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          text-slate-800
          dark:text-white
        "
      >
        Platform Activity
      </h2>

      <p
        className="
          mt-2
          mb-6
          text-slate-500
          dark:text-slate-400
        "
      >
        Overview of your learning progress.
      </p>

      <div className="h-72">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#CBD5E1"
            />

            <XAxis
              dataKey="name"
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill: "#EFF6FF",
              }}
            />

            <Bar
              dataKey="value"
              fill="#2563EB"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}