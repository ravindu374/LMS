import { Link } from "react-router-dom";

import PublicLayout from "../../layouts/PublicLayout";
import PublicNavbar from "../../components/navigation/PublicNavbar";

export default function Home() {
  return (
    <PublicLayout>
      <PublicNavbar />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Online Learning Made Simple
            </h1>

            <p className="text-gray-600 mt-6 text-lg">
              Access Zoom classes,
              Google Form quizzes,
              and announcements from
              a single platform.
            </p>

            <div className="mt-8">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              alt="Learning"
              className="rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="font-bold text-xl mb-3">
                Live Classes
              </h3>

              <p>
                Join Zoom lectures directly
                from the platform.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="font-bold text-xl mb-3">
                Online Quizzes
              </h3>

              <p>
                Access Google Form quizzes
                quickly and easily.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="font-bold text-xl mb-3">
                Announcements
              </h3>

              <p>
                Stay informed with the
                latest updates.
              </p>
            </div>

          </div>

        </div>
      </section>
    </PublicLayout>
  );
}