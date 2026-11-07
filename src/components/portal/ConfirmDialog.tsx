import React, { useId } from "react";
import type { ReactNode } from "react";
import { XIcon } from "lucide-react";
import type { DemoVariant } from "../../types/portal";
import { useModalDialog } from "../../hooks/useModalDialog";

type ConfirmDialogProps = {
  variant: DemoVariant;
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const secondaryBtn =
"min-h-[40px] rounded-md border border-portal-muted bg-white px-4 text-sm font-semibold text-portal-ink hover:bg-portal-subtle";
const primaryBtn = "min-h-[40px] rounded-md bg-portal-brand px-4 text-sm font-semibold text-white hover:bg-portal-brand-hover";

export function ConfirmDialog({ variant, open, title, children, confirmLabel, cancelLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  const dialogRef = useModalDialog(variant === "fixed" && open);
  const titleId = useId();
  const descriptionId = useId();

  if (variant === "flawed") {
    // Intentional defects ALD-007 / ALD-008: no role, focus not moved, no Escape, unnamed close icon.
    if (!open) return null;
    return (
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-sm rounded-xl bg-white p-6 text-portal-ink shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div className="text-lg font-semibold">{title}</div>
            <div onClick={onCancel} className="cursor-pointer p-1 text-portal-muted">
              <XIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-[15px] text-portal-muted">{children}</div>
          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <button type="button" onClick={onCancel} className={secondaryBtn}>
              {cancelLabel}
            </button>
            <button type="button" onClick={onConfirm} className={primaryBtn}>
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>);

  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      className="portal-fixed w-[min(92vw,440px)] rounded-xl border border-portal-line bg-white p-0 text-portal-ink shadow-xl backdrop:bg-black/50">
      
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onCancel}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-portal-muted hover:bg-portal-subtle">
            
            <XIcon aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <div id={descriptionId} className="mt-2 text-[15px] text-portal-muted">
          {children}
        </div>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button type="button" data-autofocus onClick={onCancel} className={secondaryBtn}>
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className={primaryBtn}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>);

}