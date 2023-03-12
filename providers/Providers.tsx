import React from 'react';
import ThemeProvider from './ThemeProvider';
import WagmiProvider from './WagmiProvider';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props): JSX.Element => {
  return (
    <WagmiProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </WagmiProvider>
  );
};

export default Providers;
