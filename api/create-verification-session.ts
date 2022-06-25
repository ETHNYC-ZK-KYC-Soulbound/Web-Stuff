import { VercelRequest, VercelResponse } from "@vercel/node";
import { utils } from "ethers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_TEST_API_KEY as string, {
  apiVersion: "2020-08-27",
  typescript: true,
});

interface VerificationSessionInput {
  address: string | undefined;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { address } = req.body as VerificationSessionInput;

    // Check if address is provided and is legit
    if (typeof address !== "string" || !utils.isAddress(address)) {
      return res.status(401).send("Invalid parameters");
    }

    const verificationSession =
      await stripe.identity.verificationSessions.create({
        type: "document",
        metadata: {
          user_id: address,
        },
        // Additional options for configuring the verification session:
        options: {
          document: {
            allowed_types: ["driving_license", "passport", "id_card"],
            require_id_number: true, // https://stripe.com/docs/identity/verification-checks?type=id-number
            require_live_capture: true,
            require_matching_selfie: true, // https://stripe.com/docs/identity/selfie#session
          },
        },
      });
    const clientSecret = verificationSession.client_secret;
    res.status(200).json({
      address,
      clientSecret,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
