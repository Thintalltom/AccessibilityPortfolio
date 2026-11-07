import React from "react";
import { AlertCircleIcon } from "lucide-react";

export function FieldError({ id, message }: {id: string;message: string;}) {
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
      <AlertCircleIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      <span>
        <span className="sr-only">Error: </span>
        {message}
      </span>
    </p>);

}