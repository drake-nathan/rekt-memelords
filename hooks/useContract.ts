import { type AbiItem } from 'web3-utils';
import Abi from 'web3/abi/MemelordDistrict.abi.json';
import { useWeb3 } from './useWeb3';
import { useChain } from './useChain';
import { Chain } from 'web3/types';

export const useContract = () => {
  const { chainId } = useChain();
  const web3 = useWeb3();

  const contractAddress = {
    [Chain.mainnet]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    [Chain.goerli]: '0x8B22A420b0dF9264AdcbFD214711989f4e42DE91',
  };

  const abi = {
    [Chain.mainnet]: Abi as AbiItem[],
    [Chain.goerli]: Abi as AbiItem[],
  };

  const contract = new web3.eth.Contract(
    abi[chainId],
    contractAddress[chainId].toLowerCase(),
  );

  return {
    address: contractAddress,
    contract,
  };
};
