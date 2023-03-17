import { MintPhase } from 'web3/types';

export const isMintClosed = (mintPhase: MintPhase): boolean => {
  return mintPhase === MintPhase.closed;
};
