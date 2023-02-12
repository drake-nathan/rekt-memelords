import React from 'react';
import { WagmiConfig } from 'wagmi';
import { wagmiClient } from 'web3/wagmi';

interface Props {
  children: React.ReactNode;
}

const Web3Provider: React.FC<Props> = ({ children }) => {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
};

export default Web3Provider;
