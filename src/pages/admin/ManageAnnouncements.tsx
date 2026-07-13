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
          <div className="mb-10">

      <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
        Manage Announcements
      </h1>

      <p className="mt-3 text-slate-500 dark:text-slate-400">
        Create and publish announcements for your students.
      </p>

    </div>
      <form
        onSubmit={handleSubmit}
        className="
          rounded-3xl
          border
          border-slate-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-800
          shadow-sm
          p-8
          space-y-6
          mb-10
        "
      >

        <div>

          <label className="block mb-2 font-medium text-slate-700 dark:text-slate-300">
            Subject
          </label>

          <select
            value={subjectId}
            onChange={(e) =>
              setSubjectId(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              dark:border-slate-600
              bg-white
              dark:bg-slate-900
              dark:text-white
              px-4
              py-3
            "
          >

            <option value="">
              Select Subject
            </option>

            {subjects.map((subject) => (

              <option
                key={subject.id}
                value={subject.id}
              >
                {subject.name}
              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="block mb-2 font-medium text-slate-700 dark:text-slate-300">
            Title
          </label>

          <input
            type="text"
            placeholder="Announcement title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              dark:border-slate-600
              bg-white
              dark:bg-slate-900
              dark:text-white
              px-4
              py-3
            "
          />

        </div>

        <div>

          <label className="block mb-2 font-medium text-slate-700 dark:text-slate-300">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Write your announcement..."
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              dark:border-slate-600
              bg-white
              dark:bg-slate-900
              dark:text-white
              px-4
              py-3
            "
          />

        </div>

        <button
          type="submit"
          className="
            rounded-xl
            bg-orange-600
            hover:bg-orange-700
            text-white
            px-8
            py-3
            transition
          "
        >
          Publish Announcement
        </button>

      </form>

      <div className="space-y-6">

  {announcements.map((item) => (

          <div
            key={item.id}
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
              overflow-hidden
            "
          >

            <div
              className="
                h-2
                bg-gradient-to-r
                from-orange-500
                to-red-500
              "
            />

            <div className="p-6">

              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                {item.description}
              </p>

              <div className="mt-6">

                <button
                  onClick={() =>
                    removeAnnouncement(item.id)
                  }
                  className="
                    rounded-xl
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-5
                    py-2
                    transition
                  "
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>
    </AdminLayout>
  );
}