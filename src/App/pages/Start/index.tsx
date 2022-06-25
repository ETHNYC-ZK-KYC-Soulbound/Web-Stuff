import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

// Stripe Verification process:
// home https://stripe.com/docs/identity#get-started
// doc https://stripe.com/docs/identity/verify-identity-documents?html-or-react=react

function VerifyButton() {
  const [stripe, setStripe] = useState<Stripe | null>();
  const [clientSecret, setClientSecret] = useState<string | undefined>();
  const [userId, setUserId] = useState<string | undefined>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_TEST_API_KEY as string,
      );
      setStripe(stripePromise);
    })();
  }, []);

  async function handleVerifyClick(event: React.MouseEvent<HTMLButtonElement>) {
    // Block native event handling
    event.preventDefault();

    // Stripe.js has not loaded yet. Make sure to disable the button until Stripe.js has loaded.
    if (!stripe) return;

    // Call your backend to create the VerificationSession.
    const apiURL = `${
      process.env.REACT_APP_LOCAL_API_BASE_URL as string
    }/create-verification-session`;
    const apiBody = {
      // TODO: change this to Worldcoin's output address (unique)
      address: "0xab3f459de154B9D58DE8AdA4b4AEe271823c3155",
    };
    const response = await axios.post<{
      clientSecret: string;
      address: string;
    }>(apiURL, apiBody);
    const session = response.data;

    // Show the verification modal.
    const { error } = await stripe.verifyIdentity(session.clientSecret);

    if (error) {
      console.log("[error]", error);
      setClientSecret(undefined);
      setUserId(undefined);
      setIsSubmitted(false);
    } else {
      console.log("Verification submitted!");
      setClientSecret(session.clientSecret);
      setUserId(session.address);
      setIsSubmitted(true);
    }
  }

  if (isSubmitted) {
    return (
      <>
        <h1>Thanks for submitting your identity document</h1>
        <p>We are processing your verification.</p>
      </>
    );
  }

  return (
    <button
      type="button"
      role="link"
      className="bg-df57bc hover:bg-df57bc/70"
      disabled={!stripe}
      onClick={handleVerifyClick}
    >
      Verify with dummy unique address
    </button>
  );
}

export default function StartPageMain() {
  return (
    <div
      id={"main"}
      className={clsx("m-auto max-w-6xl p-5", "flex flex-col", "flex flex-row")}
    >
      <h2>Unique address should come from Worldcoin</h2>
      <div className="pt-2">
        <VerifyButton />
      </div>
    </div>
  );
}
