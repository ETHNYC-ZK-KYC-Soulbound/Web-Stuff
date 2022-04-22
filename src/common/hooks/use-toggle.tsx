import React from "react";
import type { ToggleState } from "../types";

export function useToggle(
  initialState: ToggleState = "off",
): Readonly<{ state: ToggleState; toggle: (s?: ToggleState) => void }> {
  const [state, setState] = React.useState<ToggleState>(initialState);

  return {
    state,
    toggle: (s: ToggleState = state === "on" ? "off" : "on") => setState(s),
  };
}
