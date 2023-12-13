// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";
import Code from "../Display/Code";

const Guide: React.FC = () => {
  const { address } = useAccount();

  return (
    <section className="px-4 relative z-10" id="guide">
      <div className="card container rounded-3xl mx-auto px-6 lg:px-12 py-5 overflow-hidden">
        <div className="mt-4 py-6 flex items-center justify-center gap-6">
          <div>Based on</div>
          <img src="/images/logo-dymension-bright.png" alt="Dymension" className="max-w-[250px]" />
        </div>
        <div className="mt-4">
          Quick deposit:{" "}
          <a className="underline font-bold text-2xl" href="https://portal.dymension.xyz/rollapp/pierreneter_20-12" target="_blank" rel="noopener noreferrer">
            pierreneter_20-1
          </a>{" "}
          <img src="/images/dym-is-money2.jpg" alt="Dymension" className="max-w-[250px] mt-2" />
        </div>
        <ul>
          <li>
            <div className="font-bold text-2xl">1. Faucet DYM</div>
            <div className="lg:pl-12">
              <div className="mt-3">
                Go to Discord faucet channel{" "}
                <a className="underline font-bold" href="https://discord.com/channels/956961633165529098/1143231362468434022" target="_blank" rel="noopener noreferrer">
                  #froopyland-faucet
                </a>{" "}
              </div>
              {address ? (
                <div className="mt-1">
                  Send a request <Code copy={`$request {address}`}>$request {address}</Code>, wait for it success
                </div>
              ) : (
                <ConnectButton />
              )}
            </div>
          </li>
          <li>
            <div className="font-bold text-2xl mt-8">2. Faucet PIE</div>
            <div className="lg:pl-12">
              <div className="mt-3">
                Go to Discord faucet channel{" "}
                <a className="underline font-bold" href="https://discord.com/channels/956961633165529098/1143231362468434022" target="_blank" rel="noopener noreferrer">
                  #froopyland-faucet
                </a>{" "}
              </div>
              {address ? (
                <div>
                  Send a request <Code copy={`$request {address} pierreneter_20-1`}>$request {address} pierreneter_20-1</Code>, wait for it success
                </div>
              ) : (
                <ConnectButton />
              )}
            </div>
          </li>
          <li>
            <div className="font-bold text-2xl mt-8">3. Deposit DYM to Pierreneter Rollapp</div>
            <div className="lg:pl-12">
              <div className="mt-3">
                Go to RollApp page{" "}
                <a className="underline font-bold" href="https://portal.dymension.xyz/rollapp/pierreneter_20-12" target="_blank" rel="noopener noreferrer">
                  pierreneter_20-1
                </a>{" "}
              </div>

              <div>
                Deposit your <span className="font-bold">DYM</span>, to <code>pierreneter_20-1</code>
              </div>

              <img src="/images/rollapp-pierreneter.png" alt="Rollapp page Pierreneter" className="max-w-[100%] w-[1000px] mt-[10px]" />
              <img src="/images/deposit-dym.png" alt="Deposit DYM" className="max-w-[100%] w-[500px] mt-[10px]" />
            </div>
          </li>
          <li>
            <div className="font-bold text-2xl mt-8">4. Deposit PIE to Pierreneter Rollapp</div>
            <div className="lg:pl-12">
              <div className="mt-3">
                Go to RollApp page{" "}
                <a className="underline font-bold" href="https://portal.dymension.xyz/rollapp/pierreneter_20-12" target="_blank" rel="noopener noreferrer">
                  pierreneter_20-1
                </a>{" "}
              </div>

              <div className="mt-1">
                Deposit your <span className="font-bold">RAX (PIE)</span>, to <code>pierreneter_20-1</code>
              </div>

              <img src="/images/deposit-rax.png" alt="Deposit RAX" className="max-w-[100%] w-[500px] mt-[10px]" />

              <img src="/images/rollapps.jpg" alt="Rollapps" className="max-w-[100%] w-[250px] mt-[10px]" />
            </div>
          </li>
          <li>
            <div className="font-bold text-2xl mt-8">5. Increase DYM9 Number to 1m</div>

            <img src="/images/increase-1m.png" alt="Increase" className="max-w-[100%] w-[500px] mt-[10px]" />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Guide;
