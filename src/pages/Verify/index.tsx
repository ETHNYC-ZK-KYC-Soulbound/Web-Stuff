import {
  Box,
  Button,
  Container,
  Flex,
  Select,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from 'react'

interface Info {
  state: string;
  worldCoinVerified: boolean
}

const idToInfo = new Map<string, Info>([
  [
    "0x1dcadb59abd226b89e06ba15895c5b81",
    {
      state: "NYS",
      worldCoinVerified: false,
    },
  ],
  [
    "0xbbdb46bab30e9a010be5c94ec024bef8",
    {
      state: "WY",
      worldCoinVerified: true,
    },
  ],
]);

export default function Validate() {
  const [id, setId] = useState("");
  console.log("id is", id);
  const handleSubmit = () => {
    console.log("Verifying user with id " + id);
  };

  return (
    <Box
      h="100vh"
      w="100vw"
    >
      {/* <Background /> */}
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
        <Container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Select
            placeholder="Select UUID"
            backgroundColor="gray.100"
            border="none"
            onChange={(e) => {
              setId(e.target.value);
            }}
            value={id}
            size="lg"
          >
            {[...idToInfo.keys()].map((id) => (
              <option key={id} value={id}>{id}</option>
            ))}
          </Select>

          <Text color="black">
            {JSON.stringify(idToInfo.get(id)) ===
            `{"state":"NYS","worldCoinVerified":false}`
              ? "NYS : 🛑"
              : JSON.stringify(idToInfo.get(id)) ===
                `{"state":"WY","worldCoinVerified":true}`
              ? "WY  : ✅"
              : null}
          </Text>

          <Spacer h="15px" />
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
            Verify
          </Button>
        </Container>
      </Flex>
    </Box>
  );
}
