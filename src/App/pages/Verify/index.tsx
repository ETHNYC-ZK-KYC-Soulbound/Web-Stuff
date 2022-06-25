import { Button, Flex, Select } from "@chakra-ui/react";
import React from "react";

interface Info {
  state: string;
  worldCoinVerified: boolean;
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
  const [id, setId] = React.useState("");
  const handleSubmit = () => {
    console.log("Verifying user with id " + id);
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      align="center"
    >
      <Select
        placeholder="Select UUID"
        onChange={(e) => {
          setId(e.target.value);
        }}
        value={id}
        size="lg"
      >
        {[...idToInfo.keys()].map((id) => (
          <option value={id}>{id}</option>
        ))}
      </Select>

      <div>{JSON.stringify(idToInfo.get(id))}</div>

      <Button onClick={handleSubmit}>Verify</Button>
    </Flex>
  );
}