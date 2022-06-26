import RainbowConnectButton from "@/components/RainbowConnectButton";
import { WorldIDComponent } from "@/components/WorldIDComponent";
import { Box } from "@chakra-ui/react";
import type { VerificationResponse } from "@worldcoin/id";
import cn from "classnames";
import React, { useEffect } from 'react';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import Background  from "../components/Background";
import Header from '../layouts/Header'
import { useAppDispatch } from '../states/hooks'
import {updateWalletAddress, updateWorldIDResponse} from '../states/application/slice'

enum Screen {
  Initial,
  WalletConnected,
}

export default function App() {
  // const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [walletAddress, setWalletAddress] = React.useState<string | undefined>();
  const [screen, setScreen] = React.useState(Screen.Initial)

  useEffect(() => {
    console.log(walletAddress)
    if (!walletAddress) return
    // dispatch(updateWalletAddress(walletAddress))
    setScreen(Screen.WalletConnected)
  }, [walletAddress])

  function handleWorldIDComplete(worldIDResponse: VerificationResponse) {
    if (!worldIDResponse || !worldIDResponse.proof || !worldIDResponse.nullifier_hash || !worldIDResponse.merkle_root) {
      // dispatch(updateWorldIDResponse(undefined))
      toast.error('Failed to verify with WorldID!', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      })
      return
    }
    // updateWorldIDResponse(worldIDResponse)
    // dispatch(updateWorldIDResponse(worldIDResponse))
    toast.success('Successfully verify with WorldID! <br /> Redirecting in five seconds....', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      onClose: () => navigate('/upload'),
    })
  }

  return (
    <div className="relative grid h-full w-full content-between bg-0f0b16 px-6 pt-5 xs:px-16 xs:pb-4.5 xs:pt-9">
      <Background />
      <div
        className={cn(
          "relative grid gap-y-10 2xl:gap-y-64",
          { "xs:gap-y-25": screen === Screen.WalletConnected },
        )}
      >
        <Header walletAddress={walletAddress} />

        <div className="grid justify-items-center gap-y-3 justify-self-center text-ffffff xs:gap-y-4">
          <h1 className="text-16 font-bold xs:text-24">
            Are you a robot?
          </h1>

          <div className="lg:text-50 mt-2 grid justify-items-center text-30 xs:mt-0 xs:block">
            <span className="font-black">Complete</span>
            <span className="font-black text-f1b261 "> KYC </span>
            <span className="font-black">secured by ZK proofs</span>
          </div>

          <p className="mb-5 text-center text-14 xs:mb-8 xs:text-18">
            Access state regulated services without exposing private data.
          </p>

          {screen === Screen.WalletConnected && (
            <div className="grid w-full max-w-[350px] gap-y-8">
              {walletAddress && (
                <div className="m-auto">
                  <WorldIDComponent
                    signal={walletAddress}
                    setProof={handleWorldIDComplete}
                  />
                </div>
              )}
            </div>
          )}

          <Box textColor="black" className="mt-6 grid justify-items-center gap-y-3">
            <RainbowConnectButton setWalletAddress={setWalletAddress} />
          </Box>
        </div>
      </div>
    </div>
  );
}

// const claimAction = async () => {
//   if (!worldIDProof) {
//     throw "World ID proof is missing.";
//   }
//
//   const web3Provider = new ethers.providers.Web3Provider(provider);
//   const daiContract = new ethers.Contract(
//     CONTRACT_ADDRESS,
//     CONTRACT_ABI,
//     web3Provider.getSigner(),
//   );
//
//   // eslint-disable-next-line
//   const claimResult = await daiContract.claim(
//     walletAddress,
//     worldIDProof.merkle_root,
//     worldIDProof.nullifier_hash,
//     abi.decode(["uint256[8]"], worldIDProof.proof)[0],
//     { gasLimit: 10000000 },
//   );
//   setTxHash((claimResult as Record<string, string>).hash);
//   console.log("Airdrop claimed successfully!", claimResult);
// };

// const claim = async () => {
//   setModalContent(modalVariants.pending);
//   modal.toggle("on");
//
//   try {
//     await claimAction();
//     modal.toggle("off");
//     setScreen(Screen.Congratulations);
//   } catch (error) {
//     console.error("Error executing transaction:", error);
//     setModalContent(modalVariants.fail);
//   }
// };
