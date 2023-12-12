// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import { Copy } from "@styled-icons/fluentui-system-regular";
import React, { PropsWithChildren } from "react";

const Code: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded-lg px-2 cursor-pointer code inline-flex gap-3">
      {children} <Copy size={20} className="pt-[4px]" />
    </div>
  );
};

export default Code;
