import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  registerUser,
} from "../../services/authApi";

export default function Register() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {

        alert(
          "Passwords do not match"
        );

        return;
      }

      try {

        await registerUser(
          name,
          email,
          password
        );

        alert(
          "Registration successful"
        );

        navigate("/login");

      } catch (error: any) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          "Registration failed"
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
                Create Account
              </h1>

              <p
                className="
                  mt-2
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Register to begin your learning journey.
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
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
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
                  placeholder="Create a password"
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
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
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
                Create Account
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
              Already have an account?

              <a
                href="/login"
                className="
                  ml-2
                  text-blue-600
                  hover:text-blue-700
                  font-medium
                "
              >
                Login
              </a>

            </p>

          </div>

        </div>
      );
}