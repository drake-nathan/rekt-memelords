import { useState, useEffect } from 'react';
import { fetchCurrentSupply, fetchMintPhase } from 'web3/contractInteractions';
import { useContract } from './useContract';
import { MintPhase } from 'web3/types';

export const useMintDetails = () => {
  const { contract } = useContract();

  const currentTime = new Date();
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

  const [mintPhase, setMintPhase] = useState<MintPhase>(MintPhase.closed);
  const [currentSupply, setCurrentSupply] = useState<number>();

  useEffect(() => {
    fetchMintPhase(contract)
      .then((mintPhase) => {
        if (mintPhase) {
          setMintPhase(mintPhase);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    try {
      fetchCurrentSupply(contract).then((supply) => {
        if (supply) {
          setCurrentSupply(supply);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [currentSupply]);

  return {
    mintPhase,
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
