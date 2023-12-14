// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Exit, Reload } from "@styled-icons/ionicons-outline";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import styled, { keyframes } from "styled-components";
import { useAccount, useContractRead, useContractReads, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useAppDispatch } from "../../app/hooks";
import config from "../../config";
import Popup from "../Popup/Popup";
import { usePopups } from "../Popup/PopupProvider";
import { setToast } from "../Toast/toastReducer";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinningIcon = styled(Reload)`
  animation: 0.3s linear ${spin} infinite;
`;

const Hero: React.FC = () => {
  const { address } = useAccount();
  const [spin, setSpin] = useState(false);
  const [minting, setMinting] = useState(false);
  const [canMint, setCanMint] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);
  const { chain } = useNetwork();
  const dispatch = useAppDispatch();
  const { addPopup, removeAll } = usePopups();

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      { address: config.contractAddress, abi: config.contractAbi, functionName: "totalSupply" },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "totalUsers" },
      { address: config.dymAddress, abi: config.ercAbi, functionName: "balanceOf", args: [address as any] },
    ],
    watch: true,
    enabled: !chain?.unsupported,
  });
  const totalSupply = (Number(data?.[0].result) || 0) as number;
  const totalUsers = (Number(data?.[1].result) || 0) as number;
  const balance = (data?.[2].result || "0") as string;

  const { data: allowance, refetch } = useContractRead<any, "allowance", bigint>({
    address: config.dymAddress,
    abi: config.ercAbi,
    functionName: "allowance",
    args: [address, config.contractAddress],
    watch: true,
    enabled: !chain?.unsupported,
  });
  const { config: allowanceConfig } = usePrepareContractWrite({
    address: config.dymAddress,
    abi: config.ercAbi,
    functionName: "approve",
    args: [
      config.contractAddress,
      balance,
      // ethers.constants.MaxUint256.toHexString()
    ],
    enabled: !chain?.unsupported,
  });
  const { data: writeContractResult, write: approveWrite } = useContractWrite(allowanceConfig);

  useEffect(() => {
    if (writeContractResult?.hash) {
      setCanMint(true);
      setTimeout(async () => {
        if (mint) {
          await mint();
        }
      }, 2000);
    }
  }, [writeContractResult]);
  // const { isLoading: isApproving } = useWaitForTransaction({
  //   hash: writeContractResult ? writeContractResult.hash : undefined,
  //   confirmations: 0,

  //   onSuccess: async () => {
  //     try {
  //       refetch();
  //       setCanMint(true);
  //       setTimeout(async () => {
  //         if (mint) {
  //           await mint();
  //         }
  //       }, 2000);
  //     } catch (error: any) {
  //       dispatch(
  //         setToast({
  //           show: true,
  //           title: "",
  //           message: error.message.split("\n")?.[0] || error.message,
  //           type: "error",
  //         }),
  //       );
  //       setMinting(false);
  //     }
  //   },
  // });

  const { config: writeConfig } = usePrepareContractWrite({ address: config.contractAddress, abi: config.contractAbi, functionName: "safeMint", enabled: canMint });
  const { data: mintData, status: mintStatus, isLoading: mintLoading, writeAsync: mint } = useContractWrite(writeConfig);

  const {
    data: txData,
    isLoading: txLoading,
    isFetched,
  } = useWaitForTransaction({
    hash: mintData?.hash,
    enabled: !!mintData?.hash,
    onSuccess() {
      refetch();
    },
  });

  const loading = minting || mintLoading || txLoading;
  const valid = !loading && address && !chain?.unsupported;

  const mintSuccess = mintStatus === "success" && !!txData;

  useEffect(() => {
    if (mintSuccess && isFetched) {
      let nftId = "";
      txData.logs.map((item) => {
        if (item.address === config.contractAddress.toLocaleLowerCase()) {
          nftId = (parseInt(item.topics[3] as any, 16) + 1).toString();
        }
      });

      if (nftId) {
        dispatch(
          setToast({
            show: true,
            title: "",
            message: `Submit transaction success!`,
            type: "success",
          }),
        );

        addPopup({
          Component: () => {
            return (
              <Popup className="bg-white">
                <h2 className="py-5 text-center font-bold text-[24px] leading-[28px] text-gray-800">Increased!</h2>

                <div className="text-center text-red-500 text-7xl font-bold">{nftId}</div>

                <button onClick={() => removeAll()} className="text-gray-800 text-center underline block w-full mt-12">
                  Keep Incrase!!! <Exit size={20} />
                </button>
              </Popup>
            );
          },
          removeCallback: () => {
            setCanMint(false);
            setMinting(false);
          },
        });
      }
    }
  }, [mintSuccess, isFetched, txData]);

  const handle = async () => {
    if (Number(ethers.utils.formatEther(balance!)) < 0.5) {
      dispatch(
        setToast({
          show: true,
          title: "",
          message: "Insufficient funds (DYM), please faucet",
          type: "error",
        }),
      );
      return;
    }

    try {
      setMinting(true);

      if (Number(ethers.utils.formatEther(allowance!)) < 0.5) {
        if (approveWrite) {
          approveWrite();

          setTimeout(async () => {
            if (mint) {
              await mint();
            }
          }, 2000);
        }
      } else {
        setCanMint(true);
        setTimeout(async () => {
          if (mint) {
            await mint();
          }
        }, 2000);
      }
    } catch (error: any) {
      dispatch(
        setToast({
          show: true,
          title: "",
          message: error.message.split("\n")?.[0] || error.message,
          type: "error",
        }),
      );
      setMinting(false);
    }
  };

  return (
    <section className="min-h-[60vh] pb-12 z-10 relative">
      <div className="container mx-auto p-10">
        <div className="grid lg:grid-cols-3">
          <div className="col-span-2">
            <div className="text-[32px] font-monoc">Dymension</div>
            <h1 className="text-[60px] font-bold">Never Ending Increase</h1>
            <div className="mt-12 text-[20px] font-light pr-8">
              <p>
                <span className="font-bold text-2xl">The new kind of GM</span>! Increase the NEI Number to receive rewards when it reaches{" "}
                <span className="font-bold">1 million</span>.
              </p>
              <p className="mt-2">
                100% onchain system. That is a <span className="font-bold">dynamic NFT</span> containing The NEI Number you minted. Here is the best place to see{" "}
                <span className="font-bold">instructions</span> on how to deposit into Dym's rollapps and increase your transactions.
              </p>
            </div>
            <div className="mt-12">
              <div className="relative">
                <ConnectButton.Custom>
                  {({ account, chain, openConnectModal, openChainModal, authenticationStatus, mounted }) => {
                    const ready = mounted && authenticationStatus !== "loading";
                    const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

                    return (
                      <button
                        className="button px-12 py-4 font-bold text-[24px] z-10 relative flex items-center gap-4 rounded-2xl shadow-2xl"
                        onClick={() => {
                          if (!connected) {
                            openConnectModal();
                          }

                          if (chain?.unsupported) {
                            openChainModal();
                          }

                          if (valid) handle();
                        }}
                      >
                        {minting ? (
                          <>
                            Minting...
                            <img src="/images/clap.gif" alt="Clap" width={40} />
                          </>
                        ) : (
                          <>
                            Increase
                            <img src="/images/clap.gif" alt="Clap" width={40} />
                          </>
                        )}
                      </button>
                    );
                  }}
                </ConnectButton.Custom>
                <div className="board py-3 text-center rounded-lg w-[320px] sm:absolute sm:top-[50%] sm:left-[225px] sm:translate-y-[-50%] mt-5 sm:mt-0">
                  <div className="text[20px] text-center">THE NEI Number</div>
                  <div className="">
                    <CountUp
                      end={isError || isLoading ? 0 : Number(totalSupply)}
                      duration={3}
                      delay={0}
                      onEnd={() => {}}
                      onStart={() => {
                        setTimeout(() => {
                          setSpin(false);
                        }, 300);
                      }}
                    >
                      {({ countUpRef, start }) => (
                        <div className="relative">
                          <span className="text-[45px] leading-[45px] font-bold" ref={countUpRef} />
                          <button
                            onClick={() => {
                              setReloadCount(reloadCount + 1);

                              if (reloadCount >= 2) {
                                setReloadCount(0);

                                addPopup({
                                  Component: () => {
                                    return (
                                      <Popup className="bg-white">
                                        <h2 className="py-5 text-center font-bold text-[24px] leading-[28px] text-gray-800">Increase It!!!</h2>

                                        <img src="/images/nei.png" alt="NEI" className="rounded-3xl block mx-auto" />

                                        <button onClick={() => removeAll()} className="text-gray-800 text-center underline block w-full mt-3 text-3xl font-bold">
                                          Go to Incrase!!!
                                        </button>
                                      </Popup>
                                    );
                                  },
                                  removeCallback: () => {
                                    setCanMint(false);
                                    setMinting(false);
                                  },
                                });

                                return;
                              }
                              setSpin(true);
                              start();
                            }}
                            className="absolute top-[50%] right-[15px] translate-y-[-50%]"
                          >
                            {spin ? <SpinningIcon size={32} /> : <Reload size={32} />}
                          </button>
                        </div>
                      )}
                    </CountUp>
                  </div>
                </div>
              </div>
              <div className="mt-12 pl-4">
                <span className="italic">(0.5 DYM per increase, one dynamic NFT)</span>
              </div>
              <div className="mt-16">
                <div className="flex">
                  <div className="text-left px-6 border-r-[rgba(255, 255, 255, 0.70)] border-r-[2px]">
                    <div className="text-4xl font-bold mb-1">{totalUsers}</div>
                    <div className="text-[#acacac]">Total User</div>
                  </div>
                  <div className="text-left px-6">
                    <div className="text-4xl font-bold mb-1">{Math.round(totalSupply / (totalUsers || 1))}</div>
                    <div className="text-[#acacac]">Number/User</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 mt-12 lg:mt-0 text-center">
            <div className="nei">
              {/* <img src="/images/nei.png" alt="NEI" className="rounded-3xl block mx-auto" /> */}
              <img src="/images/meme/dym-is-money.jpg" alt="NEI" className="rounded-3xl block mx-auto" />
              <div className="nei-bg1" />
              <div className="nei-bg2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
