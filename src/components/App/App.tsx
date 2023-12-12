// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import { Chain, RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { polygonMumbai } from "viem/chains";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import config from "../../config";
import PopupProvider from "../Popup/PopupProvider";
import Router from "../Router/Router";
import Toast from "../Toast/Toast";

const pierreneter: Chain = {
  id: 20,
  name: "Pierreneter",
  network: "pierreneter",
  iconUrl: "https://raw.githubusercontent.com/dymensionxyz/rollapp-registry/main/devnet/pierreneter_20-1/logos/pierreneter_20-1.png",
  iconBackground: "#141212",
  nativeCurrency: {
    decimals: 18,
    name: "Pierreneter",
    symbol: "PIE",
  },
  rpcUrls: {
    public: { http: ["https://froopyland.dymension.xyz/3/pierreneter_20-1/evmrpc"] },
    default: { http: ["https://froopyland.dymension.xyz/3/pierreneter_20-1/evmrpc"] },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
    etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: false,
};

const { chains, publicClient } = configureChains([config.isStaging ? polygonMumbai : pierreneter], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "DymNEI",
  projectId: "c47c4b13e82af7e5362a57f047d87c3d",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <QueryClientProvider client={queryClient}>
          <PopupProvider>
            <Router />
            <Toast />
          </PopupProvider>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
