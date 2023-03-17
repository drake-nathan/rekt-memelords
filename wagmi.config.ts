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
        address: {
          1: '0x0b820E51631389C92e9aB12126a0434c04dBe02e',
          5: '0xC3D6C236Dfe7922C94a56dEdf7E2e6f1DEc349c3',
        },
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
              1: '0x51AEe8Cb4512FF12551e0A598B8f45eb610550bE',
              5: '0x35f7C5D0e916B9650DA1e47006FEf59cdCD4B452',
            },
          },
        ],
      }),
    ],
  };
});
