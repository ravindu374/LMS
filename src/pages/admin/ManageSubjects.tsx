import { useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { useSubjectsApi } from "../../hooks/useSubjectsApi";

export default function ManageSubjects() {
  const {subjects,addSubject,editSubject,removeSubject,} = useSubjectsApi();

  const [name, setName] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name || !lecturer) return;

    if (editingId) {
      editSubject(
        editingId,
        name,
        lecturer
      );

      setEditingId(null);
    } else {
      addSubject(
        name,
        lecturer
      );
    }

    setName("");
    setLecturer("");
  };

  return (
    <AdminLayout>
      <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          Manage Subjects
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Create, update and organize subjects available on the learning platform.
        </p>

      </div>

      <div
          className="
            rounded-3xl
            border
            border-slate-200
            dark:border-slate-700
            bg-white
            dark:bg-slate-800
            shadow-sm
            p-8
            mb-10
          "
        >
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Subject Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
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
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
          />

          <input
            type="text"
            placeholder="Lecturer Name"
            value={lecturer}
            onChange={(e) =>
              setLecturer(e.target.value)
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
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
          />

          <button
            type="submit"
            className="
                    rounded-xl
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-6
                    py-3
                    font-medium
                    transition
                  ">
            {editingId ? "Update Subject" : "Add Subject"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setName("");
                setLecturer("");
              }}
              className="
                    ml-3
                    rounded-xl
                    bg-slate-500
                    hover:bg-slate-600
                    text-white
                    px-8
                    py-3
                    font-medium
                    transition
                  "
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div
          className="
            rounded-3xl
            border
            border-slate-200
            dark:border-slate-700
            bg-white
            dark:bg-slate-800
            shadow-sm
            overflow-hidden
          "
        >
        <div className="px-8 pt-8">

              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Subject List
              </h2>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                All subjects currently available on the platform.
              </p>

            </div>

        <table className="min-w-full mt-6">
          <thead
            className="
              bg-slate-100
              dark:bg-slate-900
            "
          >
            <tr>
              <th className="
  px-6
  py-4
  text-left
  font-semibold
  text-slate-700
  dark:text-slate-300
">
                Subject
              </th>

              <th className="
  px-6
  py-4
  text-left
  font-semibold
  text-slate-700
  dark:text-slate-300
">
                Lecturer
              </th>

              <th className="
  px-6
  py-4
  text-left
  font-semibold
  text-slate-700
  dark:text-slate-300
">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject) => (
              <tr
                    key={subject.id}
                    className="
                      hover:bg-slate-50
                      dark:hover:bg-slate-700/40
                      transition-colors
                    "
                  >
                <td className="
                        px-6
                        py-4
                        border-t
                        border-slate-200
                        dark:border-slate-700
                        text-slate-700
                        dark:text-slate-300
                      ">
                  {subject.name}
                </td>

                <td className="
                      px-6
                      py-4
                      border-t
                      border-slate-200
                      dark:border-slate-700
                      text-slate-700
                      dark:text-slate-300
                    ">
                  {subject.lecturer}
                </td>

                <td className="p-2 space-x-2">

                  <button
                    onClick={() => {
                      setEditingId(subject.id);

                      setName(subject.name);

                      setLecturer(subject.lecturer);
                    }}
                    className="
                      rounded-xl
                      bg-amber-500
                      hover:bg-amber-600
                      text-white
                      px-5
                      py-2
                      transition
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      removeSubject(subject.id)
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
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}