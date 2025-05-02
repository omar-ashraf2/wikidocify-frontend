import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <Outlet />
    </div>
  );
}
