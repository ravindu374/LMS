import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";

import Dashboard from "../pages/student/Dashboard";
import Subjects from "../pages/student/Subjects";
import Classes from "../pages/student/Classes";
import Quizzes from "../pages/student/Quizzes";
import Announcements from "../pages/student/Announcements";

import AdminDashboard from "../pages/admin/AdminDashboard";

import ManageSubjects from "../pages/admin/ManageSubjects";
import ManageClasses from "../pages/admin/ManageClasses";
import ManageQuizzes from "../pages/admin/ManageQuizzes";
import ManageAnnouncements from "../pages/admin/ManageAnnouncements";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/admin/ManageUsers";
import MySubjects from "../pages/student/MySubjects";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
      <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
      <Route path="/quizzes" element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
      <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />

      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/subjects" element={<AdminRoute><ManageSubjects /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>}/>
      <Route path="/admin/classes" element={<AdminRoute><ManageClasses /></AdminRoute>} />

      <Route path="/admin/quizzes" element={<AdminRoute><ManageQuizzes /></AdminRoute>} />

      <Route path="/admin/announcements" element={<AdminRoute><ManageAnnouncements /></AdminRoute>} />
      <Route path="/my-subjects" element={<ProtectedRoute><MySubjects /></ProtectedRoute>}/>
    </Routes>
  );
}