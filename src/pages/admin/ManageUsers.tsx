import { useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import DataState from "../../components/ui/DataState";

import {
  useUsersApi,
} from "../../hooks/useUsersApi";

import { useToast } from "../../context/ToastContext";
import { useConfirm } from "../../context/ConfirmContext";
import { getErrorMessage } from "../../utils/errorMessage";

const inputClasses = `
  w-full
  rounded-xl
  border
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

export default function ManageUsers() {

  const {
    users,
    loading,
    error,
    refresh,
    addUser,
    removeUser,
  } = useUsersApi();

  const toast = useToast();
  const confirm = useConfirm();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [formError, setFormError] =
    useState<string | null>(null);

  // Tracks which row's delete is in flight so only that button disables,
  // and a double-click can't fire two deletes for the same user.
  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (submitting) return;

      if (!name.trim() || !email.trim() || password.length < 6) {
        setFormError(
          "Enter a name, email, and a password of at least 6 characters."
        );
        return;
      }

      setFormError(null);
      setSubmitting(true);

      try {
        await addUser(
          name.trim(),
          email.trim(),
          password,
          "student"
        );

        toast.success(`${name.trim()} was added as a student.`);

        setName("");
        setEmail("");
        setPassword("");
      } catch (err: unknown) {
        toast.error(getErrorMessage(err, "Could not create the student."));
      } finally {
        setSubmitting(false);
      }
    };

  const handleDelete = async (id: number, userName: string) => {
    const confirmed = await confirm({
      title: "Delete student?",
      message: `This permanently removes ${userName} and their enrollment history. This cannot be undone.`,
      confirmLabel: "Delete",
    });

    if (!confirmed) return;

    setDeletingId(id);

    try {
      await removeUser(id);
      toast.success(`${userName} was deleted.`);
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Could not delete the student."));
    } finally {
      setDeletingId(null);
    }
  };

  const filteredUsers =
    users.filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <AdminLayout>

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          Manage Users
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Create and manage student accounts on the platform.
        </p>

      </div>

      {/* Create Student */}

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
          className="space-y-5"
        >

          <div>
            <label htmlFor="user-name" className="sr-only">
              Student name
            </label>

            <input
              id="user-name"
              name="name"
              type="text"
              placeholder="Student Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              autoComplete="off"
              className={`${inputClasses} border-slate-300 dark:border-slate-600`}
            />
          </div>

          <div>
            <label htmlFor="user-email" className="sr-only">
              Student email
            </label>

            <input
              id="user-email"
              name="email"
              type="email"
              placeholder="Student Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              autoComplete="off"
              className={`${inputClasses} border-slate-300 dark:border-slate-600`}
            />
          </div>

          <div>
            <label htmlFor="user-password" className="sr-only">
              Temporary password
            </label>

            <input
              id="user-password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              minLength={6}
              autoComplete="new-password"
              className={`${inputClasses} border-slate-300 dark:border-slate-600`}
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
              bg-blue-600
              hover:bg-blue-700
              disabled:opacity-60
              disabled:cursor-not-allowed
              text-white
              px-8
              py-3
              font-medium
              transition
            "
          >
            {submitting ? "Creating…" : "Create Student"}
          </button>

        </form>

      </div>

      {/* User List */}

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

        <div className="p-8">

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Student List
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Search and manage registered users.
          </p>

          <label htmlFor="user-search" className="sr-only">
            Search students
          </label>

          <input
            id="user-search"
            type="search"
            placeholder="Search students..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className={`${inputClasses} mt-6 border-slate-300 dark:border-slate-600`}
          />

        </div>

        <div className="px-4 pb-4">
          <DataState
            loading={loading}
            error={error}
            isEmpty={filteredUsers.length === 0}
            emptyMessage={
              search.trim()
                ? "No students match your search."
                : "No students yet — add one above."
            }
            onRetry={refresh}
            skeletonCount={3}
          >

            {/* overflow-x-auto keeps the table scrollable instead of
                blowing out the page width on narrow screens. */}
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
                      Name
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
                      Email
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
                      Role
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

                  {filteredUsers.map((user) => (

                    <tr
                      key={user.id}
                      className="
                        hover:bg-slate-50
                        dark:hover:bg-slate-700/40
                        transition-colors
                      "
                    >

                      <td
                        className="
                          px-6
                          py-4
                          border-t
                          border-slate-200
                          dark:border-slate-700
                          text-slate-700
                          dark:text-slate-300
                        "
                      >
                        {user.name}
                      </td>

                      <td
                        className="
                          px-6
                          py-4
                          border-t
                          border-slate-200
                          dark:border-slate-700
                          text-slate-700
                          dark:text-slate-300
                        "
                      >
                        {user.email}
                      </td>

                      <td
                        className="
                          px-6
                          py-4
                          border-t
                          border-slate-200
                          dark:border-slate-700
                        "
                      >

                        <span
                          className="
                            inline-flex
                            rounded-full
                            bg-blue-100
                            dark:bg-blue-900/30
                            text-blue-700
                            dark:text-blue-300
                            px-3
                            py-1
                            text-sm
                            font-medium
                          "
                        >
                          {user.role}
                        </span>

                      </td>

                      <td
                        className="
                          px-6
                          py-4
                          border-t
                          border-slate-200
                          dark:border-slate-700
                        "
                      >

                        <button
                          onClick={() =>
                            handleDelete(user.id, user.name)
                          }
                          disabled={deletingId === user.id}
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
                          {deletingId === user.id ? "Deleting…" : "Delete"}
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
