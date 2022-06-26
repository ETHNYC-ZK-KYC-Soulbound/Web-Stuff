import {Box, Text} from "@chakra-ui/react";
// import {provider} from "@/utils/const";
import React from "react";

export default function Header({
  walletAddress
}: {
  walletAddress: string | undefined
}) {
  // const logout = () => {
  //   provider.disconnect().catch(console.error.bind(console));
  //   window.location.reload();
  // };

  return (
    <header className="flex items-center py-2.5">
      <div
        className="text-20 font-bold text-ffffff xs:text-32"
        style={{ flexGrow: 1 }}
      >
        <Box
          display="flex"
          // justifyContent="flex-end"
          alignItems="end"
          zIndex="1"
          p="20px"
        >
          <Text
            flexGrow="1"
            fontSize="5xl"
            color="white"
            fontWeight="bold"
            textAlign="center"
          >
            ZK Elkan
          </Text>
          {/*<Spacer />*/}
          {
            // <Box>
            //   <Link to="/prove">
            //     <Text
            //       fontSize="xl"
            //       color="white"
            //       fontWeight="normal"
            //       p="20px"
            //     >
            //       Prove
            //     </Text>
            //   </Link>
            // </Box>
            // <Box>
            //   <Link to="/verify">
            //     <Text
            //       fontSize="xl"
            //       color="white"
            //       fontWeight="normal"
            //       p="20px"
            //     >
            //       Verify
            //     </Text>
            //   </Link>
            // </Box>
          }
        </Box>
      </div>
    </header>
  )
}
