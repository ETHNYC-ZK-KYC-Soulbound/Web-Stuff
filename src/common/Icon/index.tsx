import cn from "classnames";
import React from "react";
import type { ImageSource } from "../types";
import styles from "./icon.module.css";

type Props = {
  src: ImageSource;
  className?: string;
  useMask?: boolean;
};

export const Icon = React.memo(function Icon({
  src,
  className,
  useMask = true,
}: Props) {
  return (
    <span
      className={cn(
        styles.icon,
        "icon pointer-events-none flex",

        {
          "bg-current": useMask,
          "no-mask": !useMask,
        },

        className,
      )}
      style={{ "--image": `url(${src})` } as React.CSSProperties}
    />
  );
});
