// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

const apiURL = import.meta.env.VITE_API_URL! as string;
const alchemyId = import.meta.env.VITE_ALCHEMY_ID! as string;
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS! as `0x${string}`;
const dymAddress = import.meta.env.VITE_DYM_ADDRESS! as `0x${string}`;
const isStaging = (import.meta.env.VITE_STAGE! as string) === "staging";

import ercAbi from "../abi/ERC20.json";
import contractAbi from "../abi/NEI.json";

const config = {
  apiURL,
  alchemyId,
  contractAddress,
  dymAddress,
  contractAbi: contractAbi as any,
  ercAbi: ercAbi as any,
  isStaging,
};

export default config;
