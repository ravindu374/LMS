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
      <h1 className="text-3xl font-bold mb-6">
        Manage Subjects
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
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
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Lecturer Name"
            value={lecturer}
            onChange={(e) =>
              setLecturer(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded">
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
              className="bg-gray-500 text-white px-6 py-3 rounded ml-3"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-bold text-xl mb-4">
          Subject List
        </h2>

        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">
                Subject
              </th>

              <th className="text-left p-2">
                Lecturer
              </th>

              <th className="text-left p-2">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td className="p-2">
                  {subject.name}
                </td>

                <td className="p-2">
                  {subject.lecturer}
                </td>

                <td className="p-2 space-x-2">

                  <button
                    onClick={() => {
                      setEditingId(subject.id);

                      setName(subject.name);

                      setLecturer(subject.lecturer);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      removeSubject(subject.id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
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