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
      <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          Manage Classes
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Schedule and manage live classes for each subject.
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
          <select
          value={subjectId}
          onChange={(e) =>
            setSubjectId(
              e.target.value
            )
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
          focus:ring-green-500
        "
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
            focus:ring-green-500
          "
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
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
            focus:ring-green-500
          "
          />

          <input
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
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
            focus:ring-green-500
          "
          />

          <input
            type="url"
            placeholder="Zoom Link"
            value={zoomLink}
            onChange={(e) =>
              setZoomLink(e.target.value)
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
            focus:ring-green-500
          "
          />

          <button
            type="submit"
            className="
            rounded-xl
            bg-green-600
            hover:bg-green-700
            text-white
            px-8
            py-3
            font-medium
            transition
          "
          >
            Add Class
          </button>
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
        <table className="min-w-full">
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
                Title
              </th>
              <th className="
                    px-6
                    py-4
                    text-left
                    font-semibold
                    text-slate-700
                    dark:text-slate-300
                  ">
                Date
              </th>
              <th className="
                  px-6
                  py-4
                  text-left
                  font-semibold
                  text-slate-700
                  dark:text-slate-300
                ">
                Time
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
            {classes.map((item) => (
              <tr key={item.id}>
                <td className="
                    px-6
                    py-4
                    border-t
                    border-slate-200
                    dark:border-slate-700
                    text-slate-700
                    dark:text-slate-300
                  ">
                  {item.title}
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
                  {item.class_date}
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
                  {item.class_time}
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
                  <button
                    onClick={() =>
                      removeClass(item.id)
                    }
                    className="
                    rounded-lg
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-4
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