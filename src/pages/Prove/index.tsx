// import Background from "@/App/Background";
// import { grabFromIPFS } from "@/photo";
import {
  Box,
  Button,
  Container,
  Flex,
  // Image,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, {
  useEffect,
  useState
} from "react";
// import { useSigner } from "wagmi";
import PickGroup from "src/App/pages/Prove/PickGroup"

import Background from '@/components/Background'

export default function Validate() {
  const [option, setOption] = React.useState("");
  const [image, setImage] = useState("");
  const { data: signer } = useSigner();
  // const [image, setImage] = useState("");
  // const { data: signer, isError, isLoading } = useSigner();
  // console.log(signer, isError, isLoading)

  const handleSubmit = () => {
    console.log("Validating that this user is from: " + option);
  };

  // console.log("signer is", signer);

  return (
    <Box
      h="100vh"
      w="100vw"
    >
      <Background />
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="end"
        zIndex="1"
        p="20px"
      >
        <ConnectButton />
      </Box>
      <Flex
        direction="column"
        justifyContent="center"
        align="center"
      >
        {/* {image ? ( */}
        {/*   <Image */}
        {/*     zIndex="1" */}
        {/*     pb="85px" */}
        {/*     alt="id" */}
        {/*     src={image} */}
        {/*   /> */}
        {/* ) : ( */}
        {/*   <div>Need to decrypt the image</div> */}
        {/* )} */}
        <Container
          flexDirection="column"
          justifyContent="center"
          // align="center"
          alignContent="center"
        >
          <Select
            placeholder="Select City"
            backgroundColor="gray.100"
            border="none"
            onChange={(e) => {
              setOption(e.target.value);
            }}
            value={option}
            size="lg"
          >
            <option value="NYS">New York</option>
            <option value="WY">Wyoming</option>
          </Select>
          <Spacer h="35px" />
          <PickGroup />
          <Spacer h="35px" />
          <Button
            display="flex"
            alignContent="center"
            justifyContent="center"
            borderRadius="30"
            h="55"
            w="20%"
            backgroundColor="#f1b261"
            onClick={handleSubmit}
          >
            Prove
          </Button>
        </Container>
      </Flex>
    </Box>
  );
}
