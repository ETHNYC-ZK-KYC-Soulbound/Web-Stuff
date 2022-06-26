import detectEthereumProvider from "@metamask/detect-provider"
import { Identity } from "@semaphore-protocol/identity"
import { Group } from "@semaphore-protocol/group"
import { generateProof, packToSolidityProof } from "@semaphore-protocol/proof"
import { providers } from "ethers"
// import { grabFromIPFS } from "@/photo";
import {
  Box,
  Button,
  Container,
  Flex,
  // Image,
  // Select,
  Spacer,
} from "@chakra-ui/react";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, {
  // useEffect,
  // useState 
} from "react";
import BindProofKyc from "artifacts/contracts/BindProofKyc.sol/BindProofKyc.json"
import { Contract, providers, utils } from "ethers"
// import { useSigner } from "wagmi";

export default function PickGroup() {
  const [logs, setLogs] = React.useState("Connect your wallet and greet!")
  const handleNy = async () => {
    console.log('signer')
    const provider = (await detectEthereumProvider()) as any
    await provider.request({ method: "eth_requestAccounts" })
    const ethersProvider = new providers.Web3Provider(provider)
    const signer = ethersProvider.getSigner()
    const message = await signer.signMessage("Sign this message to create your identity!")
    console.log('identity')
    const identity = new Identity(message)
    // const identityCommitments = await (await fetch("./identityCommitments.json")).json()
    const identityCommitments = await (await fetch("https://raw.githubusercontent.com/ETHNYC-ZK-KYC-Soulbound/semaphore-kyc/main/public/identityCommitments.json")).json()
    console.log('group')
    const groupNy = new Group()
    console.log(groupNy)

    console.log("Validating that this user is from: " + "NY");
    setLogs("Creating your Semaphore identity...")
    groupNy.addMember(identityCommitments[0])
    console.log(groupNy)
    setLogs("Creating your Semaphore proof...")
    const greeting = ""
    const { proof, publicSignals } = await generateProof(identity, groupNy, groupNy.root, greeting, {
      wasmFilePath: "https://raw.githubusercontent.com/ETHNYC-ZK-KYC-Soulbound/semaphore-kyc/main/public/semaphore.wasm",
      zkeyFilePath: "https://raw.githubusercontent.com/ETHNYC-ZK-KYC-Soulbound/semaphore-kyc/main/public/semaphore.zkey"
    })
    console.log(publicSignals)
    const solidityProof = packToSolidityProof(proof)
    console.log(solidityProof)
    console.log('prove created for NY')

    console.log('load contract')
    const contract = new Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", BindProofKyc.abi)

    const contractOwner = contract.connect(signer)

    try {
      await contractOwner.greet(utils.formatBytes32String(greeting), publicSignals.nullifierHash, solidityProof)

    } catch (error: any) {
      const { message } = JSON.parse(error.body).error
      const reason = message.substring(message.indexOf("'") + 1, message.lastIndexOf("'"))
      console.log(reason)
    }
    console.log('mint proof into the contract')
  }
  const handleWy = () => {
    console.log("Validating that this user is from: " + "WY");
  }
  return (
    <Box
      h="100vh"
      w="100vw"
    >
      <Flex
        direction="column"
        justifyContent="center"
        align="center"
      >
        <Spacer h="35px" />
        <Container
          flexDirection="row"
          justifyContent="center"
        >
          <Button
            display="flex"
            alignContent="center"
            justifyContent="center"
            borderRadius="30"
            h="55"
            w="20%"
            backgroundColor="#f1b261"
            onClick={handleNy}
          >
            NY
          </Button>
          <Button
            display="flex"
            alignContent="center"
            justifyContent="center"
            borderRadius="30"
            h="55"
            w="20%"
            backgroundColor="#f1b261"
            onClick={handleWy}
          >
            WY
          </Button>
        </Container>
        <Spacer h="35px" />
        <div
        // className={styles.logs}
        >{logs}</div>
      </Flex>
    </Box>
  );
}

