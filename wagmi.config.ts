import { defineConfig, loadEnv } from '@wagmi/cli';
import { etherscan, react } from '@wagmi/cli/plugins';
import TokenAbi from './web3/abi/Token.json';

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  });

  return {
    out: 'web3/generated.ts',
    contracts: [
      {
        name: 'Token',
        abi: TokenAbi as any,
        address: '0x5FfDA088d6fB725e359c91100dbb68a134256Bc0',
      },
    ],
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
            name: 'StoreFront',
            address: {
              1: '0x5c0a5c9e5e0c0c9e5e0c0c9e5e0c0c9e5e0c0c9e',
              5: '0x77D0b5F67A5328E3dAc6D6A06b65Eb8Ba17d20e9',
            },
          },
        ],
      }),
    ],
  };
});
