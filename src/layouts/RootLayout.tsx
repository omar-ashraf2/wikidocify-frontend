import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/60 backdrop-blur">
        <nav className="container mx-auto flex h-14 items-center justify-between">
          <h1 className="text-lg font-semibold">WikiDocify</h1>
          <NavLink
            to="/login"
            end
            className="text-sm bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md px-4 py-2"
          >
            Login
          </NavLink>
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
