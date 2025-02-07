import {
  getToken,
  removeToken,
  setAddress,
  setToken,
} from "app/service/tokenService";
import { getAuthCode, getUser, logIn } from "app/api";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

export const BLOCKPASS_CLIENTID = "visionvault_hackathon";

export const signInWithWallet = async (address: string, chainId: number) => {
  if (!address) {
    return;
  }
  setAddress(address);
  let token = getToken(address);
  if (!token) {
    await signInWithAuthcode(address, chainId);
    token = getToken(address);
  }
  let user = null;
  if (token) {
    user = await getUser();
    if (!user) {
      // if token is expired, it gets the token
      removeToken(address);
      await signInWithAuthcode(address, chainId);
      user = await getUser();
    }
  }
  return user;
};

const signInWithAuthcode = async (address: string, chainId: number) => {
  const nonce = await getAuthCode();
  const provider = new ethers.providers.Web3Provider(window.ethereum || {});
  const signer = provider.getSigner();
  const message = new SiweMessage({
    domain: window.location.host,
    address: ethers.utils.getAddress(address),
    statement:
      "Please sign this message via your web3 wallet to connect to SparkDEX Launchpad Dashboard.",
    uri: window.location.origin,
    version: "1",
    chainId: chainId as number,
    nonce,
  });
  const siweMsg = message.prepareMessage();
  const signature = await signer.signMessage(siweMsg);
  const token = await logIn(message, signature);
  setToken(address, token);
};
