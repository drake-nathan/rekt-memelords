import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { fetchUserMldTokens } from 'services/azure';
import { useNetwork } from 'wagmi';
import { claimed } from 'web3/ethers';
import { Delegate } from './useDelegateCash';

export const useUserMldTokens = (
  connectedAccount: `0x${string}`,
  delegate?: Delegate,
) => {
  const { chain } = useNetwork();

  const triedVault = useRef(false);
  const [usingVault, setUsingVault] = useState(false);
  const [account, setAccount] = useState<`0x${string}`>(connectedAccount);
  const [userMldTokens, setUserMldTokens] = useState<number[]>();

  const query = useQuery({
    queryKey: ['mldToken'],
    queryFn: () => fetchUserMldTokens(chain?.id ?? 1, account),
  });

  const checkIfTokensClaimed = async () => {
    if (query.data) {
      const claimedTokens = await Promise.all(
        query.data.map(async (token) => {
          const { tokenId } = token;
          const isClaimed = await claimed(tokenId);
          return { tokenId, isClaimed };
        }),
      );

      const unclaimedTokens = claimedTokens
        .filter((token) => !token.isClaimed)
        .map((token) => token.tokenId)
        .sort((a, b) => a - b);

      if (delegate?.tokenIds.length) {
        const approvedTokens = delegate.tokenIds.filter((tokenId) =>
          unclaimedTokens.includes(tokenId),
        );

        if (approvedTokens.length) {
          setUserMldTokens(approvedTokens);
          return;
        }
      }

      setUserMldTokens(unclaimedTokens);
    }
  };

  useEffect(() => {
    console.log({
      usingVault,
      delegate,
      triedVault: triedVault.current,
      userMldTokens,
    });

    if (account === delegate?.vault) {
      setUsingVault(true);
    }

    if (delegate?.vault && !triedVault.current) {
      setAccount(delegate.vault);
      query.refetch();
      triedVault.current = true;
    }

    if (query.error) {
      console.error('Error fetching user MLD tokens', query.error);
    }

    if (query.data && query.data.length) {
      checkIfTokensClaimed();
    }

    if (query.data && !query.data.length && usingVault) {
      setAccount(connectedAccount);
      query.refetch();
    }
  }, [query.error, query.data, delegate]);

  return {
    ...query,
    userMldTokens,
    setUserMldTokens,
    checkIfTokensClaimed,
    usingVault,
  };
};
