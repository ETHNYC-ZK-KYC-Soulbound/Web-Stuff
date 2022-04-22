import { Button } from "@/common/Button/Button";
import { Icon } from "@/common/Icon";
import type { ImageSource, ToggleState } from "@/common/types";
import cn from "classnames";
import React from "react";

export const Modal = React.memo(function Modal(props: {
  status: string;
  description?: string;
  buttonText?: string;
  visibility: ToggleState;
  icon: ImageSource;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 grid min-h-screen w-screen content-center justify-items-center",
        "bg-000000/70 p-4 transition-visibility/opacity",
        {
          "pointer-events-none invisible select-none opacity-0":
            props.visibility === "off",
        },
      )}
    >
      <div
        className={cn(
          "grid min-h-[192px] w-full max-w-sm content-center justify-items-center gap-y-3",
          "rounded-20 bg-18161b p-10 text-ffffff",
        )}
      >
        <Icon
          src={props.icon}
          className="h-8 w-8"
          useMask={false}
        />
        <div className="mt-3 text-20">{props.status}</div>
        {props.description && (
          <p className="text-center">{props.description}</p>
        )}

        {props.buttonText && (
          <Button
            onClick={props.onClick}
            className="mt-5 w-full bg-df57bc"
          >
            {props.buttonText}
          </Button>
        )}
      </div>
    </div>
  );
});
