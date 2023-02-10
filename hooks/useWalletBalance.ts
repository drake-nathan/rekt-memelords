import { useWeb3React } from '@web3-react/core';
import { useWeb3 } from 'hooks/useWeb3';
import { useEffect, useState } from 'react';

export const useWalletBalance = (): {
  walletBalance: string | null;
  reFetchWalletBalance: () => void;
} => {
  const web3 = useWeb3();
  const { active, account } = useWeb3React();

  const [walletBalance, setWalletBalance] = useState<string | null>(null);

  const fetchWalletBalance = (wallet: string) => {
    web3.eth
      .getBalance(wallet)
      .then((balance) => {
        setWalletBalance(web3.utils.fromWei(balance, 'ether'));
      })
      .catch(console.error);
  };

  const reFetchWalletBalance = () => {
    if (account) {
      fetchWalletBalance(account);
    }
  };

  useEffect(() => {
    if (active && account) {
      fetchWalletBalance(account);
    }
  }, [active, account]);

  return { walletBalance, reFetchWalletBalance };
};
