import { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_TEST_API_KEY as string, {
  apiVersion: "2020-08-27",
  typescript: true,
});

export default (req: VercelRequest, res: VercelResponse) => {
  let event;
  const stripeEndpointSecret = process.env.STRIPE_TEST_WEBHOOK_KEY;

  // Verify the event came from Stripe
  try {
    const sig = req.headers["stripe-signature"];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    event = stripe.webhooks.constructEvent(req.body, sig, stripeEndpointSecret);
  } catch (err) {
    // On error, log and return the error message
    console.log(err);
    return res.status(400).send("Webhook Error");
  }

  // Successfully constructed event
  console.log(event);

  // If event is not the 'verified' event, skip it
  if (event.type !== "identity.verification_session.verified") {
    if (event.type !== "identity.verification_session.requires_input") {
      const verificationSession = event.data
        .object as Stripe.Identity.VerificationSession;
      console.log("Verification check failed!");
      if (verificationSession?.last_error)
        console.log(verificationSession.last_error);
    }
    return res.json({ received: true }); // send back to webhook to end
  }

  // Verified!
  // https://stripe.com/docs/api/identity/verification_sessions/object#identity_verification_session_object-verified_outputs
  const verificationSession = event.data
    .object as Stripe.Identity.VerificationSession;
  const { verified_outputs: verifiedOutputs } = verificationSession;
  if (verifiedOutputs !== null) {
    const {
      address,
      dob,
      id_number: idNumber,
      first_name: firstName,
      last_name: lastName,
    } = verifiedOutputs;
    if (!address) {
      console.log("Invalid address after verification!");
      console.log(verifiedOutputs);
      return res.json({ received: true }); // send back to webhook to end
    }

    const { city, state } = address;
  }

  return res.json({ received: true }); // send back to webhook to end
};
