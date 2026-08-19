import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import RouteFallback from "../components/ui/RouteFallback";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// Public entry points stay in the main chunk: they are what a cold visitor
// lands on, so a second network round trip here would delay first paint.
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";

const Register = lazy(() => import("../pages/public/register"));
const NotFound = lazy(() => import("../pages/public/NotFound"));

// Student area — only downloaded after login.
const Dashboard = lazy(() => import("../pages/student/Dashboard"));
const Subjects = lazy(() => import("../pages/student/Subjects"));
const MySubjects = lazy(() => import("../pages/student/MySubjects"));
const Classes = lazy(() => import("../pages/student/Classes"));
const Quizzes = lazy(() => import("../pages/student/Quizzes"));
const Announcements = lazy(() => import("../pages/student/Announcements"));

// Admin area — only downloaded by admins.
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const ManageSubjects = lazy(() => import("../pages/admin/ManageSubjects"));
const ManageUsers = lazy(() => import("../pages/admin/ManageUsers"));
const ManageClasses = lazy(() => import("../pages/admin/ManageClasses"));
const ManageQuizzes = lazy(() => import("../pages/admin/ManageQuizzes"));
const ManageAnnouncements = lazy(() => import("../pages/admin/ManageAnnouncements"));
const ManagePayments = lazy(() => import("../pages/admin/ManagePayments"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
        <Route path="/my-subjects" element={<ProtectedRoute><MySubjects /></ProtectedRoute>} />
        <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
        <Route path="/quizzes" element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
        <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />

        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/subjects" element={<AdminRoute><ManageSubjects /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/admin/classes" element={<AdminRoute><ManageClasses /></AdminRoute>} />
        <Route path="/admin/quizzes" element={<AdminRoute><ManageQuizzes /></AdminRoute>} />
        <Route path="/admin/announcements" element={<AdminRoute><ManageAnnouncements /></AdminRoute>} />
        <Route path="/admin/payments" element={<AdminRoute><ManagePayments /></AdminRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
