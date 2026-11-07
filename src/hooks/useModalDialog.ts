import { useEffect, useRef } from "react";

/**
 * Opens a native <dialog> as a modal when `open` is true and restores focus to the
 * element that had focus before it opened. showModal() supplies the dialog role,
 * an inert background and focus containment. An element marked `data-autofocus`
 * inside the dialog receives initial focus.
 */
export function useModalDialog(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (typeof dialog.showModal === "function") dialog.showModal();else
      dialog.setAttribute("open", "");
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    } else if (!open && dialog.open) {
      if (typeof dialog.close === "function") dialog.close();else
      dialog.removeAttribute("open");
      const target = returnFocusRef.current;
      returnFocusRef.current = null;
      if (target && document.contains(target)) target.focus();
    }
  }, [open]);

  return ref;
}