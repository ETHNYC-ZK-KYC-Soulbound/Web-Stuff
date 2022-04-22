import type { ImageSource } from "@/common/types";
import failSvg from "@static/fail.svg";
import spinnerSvg from "@static/spinner.svg";

export type ModalContent = {
  icon: ImageSource;
  status: string;
  description?: string;
  button?: string;
};

type Variants = "confirmation" | "fail" | "pending";

export const modalVariants: { [key in Variants]: ModalContent } = {
  confirmation: {
    icon: spinnerSvg,
    status: "Waiting for confirmation",
    description:
      "We’ve established a connection to your wallet, now please confirm the signature request.",
  },
  fail: {
    icon: failSvg,
    status: "Something went wrong!",
    description:
      "Sorry, looks like something went wrong there. Please try again or come back later.",
    button: "OK",
  },
  pending: {
    icon: spinnerSvg,
    status: "Please wait...",
  },
};
