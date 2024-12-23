
import { getToken, setToken } from "app/service/tokenService";
import { getAuthCode, getUser, logIn } from "app/api";
import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';

export const signInWithWallet = async (address: string, chainId: number) => {
    if (!address) {
        return
    }
    let token = getToken()
    if (!token) {
        const nonce = await getAuthCode();
        const provider = new ethers.providers.Web3Provider(window.ethereum || {});
        const signer = provider.getSigner();
        const message = new SiweMessage({
            domain: window.location.host,
            address: ethers.utils.getAddress(address),
            statement:
            'Please sign this message via your web3 wallet to connect to SparkDEX Launchpad Dashboard.',
            uri: window.location.origin,
            version: '1',
            chainId: chainId as number,
            nonce,
        })
        const siweMsg = message.prepareMessage()
        const signature = await signer.signMessage(siweMsg);
        token = await logIn(message, signature);
    }
    if (token) {
        setToken(token)
        return getUser();
    }
    return null
  
}