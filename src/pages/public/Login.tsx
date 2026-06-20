import { useState } from "react";

import { useNavigate } from "react-router-dom";

//import { useAuth } from "../../hooks/useAuth";

import {loginUser,} from "../../services/authApi";

import {useAuth,} from "../../context/AuthContext";


export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const result =
        await loginUser(
          email,
          password
        );

      login(
        result.token,
        {
          id: result.id,
          name: result.name,
          role: result.role,
        }
      );

      if (
        result.role === "admin"
      ) {
        navigate(
          "/admin/dashboard"
        );
      } else {
        navigate("/dashboard");
      }
    } catch {
      setError(
        "Invalid credentials"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
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
          className="w-full border p-3 rounded mb-4"
        />

        {error && (
          <p className="text-red-600 mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Login
        </button>

        <div className="mt-6 text-sm">
          <p>
            Admin:
            admin@lms.com /
            admin123
          </p>

          <p>
            Student:
            ravindu@gmail.com /
            ravindu123
          </p>
        </div>
      </form>
    </div>
  );
}