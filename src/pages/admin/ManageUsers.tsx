import { useState } from "react";

import AdminLayout
from "../../layouts/AdminLayout";

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

      <h1 className="text-3xl font-bold mb-6">
        Manage Users
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Create Student
          </button>

        </form>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <input
          type="text"
          placeholder="Search User..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <table className="w-full">

          <thead>

            <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                          </tr>

                        </thead>

                        <tbody>

                          {filteredUsers.map(
                            (user) => (
                              <tr key={user.id}>

                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td className="space-x-2">

                  <button
                    onClick={() =>
                      removeUser(
                        user.id
                      )
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}