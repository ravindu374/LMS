import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  registerUser,
} from "../../services/authApi";

import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../utils/errorMessage";

const inputClasses = `
  w-full
  rounded-xl
  border
  bg-white
  dark:bg-slate-800
  text-slate-800
  dark:text-white
  px-4
  py-3
  outline-none
  focus:ring-2
  focus:ring-blue-500
  transition
`;

const labelClasses = `
  block
  mb-2
  text-sm
  font-medium
  text-slate-700
  dark:text-slate-300
`;

export default function Register() {

  const navigate =
    useNavigate();

  const toast = useToast();

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

  const [submitting, setSubmitting] =
    useState(false);

  // Field-level errors instead of a single blocking alert() - the user can
  // see exactly what to fix without a modal interrupting them mid-typing.
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const errors: typeof fieldErrors = {};

    if (name.trim().length < 2) {
      errors.name = "Enter your full name.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (submitting) return;

      if (!validate()) return;

      setSubmitting(true);

      try {

        await registerUser(
          name.trim(),
          email.trim(),
          password
        );

        toast.success(
          "Account created. You can now sign in."
        );

        navigate("/login");

      } catch (err: unknown) {

        toast.error(getErrorMessage(err, "Registration failed."));

      } finally {

        setSubmitting(false);

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
            py-12
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
              noValidate
              className="space-y-5"
            >

              <div>

                <label htmlFor="register-name" className={labelClasses}>
                  Full Name
                </label>

                <input
                  id="register-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  autoComplete="name"
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={
                    fieldErrors.name ? "register-name-error" : undefined
                  }
                  className={`
                    ${inputClasses}
                    ${
                      fieldErrors.name
                        ? "border-red-400 dark:border-red-600"
                        : "border-slate-300 dark:border-slate-600"
                    }
                  `}
                />

                {fieldErrors.name && (
                  <p
                    id="register-name-error"
                    className="mt-1.5 text-sm text-red-600 dark:text-red-400"
                  >
                    {fieldErrors.name}
                  </p>
                )}

              </div>

              <div>

                <label htmlFor="register-email" className={labelClasses}>
                  Email
                </label>

                <input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  autoComplete="email"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={
                    fieldErrors.email ? "register-email-error" : undefined
                  }
                  className={`
                    ${inputClasses}
                    ${
                      fieldErrors.email
                        ? "border-red-400 dark:border-red-600"
                        : "border-slate-300 dark:border-slate-600"
                    }
                  `}
                />

                {fieldErrors.email && (
                  <p
                    id="register-email-error"
                    className="mt-1.5 text-sm text-red-600 dark:text-red-400"
                  >
                    {fieldErrors.email}
                  </p>
                )}

              </div>

              <div>

                <label htmlFor="register-password" className={labelClasses}>
                  Password
                </label>

                <input
                  id="register-password"
                  name="new-password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  minLength={6}
                  autoComplete="new-password"
                  aria-invalid={!!fieldErrors.password}
                  aria-describedby={
                    fieldErrors.password
                      ? "register-password-error"
                      : "register-password-hint"
                  }
                  className={`
                    ${inputClasses}
                    ${
                      fieldErrors.password
                        ? "border-red-400 dark:border-red-600"
                        : "border-slate-300 dark:border-slate-600"
                    }
                  `}
                />

                {fieldErrors.password ? (
                  <p
                    id="register-password-error"
                    className="mt-1.5 text-sm text-red-600 dark:text-red-400"
                  >
                    {fieldErrors.password}
                  </p>
                ) : (
                  <p
                    id="register-password-hint"
                    className="mt-1.5 text-sm text-slate-500 dark:text-slate-400"
                  >
                    At least 6 characters.
                  </p>
                )}

              </div>

              <div>

                <label
                  htmlFor="register-confirm-password"
                  className={labelClasses}
                >
                  Confirm Password
                </label>

                <input
                  id="register-confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  autoComplete="new-password"
                  aria-invalid={!!fieldErrors.confirmPassword}
                  aria-describedby={
                    fieldErrors.confirmPassword
                      ? "register-confirm-password-error"
                      : undefined
                  }
                  className={`
                    ${inputClasses}
                    ${
                      fieldErrors.confirmPassword
                        ? "border-red-400 dark:border-red-600"
                        : "border-slate-300 dark:border-slate-600"
                    }
                  `}
                />

                {fieldErrors.confirmPassword && (
                  <p
                    id="register-confirm-password-error"
                    className="mt-1.5 text-sm text-red-600 dark:text-red-400"
                  >
                    {fieldErrors.confirmPassword}
                  </p>
                )}

              </div>

              <button
                type="submit"
                disabled={submitting}
                className="
                  w-full
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  text-white
                  font-medium
                  py-3
                  transition
                "
              >
                {submitting ? "Creating account…" : "Create Account"}
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

              <Link
                to="/login"
                className="
                  ml-2
                  text-blue-600
                  hover:text-blue-700
                  font-medium
                "
              >
                Login
              </Link>

            </p>

          </div>

        </div>
      );
}
