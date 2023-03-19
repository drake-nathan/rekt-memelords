import { useEffect, useState } from 'react';
import { DelegateCash } from 'delegatecash';
import { useQuery } from '@tanstack/react-query';

export const useDelegateCash = (connectedAccount: string) => {
  const dc = new DelegateCash();

  const fetchDelegations = () => dc.getDelegationsByDelegate(connectedAccount);

  const query = useQuery({
    queryKey: ['delegations'],
    queryFn: fetchDelegations,
  });

  useEffect(() => {
    if (query.error) {
      console.error('Error fetching delegations', query.error);
    }
  }, [query]);

  return query;
};
