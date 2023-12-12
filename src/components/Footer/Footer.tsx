// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import { HeartFill } from "@styled-icons/bootstrap";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="pb-6 pt-12 container mx-auto">
      <div className="flex items-center justify-between flex-col lg:flex-row gap-6">
        <div className="w-[380px]">
          <a href="http://dym9.xyz" target="_blank" rel="noopener noreferrer" className="text-3xl font-mono">
            dym9.xyz
          </a>
          <div>
            <span className="">Touch me at</span>{" "}
            <a href="http://pierreneter.com" target="_blank" rel="noopener noreferrer" className="underline code">
              pierreneter@gmail.com
            </a>
            <HeartFill size={26} color="#ff0000" />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <img src="/images/lucky-badge.png" alt="Transflox" />

          <a href="http://transflox.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/transflox-badge.png" alt="Transflox" width={180} />
          </a>
          <a href="http://p10node.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/p10node-badge.png" alt="P10Node" width={180} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
