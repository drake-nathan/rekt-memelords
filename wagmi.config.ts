import { defineConfig, loadEnv } from '@wagmi/cli';
import { etherscan, react } from '@wagmi/cli/plugins';

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  });

  return {
    out: 'web3/generated.ts',
    plugins: [
      react(),
      etherscan({
        apiKey: env.ETHERSCAN_API_KEY,
        chainId: env.NEXT_PUBLIC_CHAIN === 'goerli' ? 5 : 1,
        contracts: [
          {
            name: 'MLD',
            address: {
              1: '0x924F2a4D3e93cC595792292C84A41Ad3AEd70E95',
              5: '0xe0c8D341bF2024F8f331aE1c78E66aE823D85f01',
            },
          },
          {
            name: 'Edition',
            address: {
              1: '0x5c0a5c9e5e0c0c9e5e0c0c9e5e0c0c9e5e0c0c9e',
              5: '0x6c5f093c84bf139adAc4f126D88A57478285972a',
            },
          },
          {
            name: 'StoreFront',
            address: {
              1: '0x5c0a5c9e5e0c0c9e5e0c0c9e5e0c0c9e5e0c0c9e',
              5: '0x3E095dF4C3EEa452cf1cE373eA56fF0202a0A54f',
            },
          },
        ],
      }),
    ],
  };
});
