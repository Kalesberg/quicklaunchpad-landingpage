"use client";

import { MainContext } from "context";
import { useState } from "react";
import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import {
  mainnet,
  arbitrum,
  avalanche,
  base,
  optimism,
  polygon,
  polygonAmoy,
} from "@reown/appkit/networks";
import { Provider } from "react-redux";
import store from "../reduxStore/store";

enum ChainId {
  MUMBAI = 80001,
  POL = 80002,
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
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";

// 2. Create a metadata object
const metadata = {
  name: "quicklaunch",
  description: "QuickSwap Launchpad",
  url: "https://quicklaunchpad-landingpage.vercel.app", // origin must match your domain & subdomain
  icons: [
    "https://beta.quickswap.exchange/static/media/quickIcon.aa0f5ef593b1a9f00bab835581e318f3.svg",
  ],
};

// 3. Create the AppKit instance
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata,
  networks: [
    mainnet,
    arbitrum,
    avalanche,
    base,
    optimism,
    polygon,
    polygonAmoy,
  ],
  projectId,
});

const MainProvider = ({ children }: any) => {
  const [chainId, setChainId] = useState(ChainId.MATIC);

  return (
    <MainContext.Provider value={{ chainId, setChainId }}>
      <Provider store={store}>{children}</Provider>
    </MainContext.Provider>
  );
};

export default MainProvider;
