import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { infuraProvider } from 'wagmi/providers/infura';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { configureChains, createClient } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
const chainEnv = process.env.NEXT_PUBLIC_CHAIN;

if (!projectId || !infuraKey || !chainEnv || !alchemyKey) {
  throw new Error('Missing env variables');
}

const chain = chainEnv === 'goerli' ? goerli : mainnet;

const { chains, provider, webSocketProvider } = configureChains(
  [chain],
  [
    w3mProvider({ projectId }),
    infuraProvider({ apiKey: infuraKey, stallTimeout: 1_000, priority: 1 }),
    alchemyProvider({ apiKey: alchemyKey, stallTimeout: 1_000 }),
    publicProvider(),
  ],
);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    version: 1,
    chains,
  }),
  provider,
  webSocketProvider,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);
