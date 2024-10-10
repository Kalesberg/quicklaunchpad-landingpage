"use client";

import { ChainId } from "@uniswap/sdk";
import { MainContext } from "context";
import { useState } from "react";

const MainProvider = ({ children }: any) => {
  const [chainId, setChainId] = useState(ChainId.MATIC);

  return (
    <MainContext.Provider value={{ chainId, setChainId }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
