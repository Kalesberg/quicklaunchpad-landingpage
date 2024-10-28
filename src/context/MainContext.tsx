"use client";

import { MainContext } from "context";
import { useState } from "react";

enum ChainId {
  MUMBAI = 80001,
  MATIC = 137,
  DOEGCHAIN_TESTNET = 568,
  DOGECHAIN = 2000,
  ZKTESTNET = 1442,
  ZKEVM = 1101,
  KAVA = 2222,
  MANTA = 169,
  ZKATANA = 1261120,
  BTTC = 199,
  X1 = 195,
  TIMX = 13473,
  IMX = 13371,
  ASTARZKEVM = 3776,
  LAYERX = 196,
}

const MainProvider = ({ children }: any) => {
  const [chainId, setChainId] = useState(ChainId.MATIC);

  return (
    <MainContext.Provider value={{ chainId, setChainId }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
