// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import React from "react";
import { useAccount } from "wagmi";
import Code from "../Display/Code";

const Deploy: React.FC = () => {
  const { address } = useAccount();

  return (
    <section className="px-4 relative z-10 mt-12">
      <div className="card container rounded-3xl mx-auto px-6 lg:px-12 py-5 overflow-hidden">
        <div className="font-bold text-2xl mb-4">Deploy your contract to DYM9</div>

        <Code
          copy={`
    dympierre: {
      url: "https://froopyland.dymension.xyz/3/pierreneter_20-1/evmrpc",
      chainId: 20,
      accounts: [process.env.PRIVATE_KEY!],
      timeout: 2_147_483_647,
      gasPrice: 500_000,
      blockGasLimit: 20_000_000,
    },
            `}
        >
          <pre>
            {`
    dympierre: {
      url: "https://froopyland.dymension.xyz/3/pierreneter_20-1/evmrpc",
      chainId: 20,
      accounts: [process.env.PRIVATE_KEY!],
      timeout: 2_147_483_647,
      gasPrice: 500_000,
      blockGasLimit: 20_000_000,
    },
            `}
          </pre>
        </Code>
      </div>
    </section>
  );
};

export default Deploy;
