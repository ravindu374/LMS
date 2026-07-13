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
          is_paid: result.is_paid,
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
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-slate-100
          dark:bg-slate-950
          px-6
          transition-colors
        "
      >

        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-slate-200
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
            shadow-2xl
            p-10
          "
        >

          <div className="text-center mb-10">

            <div
              className="
                w-20
                h-20
                rounded-2xl
                bg-blue-600
                mx-auto
                flex
                items-center
                justify-center
                text-3xl
                font-bold
                text-white
                shadow-lg
              "
            >
              LMS
            </div>

            <h1
              className="
                mt-6
                text-4xl
                font-bold
                text-slate-800
                dark:text-white
              "
            >
              Welcome Back
            </h1>

            <p
              className="
                mt-2
                text-slate-500
                dark:text-slate-400
              "
            >
              Sign in to continue learning.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
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
                  dark:bg-slate-800
                  text-slate-800
                  dark:text-white
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

            </div>

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
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
                  dark:bg-slate-800
                  text-slate-800
                  dark:text-white
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

            </div>

            {error && (

              <div
                className="
                  rounded-xl
                  bg-red-100
                  dark:bg-red-900/30
                  border
                  border-red-300
                  dark:border-red-700
                  p-3
                  text-red-700
                  dark:text-red-300
                "
              >
                {error}
              </div>

            )}

            <button
              type="submit"
              className="
                w-full
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-medium
                py-3
                transition
              "
            >
              Login
            </button>

          </form>

          <p
            className="
              mt-8
              text-center
              text-slate-600
              dark:text-slate-400
            "
          >
            Don't have an account?

            <a
              href="/register"
              className="
                ml-2
                text-blue-600
                hover:text-blue-700
                font-medium
              "
            >
              Register
            </a>

          </p>

          <div
            className="
              mt-8
              rounded-2xl
              bg-slate-100
              dark:bg-slate-800
              p-5
              text-sm
            "
          >

            <p className="font-semibold text-slate-700 dark:text-slate-200 mb-3">
              Demo Accounts
            </p>

            <div className="space-y-2">

              <div>

                <span className="font-medium">
                  Admin
                </span>

                <p className="text-slate-500 dark:text-slate-400">
                  admin@lms.com
                </p>

              </div>

              <div>

                <span className="font-medium">
                  Student
                </span>

                <p className="text-slate-500 dark:text-slate-400">
                  ravindu@gmail.com
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    );
}