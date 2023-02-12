import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { connectors } from 'web3/connectors';
import { switchChain } from 'components/Mint/helpers/mintFunctions';
import { useChain } from './useChain';

export const useEagerConnect = () => {
  const { chainId } = useChain();
  const { activate, active } = useWeb3React();
  const { '0': injected } = connectors;
  const [tried, setTried] = useState(false);

  useEffect(() => {
    // switch metamask to correct network
    switchChain(chainId);

    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch((error) => {
          setTried(true);
          console.error(error);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};
