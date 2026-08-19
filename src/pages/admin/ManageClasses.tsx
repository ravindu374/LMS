import { useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import DataState from "../../components/ui/DataState";
import { useClassesApi } from "../../hooks/useClassesApi";
import { useSubjectsApi, } from "../../hooks/useSubjectsApi";
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
  focus:ring-green-500
  transition
`;

export default function ManageClasses() {
  const { subjects } = useSubjectsApi();

  const [ subjectId,setSubjectId,] = useState("");
  const {
    classes,
    loading,
    error,
    refresh,
    addClass,
    removeClass,
  } = useClassesApi();

  const toast = useToast();
  const confirm = useConfirm();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [zoomLink, setZoomLink] =
    useState("");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (submitting) return;

    if (!subjectId || !title.trim() || !date || !time || !zoomLink.trim()) {
      setFormError("Fill in every field, including the subject and Zoom link.");
      return;
    }

    setFormError(null);
    setSubmitting(true);

    try {
      await addClass(
        title.trim(),
        date,
        time,
        zoomLink.trim(),
        Number(subjectId)
      );

      toast.success(`${title.trim()} was scheduled.`);

      setTitle("");
      setDate("");
      setTime("");
      setZoomLink("");
      setSubjectId("");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Could not schedule the class."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, classTitle: string) => {
    const confirmed = await confirm({
      title: "Delete class?",
      message: `This removes "${classTitle}" for every enrolled student. This cannot be undone.`,
      confirmLabel: "Delete",
    });

    if (!confirmed) return;

    setDeletingId(id);

    try {
      await removeClass(id);
      toast.success(`${classTitle} was deleted.`);
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Could not delete the class."));
    } finally {
      setDeletingId(null);
    }
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
          noValidate
          className="space-y-4"
        >
          <div>
            <label htmlFor="class-subject" className="sr-only">
              Subject
            </label>

            <select
              id="class-subject"
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
            <label htmlFor="class-title" className="sr-only">
              Class title
            </label>

            <input
              id="class-title"
              type="text"
              placeholder="Class Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
              className={inputClasses}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="class-date" className="sr-only">
                Class date
              </label>

              <input
                id="class-date"
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="class-time" className="sr-only">
                Class time
              </label>

              <input
                id="class-time"
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
                required
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label htmlFor="class-zoom-link" className="sr-only">
              Zoom link
            </label>

            <input
              id="class-zoom-link"
              type="url"
              placeholder="Zoom Link"
              value={zoomLink}
              onChange={(e) =>
                setZoomLink(e.target.value)
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
              bg-green-600
              hover:bg-green-700
              disabled:opacity-60
              disabled:cursor-not-allowed
              text-white
              px-8
              py-3
              font-medium
              transition
            "
          >
            {submitting ? "Adding…" : "Add Class"}
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
            isEmpty={classes.length === 0}
            emptyMessage="No classes scheduled yet — add one above."
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
                    <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">
                      Time
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {classes.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
                    >
                      <td className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {item.title}
                      </td>

                      <td className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {item.class_date}
                      </td>

                      <td className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {item.class_time}
                      </td>

                      <td className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          disabled={deletingId === item.id}
                          className="
                            rounded-lg
                            bg-red-600
                            hover:bg-red-700
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                            text-white
                            px-4
                            py-2
                            transition
                          "
                        >
                          {deletingId === item.id ? "Deleting…" : "Delete"}
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
