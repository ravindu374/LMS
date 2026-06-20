import { useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import { useClassesApi } from "../../hooks/useClassesApi";
import { useSubjectsApi, } from "../../hooks/useSubjectsApi";
export default function ManageClasses() {
  const { subjects } = useSubjectsApi();

  const [ subjectId,setSubjectId,] = useState("");
  const { classes, addClass, removeClass } = useClassesApi();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [zoomLink, setZoomLink] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!subjectId) {
      alert(
        "Please select a subject"
      );
      return;
    }

    addClass(
      title,
      date,
      time,
      zoomLink,
      Number(subjectId)
    );

    setTitle("");
    setDate("");
    setTime("");
    setZoomLink("");
    setSubjectId("");
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Manage Classes
      </h1>
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
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
            placeholder="Class Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="url"
            placeholder="Zoom Link"
            value={zoomLink}
            onChange={(e) =>
              setZoomLink(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Add Class
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">
                Title
              </th>
              <th className="text-left p-2">
                Date
              </th>
              <th className="text-left p-2">
                Time
              </th>
              <th className="text-left p-2">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {classes.map((item) => (
              <tr key={item.id}>
                <td className="p-2">
                  {item.title}
                </td>

                <td className="p-2">
                  {item.class_date}
                </td>

                <td className="p-2">
                  {item.class_time}
                </td>

                <td className="p-2">
                  <button
                    onClick={() =>
                      removeClass(item.id)
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