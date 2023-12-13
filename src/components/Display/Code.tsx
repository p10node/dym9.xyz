// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import { Copy as CopyIcon } from "@styled-icons/fluentui-system-regular";
import React, { PropsWithChildren } from "react";
import Copy from "../Copy/Copy";

const Code: React.FC<PropsWithChildren<{ copy?: string }>> = ({ children, copy }) => {
  return (
    <Copy content={copy || ""}>
      <div className="rounded-lg px-2 cursor-pointer code inline-flex gap-3">
        {children}
        <CopyIcon size={20} className="pt-[4px]" />
      </div>
    </Copy>
  );
};

export default Code;
