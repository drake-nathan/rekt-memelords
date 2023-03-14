import { useState } from 'react';
import { useStoreFrontIsMintOpen } from 'web3/generated';

export const useMintDetails = () => {
  const mintStart = new Date('2023-02-09T13:00:00-0600');
  const discountMintPeriod = 1; // days
  // Public start 11/18
  const publicStart = new Date(
    mintStart.getTime() + discountMintPeriod * 24 * 60 * 60 * 1000,
  );
  const mintEnd = new Date('2023-02-14T13:23:59-0300');

  const mintPrice = 0.069;
  const discountPrice = 0.042;
  const maxSupply = 420;
  const maxPublicMint = 3;
  const maxDiscountMint = 10;

  const [currentSupply, setCurrentSupply] = useState<number>(100);

  const { data: isMintOpen } = useStoreFrontIsMintOpen();

  return {
    isMintOpen,
    mintStart,
    mintEnd,
    mintPrice,
    publicStart,
    discountPrice,
    maxSupply,
    currentSupply,
    maxPublicMint,
    maxDiscountMint,
  };
};
