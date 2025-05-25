import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    message: "",
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-destructive mb-2">
            App Crashed
          </h1>
          <p className="text-muted-foreground mb-2">{this.state.message}</p>
          <Link
            to="/"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90"
          >
            Go back home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
