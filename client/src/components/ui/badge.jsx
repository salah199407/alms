import React from "react";

export function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-medium text-white ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
