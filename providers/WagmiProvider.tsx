import React from 'react';
import { WagmiConfig } from 'wagmi';
import { wagmiClient } from 'web3/wagmi';

interface Props {
  children: React.ReactNode;
}

const WagmiProvider = ({ children }: Props): JSX.Element => {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
};

export default WagmiProvider;
