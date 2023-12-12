// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContractReads, useNetwork } from "wagmi";
import config from "../../config";

const Rewards: React.FC = () => {
  const { chain } = useNetwork();

  const { data, isFetched } = useContractReads({
    contracts: [
      { address: config.contractAddress, abi: config.contractAbi, functionName: "leaderboard", args: [0] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "leaderboard", args: [1] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "leaderboard", args: [2] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "leaderboard", args: [3] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "leaderboard", args: [4] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "leaderboard", args: [5] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "leaderboard", args: [6] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "leaderboard", args: [7] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "leaderboard", args: [8] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "leaderboard", args: [9] },
    ],
    watch: true,
    enabled: !chain?.unsupported,
  });

  let leaderboard = isFetched ? data?.filter((item) => item.status !== "failure").map((item) => ({ user: item.result as unknown as string, count: 0 })) || [] : [];

  const { data: canCount } = useQuery({
    queryKey: ["count", leaderboard],
    queryFn: async () => leaderboard.length === 10,
  });

  const { data: countData } = useContractReads({
    contracts: [
      { address: config.contractAddress, abi: config.contractAbi, functionName: "balanceOf", args: [leaderboard[0]?.user] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "balanceOf", args: [leaderboard[1]?.user] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "balanceOf", args: [leaderboard[2]?.user] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "balanceOf", args: [leaderboard[3]?.user] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "balanceOf", args: [leaderboard[4]?.user] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "balanceOf", args: [leaderboard[5]?.user] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "balanceOf", args: [leaderboard[6]?.user] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "balanceOf", args: [leaderboard[7]?.user] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "balanceOf", args: [leaderboard[8]?.user] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "balanceOf", args: [leaderboard[9]?.user] },
    ],
    watch: true,
    enabled: canCount && !chain?.unsupported,
  });

  leaderboard = leaderboard.map((item, i) => ({ user: item.user, count: (countData?.[i].result as unknown as number) || 0 }));

  const { data: totalData } = useContractReads({
    contracts: [{ address: config.contractAddress, abi: config.contractAbi, functionName: "totalSupply" }],
    watch: true,
  });
  const totalSupply = (Number(totalData?.[0].result) || 0) as number;
  const { data: topNumberData } = useContractReads({
    contracts: [
      { address: config.contractAddress, abi: config.contractAbi, functionName: "ownerOf", args: [totalSupply - 1] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "ownerOf", args: [totalSupply - 2] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "ownerOf", args: [totalSupply - 3] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "ownerOf", args: [totalSupply - 4] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "ownerOf", args: [totalSupply - 5] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "ownerOf", args: [totalSupply - 6] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "ownerOf", args: [totalSupply - 7] },
      { address: config.contractAddress, abi: config.contractAbi, functionName: "ownerOf", args: [totalSupply - 8] },
    ],
    watch: true,
    enabled: !!totalSupply,
  });

  return (
    <section id="rewards" className="relative z-10">
      <div className="container mx-auto pb-24 px-4">
        <h2 className="text-center text-5xl font-bold">Rewards</h2>

        <div className="card rounded-3xl px-6 lg:px-12 py-5 overflow-hidden mt-4 mb-24">
          <ol className="text-[24px]">
            <li>
              <div className="flex items-center gap-2">
                <img src="/images/eth.gif" alt="ETH" width={35} />
                <div>
                  <span className="font-bold">1000 USDT</span> for <span className="font-bold">the person</span> who reaches number <span className="font-bold">1,000,000</span>{" "}
                  (minted NFT that contains The NEI Number 1,000,000)
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <img src="/images/eth.gif" alt="ETH" width={35} />{" "}
                <div>
                  {" "}
                  <span className="font-bold">100 USDT</span> for <span className="font-bold">the person</span> who reaches number <span className="font-bold">55,000</span>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <img src="/images/eth.gif" alt="ETH" width={35} />{" "}
                <div>
                  <span className="font-bold">50 USDT</span> per <span className="font-bold">top 10</span> User Increase Time (Top of the most prominent average increase/address)
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <img src="/images/eth.gif" alt="ETH" width={35} />{" "}
                <div>
                  <span className="font-bold">10 USDT</span> for random 3 numbers at snapshot time
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <img src="/images/eth.gif" alt="ETH" width={35} />{" "}
                <div>The reward is only paid when The NEI Number reaches at least 1 million. So try your HARD and invite your friends!!!</div>
              </div>
            </li>
          </ol>

          <div className="italic mt-6">* Rewards will be distributed on the Dymension mainnet. The snapshot will be taken at TGE and will be sent by USDT on Dym.</div>
        </div>

        <h2 className="text-center text-5xl font-bold">Leaderboard</h2>
        {/* <div className=" mt-4 italic text-center">(data from TheGraph of DymNEI chain [pierreneter_20-1])</div> */}
        <div className="card rounded-3xl px-6 lg:px-12 overflow-hidden mt-4 py-12">
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-center text-3xl mb-2">User Increase Count</h3>
              <table className="w-full mt-6">
                <thead className="font-bold text-md">
                  <tr>
                    <th className="border-solid border-2 border-gray-500 py-1">Address</th>
                    <th className="border-solid border-2 border-gray-500 py-1">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((item, i) => (
                    <tr key={`${i}${item.user}`}>
                      <td className="px-5">{item.user}</td>
                      <td className="px-2 text-right">{item.count.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="font-bold text-center text-3xl mb-2">Top Claim User</h3>
              <table className="w-full mt-6">
                <thead className="font-bold text-md">
                  <tr>
                    <th className="border-solid border-2 border-gray-500 py-1">Address</th>
                    <th className="border-solid border-2 border-gray-500 py-1">Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="px-5">?</td>
                    <td className="text-center">1,000,000</td>
                  </tr>
                  <tr className="">
                    <td className="px-5">?</td>
                    <td className="text-center">55,000</td>
                  </tr>
                  {(topNumberData || []).map((data, i) => (
                    <tr className="" key={i}>
                      <td className="px-5">{data.result}</td>
                      <td className="text-center">{totalSupply - i}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
