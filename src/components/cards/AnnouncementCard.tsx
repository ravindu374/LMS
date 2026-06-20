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
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-bold text-lg">
        {title}
      </h3>

      <p className="text-gray-600 mt-2">
        {description}
      </p>
    </div>
  );
}