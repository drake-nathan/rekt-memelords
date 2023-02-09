import { type AbiItem } from 'web3-utils';
import Abi from 'web3/abi/MemelordDistrict.abi.json';
import { useWeb3 } from './useWeb3';
import { useChain } from './useChain';
import { Chain } from 'web3/types';
import { useEffect } from 'react';

export const useContract = () => {
  const { chainId } = useChain();
  const web3 = useWeb3();

  const contractAddress = {
    [Chain.mainnet]: 'balls',
    [Chain.goerli]: '0x36147093736b0162EAa834E26110B712DF0c0Da6',
  };

  const abi = {
    [Chain.mainnet]: Abi as AbiItem[],
    [Chain.goerli]: Abi as AbiItem[],
  };

  const contract = new web3.eth.Contract(
    abi[chainId],
    contractAddress[chainId].toLowerCase(),
  );

  useEffect(() => {
    console.info('contract', contractAddress[chainId].toLowerCase());
  }, [chainId]);

  return {
    address: contractAddress[chainId].toLowerCase(),
    contract,
  };
};
