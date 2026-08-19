import { Component, type ErrorInfo, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Without this, any render error (a bad API response shape, a null
 * dereference in a card component, a third-party lib throwing) turned the
 * entire app into a blank white screen with no way back except a manual
 * URL edit. Class component because error boundaries have no hook
 * equivalent in React yet.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled render error:", error, info.componentStack);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-slate-100
          dark:bg-slate-950
          px-6
        "
      >
        <div
          className="
            w-full
            max-w-md
            text-center
            rounded-3xl
            border
            border-slate-200
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
            shadow-2xl
            p-10
          "
        >
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Something went wrong
          </h1>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            An unexpected error occurred. Reloading the page usually fixes
            this.
          </p>

          <button
            onClick={this.handleReload}
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              font-medium
              transition
            "
          >
            <RefreshCw size={18} />
            Reload the app
          </button>
        </div>
      </div>
    );
  }
}
