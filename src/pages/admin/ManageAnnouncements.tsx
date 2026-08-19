import { useState } from "react";
import { useSubjectsApi } from "../../hooks/useSubjectsApi";
import AdminLayout from "../../layouts/AdminLayout";
import DataState from "../../components/ui/DataState";
import { useAnnouncementsApi } from "../../hooks/useAnnouncementsApi";
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
  focus:ring-orange-500
  transition
`;

export default function ManageAnnouncements() {
  const {
    announcements,
    loading,
    error,
    refresh,
    addAnnouncement,
    removeAnnouncement,
  } = useAnnouncementsApi();

  const { subjects } = useSubjectsApi();
  const toast = useToast();
  const confirm = useConfirm();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId,setSubjectId,] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (submitting) return;

    if (!subjectId || !title.trim() || !description.trim()) {
      setFormError("Select a subject and fill in the title and description.");
      return;
    }

    setFormError(null);
    setSubmitting(true);

    try {
      await addAnnouncement(
        title.trim(),
        description.trim(),
        Number(subjectId)
      );

      toast.success("Announcement published.");

      setTitle("");
      setDescription("");
      setSubjectId("");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Could not publish the announcement."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, announcementTitle: string) => {
    const confirmed = await confirm({
      title: "Delete announcement?",
      message: `This removes "${announcementTitle}" for every student. This cannot be undone.`,
      confirmLabel: "Delete",
    });

    if (!confirmed) return;

    setDeletingId(id);

    try {
      await removeAnnouncement(id);
      toast.success("Announcement deleted.");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Could not delete the announcement."));
    } finally {
      setDeletingId(null);
    }
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
        noValidate
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

          <label htmlFor="announcement-subject" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">
            Subject
          </label>

          <select
            id="announcement-subject"
            value={subjectId}
            onChange={(e) =>
              setSubjectId(e.target.value)
            }
            required
            className={inputClasses}
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

          <label htmlFor="announcement-title" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">
            Title
          </label>

          <input
            id="announcement-title"
            type="text"
            placeholder="Announcement title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
            className={inputClasses}
          />

        </div>

        <div>

          <label htmlFor="announcement-description" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">
            Description
          </label>

          <textarea
            id="announcement-description"
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Write your announcement..."
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
            bg-orange-600
            hover:bg-orange-700
            disabled:opacity-60
            disabled:cursor-not-allowed
            text-white
            px-8
            py-3
            transition
          "
        >
          {submitting ? "Publishing…" : "Publish Announcement"}
        </button>

      </form>

      <DataState
        loading={loading}
        error={error}
        isEmpty={announcements.length === 0}
        emptyMessage="No announcements yet — publish one above."
        onRetry={refresh}
        skeletonCount={2}
      >
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
                    onClick={() => handleDelete(item.id, item.title)}
                    disabled={deletingId === item.id}
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
                    {deletingId === item.id ? "Deleting…" : "Delete"}
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      </DataState>
    </AdminLayout>
  );
}
