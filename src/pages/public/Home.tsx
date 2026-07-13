import { Link } from "react-router-dom";

import PublicLayout from "../../layouts/PublicLayout";
import PublicNavbar from "../../components/navigation/PublicNavbar";

export default function Home() {
  return (
    <PublicLayout>

      <PublicNavbar />

      {/* Hero */}

      <section
        className="
          bg-slate-100
          dark:bg-slate-950
          transition-colors
        "
      >

        <div className="max-w-7xl mx-auto px-8 py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <span
                className="
                  inline-flex
                  px-4
                  py-2
                  rounded-full
                  bg-blue-100
                  dark:bg-blue-900/30
                  text-blue-700
                  dark:text-blue-300
                  text-sm
                  font-medium
                "
              >
                Learning Management System
              </span>

              <h1
                className="
                  mt-8
                  text-6xl
                  font-bold
                  leading-tight
                  text-slate-800
                  dark:text-white
                "
              >
                Learn Smarter,
                <br />
                Study Better.
              </h1>

              <p
                className="
                  mt-8
                  text-lg
                  leading-8
                  text-slate-600
                  dark:text-slate-400
                  max-w-xl
                "
              >
                Access your classes, quizzes,
                announcements and learning materials
                from one modern platform built for
                students and lecturers.
              </p>

              <div className="flex gap-4 mt-10">

                <Link
                  to="/login"
                  className="
                    px-8
                    py-4
                    rounded-2xl
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    font-semibold
                    transition
                  "
                >
                  Get Started
                </Link>

              </div>

            </div>

            <div>

              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                alt="Learning"
                className="
                  rounded-3xl
                  shadow-2xl
                  border
                  border-slate-200
                  dark:border-slate-700
                "
              />

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section
        className="
          bg-white
          dark:bg-slate-900
          py-24
          transition-colors
        "
      >

        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center mb-16">

            <h2
              className="
                text-4xl
                font-bold
                text-slate-800
                dark:text-white
              "
            >
              Everything You Need
            </h2>

            <p
              className="
                mt-4
                text-slate-500
                dark:text-slate-400
              "
            >
              A complete learning experience in one place.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div
              className="
                rounded-3xl
                bg-slate-50
                dark:bg-slate-800
                border
                border-slate-200
                dark:border-slate-700
                p-8
                hover:shadow-xl
                hover:-translate-y-1
                transition
              "
            >

              <div className="text-5xl mb-5">
                🎥
              </div>

              <h3
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                  dark:text-white
                "
              >
                Live Classes
              </h3>

              <p
                className="
                  mt-4
                  leading-7
                  text-slate-600
                  dark:text-slate-400
                "
              >
                Join online lectures instantly with
                one click using integrated meeting links.
              </p>

            </div>

            <div
              className="
                rounded-3xl
                bg-slate-50
                dark:bg-slate-800
                border
                border-slate-200
                dark:border-slate-700
                p-8
                hover:shadow-xl
                hover:-translate-y-1
                transition
              "
            >

              <div className="text-5xl mb-5">
                📝
              </div>

              <h3
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                  dark:text-white
                "
              >
                Online Quizzes
              </h3>

              <p
                className="
                  mt-4
                  leading-7
                  text-slate-600
                  dark:text-slate-400
                "
              >
                Complete assessments before deadlines
                and improve your knowledge continuously.
              </p>

            </div>

            <div
              className="
                rounded-3xl
                bg-slate-50
                dark:bg-slate-800
                border
                border-slate-200
                dark:border-slate-700
                p-8
                hover:shadow-xl
                hover:-translate-y-1
                transition
              "
            >

              <div className="text-5xl mb-5">
                📢
              </div>

              <h3
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                  dark:text-white
                "
              >
                Announcements
              </h3>

              <p
                className="
                  mt-4
                  leading-7
                  text-slate-600
                  dark:text-slate-400
                "
              >
                Stay informed with important updates,
                schedules and course notifications.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section
        className="
          bg-slate-100
          dark:bg-slate-950
          py-24
        "
      >

        <div className="max-w-5xl mx-auto text-center px-8">

          <h2
            className="
              text-4xl
              font-bold
              text-slate-800
              dark:text-white
            "
          >
            Ready to Start Learning?
          </h2>

          <p
            className="
              mt-5
              text-lg
              text-slate-600
              dark:text-slate-400
            "
          >
            Sign in to access your classes, quizzes,
            announcements and learning resources.
          </p>

          <Link
            to="/login"
            className="
              inline-block
              mt-10
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-10
              py-4
              rounded-2xl
              font-semibold
              transition
            "
          >
            Login to Continue
          </Link>

        </div>

      </section>

    </PublicLayout>
  );
}