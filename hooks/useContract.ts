import { type AbiItem } from 'web3-utils';
import GoerliAbi from 'web3/abi/MemelordDistrict.goerli.json';
import MainnetAbi from 'web3/abi/MemeLordDistrict.mainnet.json';
import { useWeb3 } from './useWeb3';
import { useChain } from './useChain';
import { Chain } from 'web3/types';

export const useContract = () => {
  const { chainId } = useChain();
  const web3 = useWeb3();

  const contractAddress = {
    [Chain.mainnet]: '0x924F2a4D3e93cC595792292C84A41Ad3AEd70E95',
    [Chain.goerli]: '0xe0c8D341bF2024F8f331aE1c78E66aE823D85f01',
  };

  const abi = {
    [Chain.mainnet]: MainnetAbi as AbiItem[],
    [Chain.goerli]: GoerliAbi as AbiItem[],
  };

  const contract = new web3.eth.Contract(
    abi[chainId],
    contractAddress[chainId].toLowerCase(),
  );

  return {
    address: contractAddress[chainId].toLowerCase(),
    contract,
  };
};
