import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/60 backdrop-blur">
        <nav className="container flex h-14 items-center gap-6">
          <h1 className="text-lg font-semibold">My App</h1>
          <NavLink to="/" end className="text-sm opacity-75 hover:opacity-100">
            Home
          </NavLink>
          <NavLink
            to="/protected"
            className="text-sm opacity-75 hover:opacity-100"
          >
            Protected
          </NavLink>
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
