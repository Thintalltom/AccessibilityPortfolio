import React, { useId } from "react";
import type { ReactNode } from "react";
import { XIcon } from "lucide-react";
import { useModalDialog } from "../../hooks/useModalDialog";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
};

export function Dialog({ open, onClose, title, description, children, footer }: DialogProps) {
  const ref = useModalDialog(open);
  const titleId = useId();
  const descId = useId();

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="w-[min(92vw,480px)] rounded-2xl border border-line-strong bg-surface p-0 text-fg backdrop:bg-black/60">
      
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-semibold">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-fg-muted hover:bg-surface-hover hover:text-fg">
            
            <XIcon aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        {description &&
        <p id={descId} className="mt-2 text-[15px] text-fg-secondary">
            {description}
          </p>
        }
        {children && <div className="mt-4">{children}</div>}
        {footer && <div className="mt-6 flex flex-wrap justify-end gap-2">{footer}</div>}
      </div>
    </dialog>);

}