"use client";

import { MainContext } from "context";
import { useState } from "react";
import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { mainnet, arbitrum, avalanche, base, optimism, polygon } from '@reown/appkit/networks'

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

// 1. Get projectId at https://cloud.reown.com
const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "5e99152ab0dd533988ccf9b0b15dac25";

// 2. Create a metadata object
const metadata = {
  name: "quicklaunch",
  description: "QuickSwap Launchpad",
  url: "https://reown.com/appkit", // origin must match your domain & subdomain
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// 3. Create the AppKit instance
const modal = createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata,
  networks: [mainnet, arbitrum, avalanche, base, optimism, polygon],
  projectId,
});

const MainProvider = ({ children }: any) => {
  const [chainId, setChainId] = useState(ChainId.MATIC);

  return (
    <MainContext.Provider value={{ chainId, setChainId, modal }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
