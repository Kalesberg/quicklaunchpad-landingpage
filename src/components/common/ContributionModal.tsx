"use client";

import {
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "./Button";
import { CheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Project } from "state/type";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { Contract, ethers, utils } from "ethers";

import { usdtAbi } from "config/contract";
import { contributeToProject } from "app/api";

interface Network {
  id: string;
  name: string;
  icon: string;
}

interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: number;
}

interface ContributionModalProps {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
  project: Project;
}

const ContributionModal: React.FC<ContributionModalProps> = ({
  openModal,
  setOpenModal,
  project,
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("polygon");
  const [tokens, setTokens] = useState<any>([]);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [txHash, setTxHash] = useState<string>("polygon");

  const networks: Network[] = [
    {
      id: project.network?.chainId,
      name: project.network?.networkName,
      icon: project.network?.nativeCurrencyImage,
    },
    // { id: "bsc", name: "BSC", icon: "/assets/images/bsc.png" },
    // { id: "ethereum", name: "Ethereum", icon: "/assets/images/ethereum.png" },
  ];

  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!project) {
      return;
    }
    const tokens = project.fundingTokens.map((token) => {
      const symbol = token.name === "USDT" ? "Tether" : "USDCoin";
      const icon =
        token.name === "USDT"
          ? "/assets/images/usdt.png"
          : "/assets/images/usdc.png";
      return {
        ...token,
        symbol,
        icon,
        balance: project.maxUserPledgeSize,
      };
    });
    setTokens(tokens);
    setSelectedToken(tokens[0]);
  }, []);

  const handleModal = () => {
    setConfirm(false);
    setOpenModal(!openModal);
  };
  const { walletProvider } = useAppKitProvider("eip155");

  const handleSubmit = async () => {
    try {
      setTxHash("");
      setError("");
      if (!selectedToken) {
        setError("Please choose a funding token.");
        return;
      }
      const ethersProvider = new ethers.providers.Web3Provider(
        walletProvider as any,
      );
      const signer = await ethersProvider.getSigner();

      if (!signer) {
        setError("Unable to fetch signer. Please connect your wallet.");
        return;
      }
      const address = await signer.getAddress();
      const USDTContract = new Contract(selectedToken.address, usdtAbi, signer);
      const USDTBalance = await USDTContract.balanceOf(address);
      const balance = parseInt(USDTBalance);
      if (balance < project.maxUserPledgeSize) {
        setError(
          "Insufficient balance. Top up your wallet or try another network.",
        );
        return;
      }
      setLoading(true);
      const amountInUnits = ethers.utils.parseUnits(
        project.maxUserPledgeSize.toString(),
        selectedToken.decimals,
      );
      // Send the transaction
      const tx = await USDTContract.transfer(
        project.depositWallet,
        amountInUnits,
      );

      console.log("Transaction sent. Hash:", tx.hash);
      setTxHash(tx.hash);
      await tx.wait();
      const res = await contributeToProject({
        pid: project.pid,
        eoa: address,
        amount: project.maxUserPledgeSize.toString(),
        tx_hash: tx.hash,
        chain_id: project.chainId,
        token: {
          address: selectedToken.address,
          chainId: selectedToken.chainId,
          decimals: selectedToken.decimals,
          name: selectedToken.name,
        },
        tx_timestamp: Date.now() / 1000,
      });
      if (!res) {
        throw Error("failed to calling the contribution API");
      }
      if (res) {
        setLoading(false);
        setConfirm(true);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError("Something went wrong! Please try again.");
    }
  };

  return (
    openModal && (
      <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#1b1e298c] flex justify-center items-center">
        {loading ? (
          <div className="min-w-[520px] bg-[#1B1E29] shadow-sm shadow-slate-800 p-6 rounded-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#EBECF2] text-xl font-semibold">
                Contribute {project.maxUserPledgeSize} {selectedToken.name}
              </h2>
            </div>
            <div className="max-w-[520px] min-h-80 flex flex-col justify-center items-center gap-6">
              <div className="loader mb-6"></div>
              <p className="text-[#EBECF2] font-semibold leading-6">
                Contribution underway, please wait...
              </p>
              <Link
                href="#"
                className="flex items-center gap-2 text-[#448AFF] text-[15px] font-bold leading-6 hover:underline"
              >
                Back to Launchpad{" "}
                <ArrowTopRightOnSquareIcon width={24} height={24} />{" "}
              </Link>
            </div>
          </div>
        ) : (
          <>
            {confirm ? (
              <div className="min-w-[520px] bg-[#1B1E29] shadow-sm shadow-slate-800 p-6 rounded-2xl">
                <div className="flex justify-end mb-6">
                  <XMarkIcon
                    className="w-[18px] h-[18px] text-[#919EAB] cursor-pointer"
                    onClick={handleModal}
                  />
                </div>
                <div className="max-w-[520px] min-h-80 flex flex-col justify-center items-center gap-4">
                  <Image
                    src="/assets/images/contribute-success.png"
                    alt="contribute success"
                    width={179}
                    height={126}
                  />
                  <p className="text-[#EBECF2] text-lg font-bold leading-7">
                    {project.maxUserPledgeSize} {selectedToken.name} has been
                    contributed successfully!
                  </p>
                  <Link
                    href={`${project.network.blockExplorer}/tx/${txHash}`}
                    target="_blank"
                    className="flex items-center gap-2 text-[#448AFF] text-[15px] font-bold leading-6 hover:underline"
                  >
                    View on block explorer{" "}
                    <ArrowTopRightOnSquareIcon width={24} height={24} />{" "}
                  </Link>
                </div>
                <Button
                  variant="primary"
                  size="large"
                  className="w-full !text-[15px] font-bold capitalize leading-6 hover:!bg-blue-600"
                  onClick={handleModal}
                >
                  Got it!
                </Button>
              </div>
            ) : (
              <div className="min-w-[520px] bg-[#1B1E29] shadow-sm shadow-slate-800 p-6 rounded-2xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[#EBECF2] text-xl font-semibold">
                    Contribute
                  </h2>
                  <XMarkIcon
                    className="w-[18px] h-[18px] text-[#919EAB] cursor-pointer"
                    onClick={handleModal}
                  />
                </div>

                {/* Network Selection */}
                <div className="mb-6">
                  <label className="text-[#C7CAD9] text-xs font-semibold block mb-2">
                    Network
                  </label>
                  <div className="flex items-center justify-between gap-3">
                    {networks.map((network) => (
                      <button
                        key={network.id}
                        onClick={() => setSelectedNetwork(network.id)}
                        className={`min-w-36 flex items-center gap-2 text-[#EBECF2] text-sm font-bold leading-6 px-3 py-1 rounded-lg ${
                          selectedNetwork === network.id
                            ? "bg-[#448AFF1F] border border-[#448AFF]"
                            : "bg-[#919EAB14]"
                        }`}
                      >
                        <Image
                          src={network.icon}
                          alt={network.name}
                          width={20}
                          height={20}
                        />
                        <span>{network.name}</span>
                        {selectedNetwork === network.id && (
                          <CheckIcon width={20} height={20} color="#448AFF" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Token Selection */}
                <div className="mb-6">
                  <label className="text-[#C7CAD9] text-xs font-semibold block mb-2">
                    Funding token
                  </label>
                  <div className="flex gap-2">
                    {tokens.map((token: any) => (
                      <button
                        key={token.symbol}
                        onClick={() => setSelectedToken(token)}
                        className={`flex items-center justify-between w-full px-4 py-2 rounded-lg ${
                          selectedToken && selectedToken.symbol === token.symbol
                            ? "bg-[#448AFF1F] border border-[#448AFF]"
                            : "bg-[#919EAB14]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={token.icon}
                            alt={token.name}
                            width={40}
                            height={40}
                          />
                          <div className="text-left">
                            <div className="text-[#EBECF2] text-sm leading-6 font-semibold">
                              {token.name}
                            </div>
                            <div className="text-[#EBECF2] text-xs leading-5 font-normal">
                              {token.symbol}
                            </div>
                          </div>
                        </div>
                        <div className="text-[#EBECF2] text-xs leading-5 font-normal">
                          {token.balance.toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="bg-[#412127] flex items-center gap-2 p-2 rounded-lg mb-4">
                    <Image
                      src="/assets/images/ic-danger.png"
                      alt="danger icon"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <p className="text-[#FFD6D6] text-sm leading-5">{error}</p>
                  </div>
                )}

                <div className="h-[2px] bg-[#919EAB14] mb-6"></div>

                {/* Contribution Amount */}
                <div className="flex items-center justify-between mb-6">
                  <label className="text-[#C7CAD9] text-lg font-bold block mb-2">
                    Contribution amount:
                  </label>
                  <span className="text-[#C7CAD9] text-lg font-bold">
                    {project.maxUserPledgeSize} {selectedToken.name}
                  </span>
                </div>

                {/* Contribute Button */}
                <Button
                  variant="primary"
                  size="large"
                  className="w-full !text-[15px] font-bold capitalize leading-6 hover:!bg-blue-600"
                  onClick={handleSubmit}
                >
                  Contribute {project.maxUserPledgeSize} {selectedToken.name}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    )
  );
};

export default ContributionModal;
