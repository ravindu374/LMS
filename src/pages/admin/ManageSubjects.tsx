import { useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import DataState from "../../components/ui/DataState";

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
  focus:ring-blue-500
  transition
`;

export default function ManageSubjects() {
  const {
    subjects,
    loading,
    error,
    refresh,
    addSubject,
    editSubject,
    removeSubject,
  } = useSubjectsApi();

  const toast = useToast();
  const confirm = useConfirm();

  const [name, setName] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setLecturer("");
    setFormError(null);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (submitting) return;

    if (!name.trim() || !lecturer.trim()) {
      setFormError("Enter both a subject name and a lecturer.");
      return;
    }

    setFormError(null);
    setSubmitting(true);

    try {
      if (editingId) {
        await editSubject(editingId, name.trim(), lecturer.trim());
        toast.success("Subject updated.");
      } else {
        await addSubject(name.trim(), lecturer.trim());
        toast.success(`${name.trim()} was added.`);
      }

      resetForm();
    } catch (err: unknown) {
      toast.error(
        getErrorMessage(
          err,
          editingId ? "Could not update the subject." : "Could not add the subject."
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, subjectName: string) => {
    const confirmed = await confirm({
      title: "Delete subject?",
      message: `This removes "${subjectName}" along with its classes, quizzes and announcements. This cannot be undone.`,
      confirmLabel: "Delete",
    });

    if (!confirmed) return;

    setDeletingId(id);

    try {
      await removeSubject(id);
      toast.success(`${subjectName} was deleted.`);

      if (editingId === id) resetForm();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Could not delete the subject."));
    } finally {
      setDeletingId(null);
    }
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
          noValidate
          className="space-y-4"
        >
          <div>
            <label htmlFor="subject-name" className="sr-only">
              Subject name
            </label>

            <input
              id="subject-name"
              type="text"
              placeholder="Subject Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="subject-lecturer" className="sr-only">
              Lecturer name
            </label>

            <input
              id="subject-lecturer"
              type="text"
              placeholder="Lecturer Name"
              value={lecturer}
              onChange={(e) =>
                setLecturer(e.target.value)
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

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                disabled:opacity-60
                disabled:cursor-not-allowed
                text-white
                px-6
                py-3
                font-medium
                transition
              "
            >
              {submitting
                ? "Saving…"
                : editingId
                ? "Update Subject"
                : "Add Subject"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
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
          </div>
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
        <div className="px-8 pt-8 pb-2">

              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Subject List
              </h2>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                All subjects currently available on the platform.
              </p>

            </div>

        <div className="px-4 pb-4">
          <DataState
            loading={loading}
            error={error}
            isEmpty={subjects.length === 0}
            emptyMessage="No subjects yet — add one above."
            onRetry={refresh}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full mt-2">
                <thead
                  className="
                    bg-slate-100
                    dark:bg-slate-900
                  "
                >
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">
                      Subject
                    </th>

                    <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">
                      Lecturer
                    </th>

                    <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">
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
                      <td className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {subject.name}
                      </td>

                      <td className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {subject.lecturer}
                      </td>

                      <td className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 space-x-2 whitespace-nowrap">

                        <button
                          onClick={() => {
                            setEditingId(subject.id);
                            setName(subject.name);
                            setLecturer(subject.lecturer);
                            setFormError(null);
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
                          onClick={() => handleDelete(subject.id, subject.name)}
                          disabled={deletingId === subject.id}
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
                          {deletingId === subject.id ? "Deleting…" : "Delete"}
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
