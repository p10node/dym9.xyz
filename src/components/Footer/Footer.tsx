// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="pb-6 pt-12 container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex items-top gap-6 justify-center lg:justify-normal">
          <a href="https://dymension.xyz/" target="_blank" rel="noopener noreferrer">
            <div className="text-sm mb-2">Based on</div>
            <img src="/images/logo-dymension-bright.png" alt="Dym" width={250} />
          </a>
          <div>
            <div className="text-sm mb-2">Member of</div>
            <div className="flex items-center gap-2">
              <img src="/images/lucky-badge.png" alt="Lucky" width={45} /> <span className="text-lg">Lucky Community</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link to="/" rel="noopener noreferrer" className="text-3xl font-mono">
            dym9.xyz
          </Link>
          <div>
            {/* Developer by Pierre <br /> member of Lucky Research community */}
            {/* <span className="">Touch me at</span>{" "}
            <a href="http://pierreneter.com" target="_blank" rel="noopener noreferrer" className="underline code">
              pierreneter@gmail.com
            </a>
            <HeartFill size={26} color="#ff0000" /> */}
          </div>
        </div>

        <div className="flex items-center gap-5 justify-center lg:justify-end">
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
