import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchUserMldTokens } from 'services/azure';
import { useNetwork } from 'wagmi';

export const useUserMldTokens = (address: string) => {
  const { chain } = useNetwork();

  const query = useQuery({
    queryKey: ['mldToken'],
    queryFn: () => fetchUserMldTokens(chain?.id ?? 1, address),
  });

  useEffect(() => {
    if (query.error) {
      console.error('Error fetching user MLD tokens', query.error);
    }
  }, [query]);

  return query;
};
