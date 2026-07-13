import { useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import { useQuizzesApi } from "../../hooks/useQuizzesApi";
import { useSubjectsApi } from "../../hooks/useSubjectsApi";
export default function ManageQuizzes() {
  const { quizzes, addQuiz, removeQuiz } = useQuizzesApi();
  const { subjects } = useSubjectsApi();

  const [subjectId,setSubjectId,] = useState("");

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [formLink, setFormLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {e.preventDefault();

    if (!subjectId) {
      alert(
        "Please select a subject"
      );
      return;
    }

    addQuiz(
      title,
      deadline,
      formLink,
      Number(subjectId)
    );

    setTitle("");
    setDeadline("");
    setFormLink("");
  };

  return (
    <AdminLayout>
      <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          Manage Quizzes
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Create quizzes and assign them to specific subjects.
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
              focus:ring-purple-500
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
            placeholder="Quiz Title"
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
              focus:ring-purple-500
            "
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) =>
              setDeadline(e.target.value)
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
              focus:ring-purple-500
            "
          />

          <input
            type="url"
            placeholder="Google Form Link"
            value={formLink}
            onChange={(e) =>
              setFormLink(e.target.value)
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
              focus:ring-purple-500
            "
          />

          <button
            type="submit"
            className="
                    rounded-xl
                    bg-purple-600
                    hover:bg-purple-700
                    text-white
                    px-8
                    py-3
                    font-medium
                    transition
                  "
          >
            Add Quiz
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

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    font-semibold
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  Quiz
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    font-semibold
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  Deadline
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    font-semibold
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  Action
                </th>

              </tr>

            </thead>

          <tbody>
            {quizzes.map((quiz) => (
              <tr
                      key={quiz.id}
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
                  {quiz.title}
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
                  {quiz.deadline}
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
                      removeQuiz(quiz.id)
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