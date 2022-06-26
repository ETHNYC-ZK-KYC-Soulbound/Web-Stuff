import { ChakraProvider } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App/App";
import Prove from "./App/pages/Prove";
import Verify from "./App/pages/Verify";
import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const container = document.getElementById("root");
if (!container) throw new ReferenceError(`Unable to found root element`);

const root = ReactDOMClient.createRoot(container);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <BrowserRouter>
            <Routes>
              <Route
                path="*"
                element={<div>not found</div>}
              />
              <Route
                path="/"
                element={<App />}
              ></Route>
              <Route
                path="/prove"
                element={<Prove />}
              ></Route>
              <Route
                path="/verify"
                element={<Verify />}
              ></Route>
            </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
);
