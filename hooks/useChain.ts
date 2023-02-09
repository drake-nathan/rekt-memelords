import { useEffect } from 'react';
import { Chain } from 'web3/types';

export const useChain = () => {
  const envChain = process.env.NEXT_PUBLIC_CHAIN;

  if (!envChain) {
    throw new Error('NEXT_PUBLIC_CHAIN is not defined');
  }

  const chainId = envChain === 'goerli' ? Chain.goerli : Chain.mainnet;

  const rpc = {
    [Chain.mainnet]: process.env.NEXT_PUBLIC_RPC_URL_1 as string,
    [Chain.goerli]: process.env.NEXT_PUBLIC_RPC_URL_5 as string,
  };

  return {
    chainId,
    rpc: rpc[chainId],
  };
};
