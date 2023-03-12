import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { configureChains, createClient } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
const chainEnv = process.env.NEXT_PUBLIC_CHAIN;

if (!projectId || !infuraKey || !chainEnv) {
  throw new Error('Missing env variables');
}

const chain = chainEnv === 'goerli' ? goerli : mainnet;

const { provider } = configureChains(
  [chain],
  [
    w3mProvider({ projectId }),
    infuraProvider({ apiKey: infuraKey, weight: 1 }),
    publicProvider({ weight: 1 }),
  ],
);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    version: 2,
    chains: [chain],
  }),
  provider,
});

export const ethereumClient = new EthereumClient(wagmiClient, [chain]);
