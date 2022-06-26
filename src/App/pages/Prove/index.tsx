import { Background } from "@/App/Background/Background";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useSigner } from "wagmi";

export default function Validate() {
  const [option, setOption] = React.useState("");
  const { data: signer, isError, isLoading } = useSigner();
  const handleSubmit = () => {
    console.log("Validating that this user is from: " + option);
  };

  console.log("signer is", signer);

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
        <Image
          zIndex="1"
          pb="85px"
          alt="id"
          src="data:image/jpeg;base64,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"
        />
        <Container
          flexDirection="column"
          justifyContent="center"
          align="center"
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
