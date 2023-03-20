import { useEffect, useState } from 'react';
import { DelegateCash } from 'delegatecash';
import { useQuery } from '@tanstack/react-query';
import { useChainId } from 'wagmi';
import { storeFrontAddress } from 'web3/generated';
import { fetchUserMldTokens } from 'services/azure';

export interface Delegate {
  delegate: `0x${string}`;
  vault: `0x${string}`;
  tokenIds: number[];
}

export const useDelegateCash = (connectedAccount: `0x${string}`) => {
  const chainId = useChainId() as 1 | 5;
  const storefrontAddress = storeFrontAddress[chainId];
  const dc = new DelegateCash();

  const fetchDelegations = () => dc.getDelegationsByDelegate(connectedAccount);

  const ownersQuery = useQuery({
    queryKey: ['allOwners'],
    queryFn: () => fetchUserMldTokens(chainId),
  });

  const delegationsQuery = useQuery({
    queryKey: ['delegations'],
    queryFn: fetchDelegations,
  });

  const [delegate, setDelegate] = useState<Delegate>();

  const parseDelegates = () => {
    if (
      ownersQuery.data &&
      delegationsQuery.data &&
      delegationsQuery.data.length
    ) {
      const owners = ownersQuery.data.map((owner) =>
        owner.ownerAddress.toLowerCase(),
      );
      const tokenIds: number[] = [];

      delegationsQuery.data.forEach((delegation) => {
        const { type, vault, contract } = delegation;
        const isOwner = owners.includes(vault.toLowerCase());

        if (!isOwner) {
          console.log('not owner', vault, owners);
          return;
        } else if (
          type === 'ALL' ||
          (type === 'CONTRACT' &&
            contract.toLowerCase() === storefrontAddress.toLowerCase())
        ) {
          setDelegate({
            delegate: connectedAccount,
            vault: vault as `0x${string}`,
            tokenIds,
          });
        } else if (type === 'CONTRACT') {
          setDelegate({
            delegate: connectedAccount,
            vault: vault as `0x${string}`,
            tokenIds,
          });
        } else if (type === 'TOKEN') {
          tokenIds.push(delegation.tokenId);
        }
      });

      if (tokenIds.length) {
        setDelegate({
          delegate: connectedAccount,
          vault: connectedAccount,
          tokenIds,
        });
      }
    }
  };

  useEffect(() => {
    if (delegationsQuery.error) {
      console.error('Error fetching delegations', delegationsQuery.error);
    } else if (
      delegationsQuery.data &&
      delegationsQuery.data.length &&
      ownersQuery.data
    ) {
      console.log('delegations', delegationsQuery.data);
      parseDelegates();
    }
  }, [delegationsQuery.error, delegationsQuery.data, ownersQuery.data]);

  return { delegate };
};
