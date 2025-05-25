import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useAuthContext } from "@/context/AuthProvider";
import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  const { user, logout } = useAuthContext();

  const initial = (user?.name ?? user?.email ?? "?")[0]?.toUpperCase();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/60 backdrop-blur">
        <nav className="container mx-auto flex h-14 items-center justify-between">
          <h1 className="text-lg font-semibold">WikiDocify</h1>

          {user ? (
            <div className="flex items-center justify-center gap-2 group">
              <button
                className="h-9 w-9 select-none items-center justify-center rounded-full text-sm font-semibold uppercase text-white shadow bg-[#3b82f6]"
                title={user.name ?? user.email}
              >
                {initial}
              </button>

              <button
                onClick={logout}
                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow hover:bg-primary/90 font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              end
              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow hover:bg-primary/90 font-semibold"
            >
              Login
            </NavLink>
          )}
        </nav>
      </header>

      <main className="flex-grow">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}
