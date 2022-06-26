import { ChakraProvider } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from 'react'
import { createRoot } from 'react-dom/client'
// import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
// import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import App from "./pages/App";
import Prove from "./pages/Prove";
import Upload from './pages/Upload';
import Verify from "./pages/Verify";
// import { persistor, store } from './states'

import "@rainbow-me/rainbowkit/styles.css";
import "./styles/index.css";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai, chain.optimismKovan],
  [
    jsonRpcProvider({ rpc: () => ({ http: 'https://rpc.ankr.com/polygon_mumbai' }) }),
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function AppWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen w-screen flex-col justify-between bg-ffffff text-000000">{children}</div>
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    {/*<Provider store={store}>*/}
      {/*<PersistGate loading={null} persistor={persistor}>*/}
        <ChakraProvider>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <AppWrapper>
                <BrowserRouter>
                  <Routes>
                    <Route
                      path="*"
                      element={<div>Page Not Found</div>}
                    />
                    <Route
                      path="/"
                      element={<App />}
                    />
                    <Route
                      path="/upload"
                      element={<Upload />}
                    />
                    <Route
                      path="/prove"
                      element={<Prove />}
                    />
                    <Route
                      path="/verify"
                      element={<Verify />}
                    />
                  </Routes>
                </BrowserRouter>
                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  pauseOnHover={false}
                />
              </AppWrapper>
            </RainbowKitProvider>
          </WagmiConfig>
        </ChakraProvider>
      {/*</PersistGate>*/}
    {/*</Provider>*/}
  </React.StrictMode>,
);
