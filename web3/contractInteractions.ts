import { Contract } from 'web3-eth-contract';
import { toWei } from 'web3-utils';
import { MintPhase } from './types';

export const fetchMintPhase = async (
  contract: Contract,
): Promise<MintPhase> => {
  const currentPhase = (await await contract.methods
    .currentPhase()
    .call()) as string;

  return Number(currentPhase) as MintPhase;
};

export const fetchCurrentSupply = async (
  contract: Contract,
): Promise<number> => {
  return (await contract.methods.totalSupply().call()) as number;
};

export const checkIfUserHasClaimedDiscount = async (
  contract: Contract,
  account: string,
): Promise<boolean> => {
  return (await contract.methods.claimed(account).call()) as boolean;
};

export const checkTokensMintedByWallet = async (
  contract: Contract,
  account: string,
): Promise<number> => {
  return (await contract.methods.mintedPerWallet(account).call()) as number;
};

export const callDiscountMint = async (
  contract: Contract,
  account: string,
  payableAmount: number,
  numberOfTokens: number,
  merkleProof: string[],
) => {
  return await contract.methods
    .discountMint(numberOfTokens, merkleProof)
    .send({ from: account, value: toWei(payableAmount.toString(), 'ether') });
};

export const callPublicMint = async (
  contract: Contract,
  account: string,
  payableAmount: number,
  numberOfTokens: number,
) => {
  return await contract.methods
    .publicMint(numberOfTokens)
    .send({ from: account, value: toWei(payableAmount.toString(), 'ether') });
};
