import {
  Navigate,
} from "react-router-dom";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user =
    localStorage.getItem(
      "user"
    );

  if (!user) {
    return (
      <Navigate
        to="/login"
      />
    );
  }

  const parsed =
    JSON.parse(user);

  if (
    parsed.role !== "admin"
  ) {
    return (
      <Navigate
        to="/dashboard"
      />
    );
  }

  return <>{children}</>;
}