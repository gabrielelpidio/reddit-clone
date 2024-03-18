"use client";
import * as React from "react";
import { useAutoResizeTextarea } from "~/lib/use-auto-resize-textarea";
import { cn } from "~/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const ContentTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const { textAreaRef } = useAutoResizeTextarea(ref);

    return (
      <textarea
        className={cn("focus-visible:outline-none", className)}
        rows={1}
        ref={textAreaRef}
        {...props}
      />
    );
  },
);

ContentTextarea.displayName = "ContentTextarea";

export default ContentTextarea;
