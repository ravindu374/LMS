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
      <h1 className="text-3xl font-bold mb-6">
        Manage Quizzes
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
            placeholder="Quiz Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) =>
              setDeadline(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="url"
            placeholder="Google Form Link"
            value={formLink}
            onChange={(e) =>
              setFormLink(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded"
          >
            Add Quiz
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full">
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td className="p-2">
                  {quiz.title}
                </td>

                <td className="p-2">
                  {quiz.deadline}
                </td>

                <td className="p-2">
                  <button
                    onClick={() =>
                      removeQuiz(quiz.id)
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