import cn from "classnames";
import React from "react";

export const Button = React.memo(function Button(props: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={cn(
        "rounded-full py-4.5 px-9 transition-colors",
        { "pointer-events-none cursor-not-allowed opacity-20": props.disabled },
        props.className,
      )}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
});
