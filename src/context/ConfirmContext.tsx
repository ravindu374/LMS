import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { AlertTriangle } from "lucide-react";

interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Styles the confirm button red and shows a warning icon. Default true. */
  danger?: boolean;
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

interface PendingConfirm extends ConfirmOptions {
  resolve: (value: boolean) => void;
}

/**
 * Every destructive action in the admin area used to fire immediately on
 * click - one misclick deleted a user/subject/class with no way back. This
 * swaps that for `if (await confirm({...})) { ...delete... }`, styled to
 * match the app instead of the browser's unstylable window.confirm().
 */
export function ConfirmProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pending, setPending] = useState<PendingConfirm | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const confirm = useCallback<ConfirmFn>((options) => {
    return new Promise<boolean>((resolve) => {
      setPending({ ...options, resolve });
    });
  }, []);

  const close = useCallback(
    (result: boolean) => {
      pending?.resolve(result);
      setPending(null);
    },
    [pending]
  );

  // Default focus goes to Cancel, not Confirm - a keyboard user pressing
  // Enter out of habit shouldn't accidentally confirm a delete.
  useEffect(() => {
    if (pending) {
      cancelRef.current?.focus();
    }
  }, [pending]);

  useEffect(() => {
    if (!pending) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [pending, close]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      {pending && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            bg-black/50
            px-4
          "
          onClick={() => close(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-message"
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-sm
              rounded-3xl
              bg-white
              dark:bg-slate-800
              shadow-2xl
              p-7
            "
          >
            <div className="flex items-start gap-4">
              {pending.danger !== false && (
                <div
                  className="
                    shrink-0
                    w-11
                    h-11
                    rounded-full
                    bg-red-100
                    dark:bg-red-900/40
                    flex
                    items-center
                    justify-center
                  "
                >
                  <AlertTriangle
                    size={22}
                    className="text-red-600 dark:text-red-400"
                  />
                </div>
              )}

              <div>
                <h2
                  id="confirm-dialog-title"
                  className="text-lg font-bold text-slate-800 dark:text-white"
                >
                  {pending.title}
                </h2>

                <p
                  id="confirm-dialog-message"
                  className="mt-2 text-sm text-slate-600 dark:text-slate-300"
                >
                  {pending.message}
                </p>
              </div>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                ref={cancelRef}
                type="button"
                onClick={() => close(false)}
                className="
                  rounded-xl
                  px-5
                  py-2.5
                  font-medium
                  text-slate-700
                  dark:text-slate-200
                  bg-slate-100
                  dark:bg-slate-700
                  hover:bg-slate-200
                  dark:hover:bg-slate-600
                  transition
                "
              >
                {pending.cancelLabel ?? "Cancel"}
              </button>

              <button
                type="button"
                onClick={() => close(true)}
                className={`
                  rounded-xl
                  px-5
                  py-2.5
                  font-medium
                  text-white
                  transition
                  ${
                    pending.danger !== false
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                `}
              >
                {pending.confirmLabel ?? "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error("useConfirm must be used inside ConfirmProvider");
  }

  return context;
}
