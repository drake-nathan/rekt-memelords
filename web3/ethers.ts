import { Contract, providers } from 'ethers';
import { storeFrontABI, storeFrontAddress } from './generated';

const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
const chainEnv = process.env.NEXT_PUBLIC_CHAIN;

if (!infuraKey || !chainEnv) {
  throw new Error('Missing env variables');
}

const chainId = chainEnv === 'goerli' ? 5 : 1;
const address = storeFrontAddress[chainId];

export const provider = new providers.InfuraProvider(chainEnv, infuraKey);

export const storeFrontContract = new Contract(
  address,
  storeFrontABI,
  provider,
);

export const claimed = async (tokenId: number): Promise<boolean> =>
  await storeFrontContract.claimed(tokenId);
