import React from 'react';
import ThemeProvider from './ThemeProvider';
import WagmiProvider from './WagmiProvider';
import ReactQueryProvider from './ReactQueryProvider';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props): JSX.Element => {
  return (
    <WagmiProvider>
      <ThemeProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </ThemeProvider>
    </WagmiProvider>
  );
};

export default Providers;
