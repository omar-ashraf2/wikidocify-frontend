import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6">
      <h1 className="text-4xl font-bold text-destructive mb-2">
        Something went wrong
      </h1>
      <p className="text-muted-foreground mb-4">
        {error.message || "An unexpected error occurred."}
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
