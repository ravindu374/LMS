import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const DURATION_MS: Record<ToastType, number> = {
  success: 4000,
  info: 4000,
  // Errors often need re-reading (e.g. a server message) - give them longer.
  error: 7000,
};

const STYLES: Record<
  ToastType,
  { icon: typeof CheckCircle2; classes: string; iconClass: string }
> = {
  success: {
    icon: CheckCircle2,
    classes:
      "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200",
    iconClass: "text-emerald-500",
  },
  error: {
    icon: AlertTriangle,
    classes:
      "bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200",
    iconClass: "text-red-500",
  },
  info: {
    icon: Info,
    classes:
      "bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200",
    iconClass: "text-blue-500",
  },
};

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type: ToastType, message: string) => {
      const id = nextId.current++;

      setToasts((current) => [...current, { id, type, message }]);

      setTimeout(() => dismiss(id), DURATION_MS[type]);
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({
      success: (message: string) => push("success", message),
      error: (message: string) => push("error", message),
      info: (message: string) => push("info", message),
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/*
        A single polite live region announces new toasts to screen readers
        without interrupting whatever the user was already doing.
      */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="
          fixed
          bottom-4
          right-4
          z-[100]
          flex
          flex-col
          gap-3
          w-[calc(100%-2rem)]
          max-w-sm
        "
      >
        {toasts.map((toast) => {
          const style = STYLES[toast.type];
          const Icon = style.icon;

          return (
            <div
              key={toast.id}
              role={toast.type === "error" ? "alert" : "status"}
              className={`
                flex
                items-start
                gap-3
                rounded-2xl
                border
                shadow-lg
                p-4
                animate-[toast-in_0.2s_ease-out]
                ${style.classes}
              `}
            >
              <Icon
                size={20}
                className={`shrink-0 mt-0.5 ${style.iconClass}`}
              />

              <p className="flex-1 text-sm font-medium leading-5">
                {toast.message}
              </p>

              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
                className="
                  shrink-0
                  rounded-lg
                  p-1
                  opacity-70
                  hover:opacity-100
                  transition
                "
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
