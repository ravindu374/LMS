import { useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  useUsersApi,
} from "../../hooks/useUsersApi";

export default function ManageUsers() {

  const {
    users,
    addUser,
    removeUser,
  } = useUsersApi();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [search, setSearch] =
    useState("");

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      await addUser(
        name,
        email,
        password,
        "student"
      );

      setName("");
      setEmail("");
      setPassword("");

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
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
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
              focus:ring-blue-500
            "
          />

          <input
            type="email"
            placeholder="Student Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
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
              focus:ring-blue-500
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
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
              focus:ring-blue-500
            "
          />

          <button
            type="submit"
            className="
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              py-3
              font-medium
              transition
            "
          >
            Create Student
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

          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              mt-6
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
            "
          />

        </div>

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
                      removeUser(user.id)
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