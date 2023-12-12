// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { Link } from "react-scroll";

const Header: React.FC = () => {
  return (
    <header className="px-12 lg:px-20 py-12 relative z-10">
      <div className="flex justify-between flex-row gap-6">
        <Link className="text-white cursor-pointer" to="/">
          <div className="font-bold text-3xl">DymNEI</div>
          <div className="font-mono pl-10">dym9.xyz</div>
        </Link>
        <div className="flex items-center gap-2 lg:gap-8 flex-col lg:flex-row">
          <a href="https://dymension.xyz" target="_blank" rel="noopener noreferrer" className="underline">
            dymension.xyz
          </a>
          <Link to="rewards" className="underline cursor-pointer" spy={true} smooth={true} duration={500} offset={-50}>
            Rewards
          </Link>
          <Link to="guide" className="underline cursor-pointer" spy={true} smooth={true} duration={500} offset={-50}>
            Faucet
          </Link>
          <div>
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
