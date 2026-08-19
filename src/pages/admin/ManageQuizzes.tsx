import { useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import DataState from "../../components/ui/DataState";
import { useQuizzesApi } from "../../hooks/useQuizzesApi";
import { useSubjectsApi } from "../../hooks/useSubjectsApi";
import { useToast } from "../../context/ToastContext";
import { useConfirm } from "../../context/ConfirmContext";
import { getErrorMessage } from "../../utils/errorMessage";

const inputClasses = `
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
  transition
`;

export default function ManageQuizzes() {
  const {
    quizzes,
    loading,
    error,
    refresh,
    addQuiz,
    removeQuiz,
  } = useQuizzesApi();
  const { subjects } = useSubjectsApi();

  const toast = useToast();
  const confirm = useConfirm();

  const [subjectId,setSubjectId,] = useState("");

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [formLink, setFormLink] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    if (!subjectId || !title.trim() || !deadline || !formLink.trim()) {
      setFormError("Fill in every field, including the subject and form link.");
      return;
    }

    setFormError(null);
    setSubmitting(true);

    try {
      await addQuiz(
        title.trim(),
        deadline,
        formLink.trim(),
        Number(subjectId)
      );

      toast.success(`${title.trim()} was added.`);

      setTitle("");
      setDeadline("");
      setFormLink("");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Could not add the quiz."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, quizTitle: string) => {
    const confirmed = await confirm({
      title: "Delete quiz?",
      message: `This removes "${quizTitle}" for every enrolled student. This cannot be undone.`,
      confirmLabel: "Delete",
    });

    if (!confirmed) return;

    setDeletingId(id);

    try {
      await removeQuiz(id);
      toast.success(`${quizTitle} was deleted.`);
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Could not delete the quiz."));
    } finally {
      setDeletingId(null);
    }
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
          noValidate
          className="space-y-4"
        >
          <div>
            <label htmlFor="quiz-subject" className="sr-only">
              Subject
            </label>

            <select
              id="quiz-subject"
              value={subjectId}
              onChange={(e) =>
                setSubjectId(
                  e.target.value
                )
              }
              required
              className={inputClasses}
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
          </div>

          <div>
            <label htmlFor="quiz-title" className="sr-only">
              Quiz title
            </label>

            <input
              id="quiz-title"
              type="text"
              placeholder="Quiz Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="quiz-deadline" className="sr-only">
              Deadline
            </label>

            <input
              id="quiz-deadline"
              type="date"
              value={deadline}
              onChange={(e) =>
                setDeadline(e.target.value)
              }
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="quiz-form-link" className="sr-only">
              Google Form link
            </label>

            <input
              id="quiz-form-link"
              type="url"
              placeholder="Google Form Link"
              value={formLink}
              onChange={(e) =>
                setFormLink(e.target.value)
              }
              required
              className={inputClasses}
            />
          </div>

          {formError && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="
                    rounded-xl
                    bg-purple-600
                    hover:bg-purple-700
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    text-white
                    px-8
                    py-3
                    font-medium
                    transition
                  "
          >
            {submitting ? "Adding…" : "Add Quiz"}
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
        <div className="p-4">
          <DataState
            loading={loading}
            error={error}
            isEmpty={quizzes.length === 0}
            emptyMessage="No quizzes yet — add one above."
            onRetry={refresh}
          >
            <div className="overflow-x-auto">
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
                          onClick={() => handleDelete(quiz.id, quiz.title)}
                          disabled={deletingId === quiz.id}
                          className="
                              rounded-xl
                              bg-red-600
                              hover:bg-red-700
                              disabled:opacity-60
                              disabled:cursor-not-allowed
                              text-white
                              px-5
                              py-2
                              transition
                            "
                        >
                          {deletingId === quiz.id ? "Deleting…" : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DataState>
        </div>
      </div>
    </AdminLayout>
  );
}
