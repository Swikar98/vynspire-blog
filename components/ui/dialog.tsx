"use client";

import {
  cloneElement,
  createContext,
  isValidElement,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a <Dialog />.");
  }
  return context;
};

type DialogProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const Dialog = ({ children, open, onOpenChange }: DialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === "boolean";
  const dialogOpen = isControlled ? open : internalOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  const value = useMemo(
    () => ({
      open: dialogOpen,
      setOpen,
    }),
    [dialogOpen, setOpen],
  );

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};

const DialogPortal = ({ children }: { children: ReactNode }) => {
  if (typeof document === "undefined") {
    return null;
  }
  return createPortal(children, document.body);
};

type DialogTriggerProps = {
  children: ReactElement<any, any>;
  asChild?: boolean;
};

export const DialogTrigger = ({ children, asChild = false }: DialogTriggerProps) => {
  const { setOpen } = useDialogContext();

  if (!isValidElement(children)) {
    throw new Error("<DialogTrigger /> expects a single valid React element.");
  }

  const child = children as ReactElement<Record<string, unknown>>;

  if (asChild) {
    return cloneElement(child, {
      onClick: (event: MouseEvent<HTMLElement>) => {
        const existingOnClick = (child.props as { onClick?: unknown }).onClick;
        if (typeof existingOnClick === "function") {
          existingOnClick(event);
        }
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      },
    });
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
    >
      {child}
    </button>
  );
};

export const DialogContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { open, setOpen } = useDialogContext();

  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  if (!open) {
    return null;
  }

  return (
    <DialogPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          role="dialog"
          aria-modal
          className={cn(
            "relative z-10 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/5",
            className,
          )}
          onClick={(event) => event.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </div>
    </DialogPortal>
  );
};

export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-2 text-left", className)} {...props} />
);

export const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col gap-2 pt-4 text-right sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);

export const DialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-xl font-semibold text-slate-900", className)} {...props} />
);

export const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-slate-500", className)} {...props} />
);

export const DialogClose = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { setOpen } = useDialogContext();
  return (
    <button
      type="button"
      className={cn(
        "rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-200",
        className,
      )}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
      {...props}
    >
      {children ?? "Close"}
    </button>
  );
};
