import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-6">
        Oops! Page not found.
      </p>
      <Link
        to="/"
        className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90"
      >
        Go back home
      </Link>
    </div>
  );
}
