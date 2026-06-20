import { useState } from "react";
import { useSubjectsApi } from "../../hooks/useSubjectsApi";
import AdminLayout from "../../layouts/AdminLayout";
import { useAnnouncementsApi } from "../../hooks/useAnnouncementsApi";

export default function ManageAnnouncements() {
  const {announcements,addAnnouncement,removeAnnouncement,} = useAnnouncementsApi();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { subjects } = useSubjectsApi();

  const [subjectId,setSubjectId,] = useState("");


  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    addAnnouncement(
      title,
      description,
      Number(subjectId)
    );

    setTitle("");
    setDescription("");
    setSubjectId("");
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Manage Announcements
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8 space-y-4"
      >
        <select
          value={subjectId}
          onChange={(e) =>
            setSubjectId(
              e.target.value
            )
          }
          className="w-full border p-3 rounded"
        >

          <option value="">
            Select Subject
          </option>

          {subjects.map(
            (subject) => (
              <option
                key={subject.id}
                value={subject.id}
              >
                {subject.name}
              </option>
            )
          )}

        </select>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded"
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-3 rounded"
          rows={4}
        />

        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-3 rounded"
        >
          Publish
        </button>
      </form>

      {announcements.map((item) => (
        <div
          key={item.id}
          className="bg-white p-4 rounded-xl shadow mb-4"
        >
          <h3 className="font-bold">
            {item.title}
          </h3>

          <p>{item.description}</p>

          <button
            onClick={() =>
              removeAnnouncement(
                item.id
              )
            }
            className="mt-3 bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </AdminLayout>
  );
}