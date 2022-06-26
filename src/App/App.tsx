import { Button } from "@/common/Button/Button";
import { useToggle } from "@/common/hooks/use-toggle";
import { CONTRACT_ABI, CONTRACT_ADDRESS, provider } from "@/const";
import { midEllipsis } from "@/utils";
import { WorldIDComponent } from "@/WorldIDComponent";
import { Box, Text } from "@chakra-ui/react";
import { defaultAbiCoder as abi } from "@ethersproject/abi";
import type { VerificationResponse } from "@worldcoin/id";
import cn from "classnames";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Background } from "./Background/Background";
import { Modal } from "./Modal/Modal";
import type { ModalContent } from "./Modal/modal-variants";
import { modalVariants } from "./Modal/modal-variants";

enum Screen {
  Initial,
  Confirm,
  Congratulations,
}

export const App = React.memo(function App() {
  const [screen, setScreen] = React.useState(Screen.Initial);
  const [worldIDProof, setWorldIDProof] =
    React.useState<VerificationResponse | null>(null);
  const [walletAddress, setWalletAddress] = React.useState("");
  const [txHash, setTxHash] = React.useState(""); // hash of the executed airdrop
  const [image, setImage] = useState({ preview: "", raw: "" });

  const [modalContent, setModalContent] = React.useState<ModalContent>(
    modalVariants.confirmation,
  );
  const modal = useToggle();

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  const connectWallet = React.useCallback(async () => {
    try {
      //  Enable session (triggers QR Code modal)
      provider
        .enable()
        .then(() => {
          setWalletAddress(provider.accounts[0]);
          setScreen(Screen.Confirm);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.error(err);
    }
  }, [provider]);

  const logout = () => {
    provider?.disconnect().catch(console.error.bind(console));
    window.location.reload();
  };

  const claimAction = async () => {
    if (!worldIDProof) {
      throw "World ID proof is missing.";
    }

    const web3Provider = new ethers.providers.Web3Provider(provider);
    const daiContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      web3Provider.getSigner(),
    );

    // eslint-disable-next-line
    const claimResult = await daiContract.claim(
      walletAddress,
      worldIDProof.merkle_root,
      worldIDProof.nullifier_hash,
      abi.decode(["uint256[8]"], worldIDProof.proof)[0],
      { gasLimit: 10000000 },
    );
    setTxHash((claimResult as Record<string, string>).hash);
    console.log("Airdrop claimed successfully!", claimResult);
  };

  const claim = async () => {
    setModalContent(modalVariants.pending);
    modal.toggle("on");

    try {
      await claimAction();
      modal.toggle("off");
      setScreen(Screen.Congratulations);
    } catch (error) {
      console.error("Error executing transaction:", error);
      setModalContent(modalVariants.fail);
    }
  };

  const modalButtonAction = React.useCallback(
    () => modal.toggle("off"),
    [modal],
  );

  return (
    <div className="relative grid h-full w-full content-between bg-0f0b16 px-6 pt-5 xs:px-16 xs:pb-4.5 xs:pt-9">
      <Background />
      <div
        className={cn(
          "relative grid gap-y-10 2xl:gap-y-64",
          { "xs:gap-y-25": screen !== Screen.Congratulations },
          { "xs:gap-y-48": screen === Screen.Congratulations },
        )}
      >
        <header className="flex items-center py-2.5">
          <p
            className="text-20 font-bold text-ffffff xs:text-32"
            style={{ flexGrow: 1 }}
          >
            <Text
              fontSize="5xl"
              color="white"
              fontWeight="light"
            >
              ZKPKYCSBT
            </Text>
          </p>
          {walletAddress && (
            <div className="font-bold text-ffffff">
              {midEllipsis(walletAddress, 12)}{" "}
              <b>
                -{" "}
                <button
                  className="cursor-pointer font-bold"
                  onClick={logout}
                >
                  Logout
                </button>
              </b>
            </div>
          )}
        </header>

        {screen !== Screen.Congratulations && (
          <div className="grid justify-items-center gap-y-3 justify-self-center text-ffffff xs:gap-y-4">
            <h1 className="text-16 font-bold xs:text-24">
              prove you're a human with worldcoin
            </h1>

            <div className="lg:text-50 mt-2 grid justify-items-center text-30 xs:mt-0 xs:block">
              <span className="font-black">complete</span>
              <span className="font-black text-f1b261 "> KYC </span>
              <span className="font-black">secured by zkProofs</span>
            </div>

            <p className="mb-5 text-center text-14 xs:mb-8 xs:text-18">
              access state regulated services without losing unnecassary
              personal data
            </p>

            {screen === Screen.Initial && (
              <Box
                textColor="black"
                className="grid justify-items-center gap-y-3 "
              >
                <Button
                  onClick={connectWallet}
                  type="button"
                  className="bg-f1b261 hover:bg-f1b261/70"
                >
                  Connect Wallet
                </Button>
              </Box>
            )}

            {
              // screen === Screen.Confirm && (
              <div className="grid w-full max-w-[254px] gap-y-8">
                {walletAddress && (
                  <WorldIDComponent
                    signal={walletAddress}
                    setProof={(proof) => setWorldIDProof(proof)}
                  />
                )}

                <Box
                  display="flex"
                  alignContent="center"
                  justifyContent="center"
                  borderRadius="30"
                  h="55"
                  textColor="black"
                  className="w-full bg-f1b261 hover:bg-f1b261/70"
                >
                  <label htmlFor="upload-button">
                    {image.preview ? (
                      <img
                        src={image.preview}
                        alt="dummy"
                        width="300"
                        height="300"
                      />
                    ) : (
                      <>
                        <span className="fa-stack fa-2x mt-3 mb-2">
                          <i className="fas fa-circle fa-stack-2x" />
                          <i className="fas fa-store fa-stack-1x fa-inverse" />
                        </span>
                        <h5 className="text-center">Add photo ID photo</h5>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    id="upload-button"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                </Box>
                <Box
                  display="flex"
                  alignContent="center"
                  justifyContent="center"
                  borderRadius="30"
                  h="55"
                  textColor="black"
                  className="w-full bg-f1b261 hover:bg-f1b261/70"
                >
                  <button onClick={handleUpload}>Upload</button>
                </Box>
              </div>
              // )
            }
          </div>
        )}

        {screen === Screen.Congratulations && (
          <div className="grid max-w-[314px] justify-items-center gap-y-3 justify-self-center">
            {/* <Icon
              src={successSvg}
              className="mb-3 h-12 w-12"
              useMask={false}
            /> */}
            <h1 className="text-24 font-bold text-ffffff xs:text-30">
              CONGRATULATIONS!
            </h1>
          </div>
        )}
      </div>

      <Modal
        status={modalContent.status}
        description={modalContent.description}
        buttonText={modalContent.button}
        icon={modalContent.icon}
        visibility={modal.state}
        onClick={modalButtonAction}
      />
    </div>
  );
});
