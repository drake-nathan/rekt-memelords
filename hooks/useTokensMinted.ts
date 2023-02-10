import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { checkTokensMintedByWallet } from 'web3/contractInteractions';
import { useContract } from './useContract';

export const useTokensMinted = (): {
  tokensMinted: number;
  reFetchTokensMinted: () => void;
} => {
  const { contract } = useContract();
  const { active, account } = useWeb3React();

  const [tokensMinted, setTokensMinted] = useState<number>(0);

  const fetchTokensMinted = (wallet: string) => {
    checkTokensMintedByWallet(contract, wallet)
      .then((res) => {
        if (res) {
          setTokensMinted(res);
        }
      })
      .catch(console.error);
  };

  const reFetchTokensMinted = () => {
    if (account) {
      fetchTokensMinted(account);
    }
  };

  useEffect(() => {
    if (active && account) {
      fetchTokensMinted(account);
    }
  }, [active, account]);

  return { tokensMinted, reFetchTokensMinted };
};
