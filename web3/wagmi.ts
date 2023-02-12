import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { configureChains, createClient } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;

if (!projectId || !infuraKey) {
  throw new Error('Missing env variables');
}

const chains = [mainnet, goerli];

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
  infuraProvider({ apiKey: infuraKey, weight: 1 }),
  publicProvider({ weight: 1 }),
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId,
    version: '2',
    appName: 'web3Modal',
    chains,
  }),
  provider,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);
