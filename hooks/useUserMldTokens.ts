import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchUserMldTokens } from 'services/azure';
import { useNetwork } from 'wagmi';
import { claimed } from 'web3/ethers';

export const useUserMldTokens = (address: string) => {
  const { chain } = useNetwork();

  const query = useQuery({
    queryKey: ['mldToken'],
    queryFn: () => fetchUserMldTokens(chain?.id ?? 1, address),
  });

  const [userMldTokens, setUserMldTokens] = useState<number[]>();

  useEffect(() => {
    if (query.error) {
      console.error('Error fetching user MLD tokens', query.error);
    }
  }, [query]);

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

      setUserMldTokens(unclaimedTokens);
    }
  };

  useEffect(() => {
    if (query.data) {
      checkIfTokensClaimed();
    }
  }, [query.data, query.refetch]);

  return { ...query, userMldTokens, setUserMldTokens, checkIfTokensClaimed };
};
