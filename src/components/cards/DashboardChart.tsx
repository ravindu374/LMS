import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Platform Activity
      </h2>

      <div className="h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#2563EB"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}