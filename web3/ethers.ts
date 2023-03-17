import { Contract, providers } from 'ethers';
import { storeFrontABI } from './generated';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
const chainEnv = process.env.NEXT_PUBLIC_CHAIN;

if (!projectId || !infuraKey || !chainEnv || !alchemyKey) {
  throw new Error('Missing env variables');
}

export const provider = new providers.InfuraProvider(chainEnv, infuraKey);

export const storeFrontContract = new Contract(
  '0x77D0b5F67A5328E3dAc6D6A06b65Eb8Ba17d20e9',
  storeFrontABI,
  provider,
);

export const claimed = async (tokenId: number) =>
  await storeFrontContract.claimed(tokenId);
