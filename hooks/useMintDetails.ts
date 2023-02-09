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
  const maxPublicMint = 5;
  const maxDiscountMint = 10;

  const [isPublicMintLive, setIsMintLive] = useState(false);
  const [isDiscountMintLive, setIsDiscountMint] = useState(false);
  const [currentSupply, setCurrentSupply] = useState<number>();

  useEffect(() => {
    fetchMintPhase(contract)
      .then((mintPhase) => {
        if (mintPhase) {
          if (mintPhase === MintPhase.public) {
            setIsMintLive(true);
            setIsDiscountMint(false);
          } else if (mintPhase === MintPhase.discount) {
            setIsMintLive(true);
            setIsDiscountMint(true);
          } else if (mintPhase === MintPhase.closed) {
            setIsMintLive(false);
            setIsDiscountMint(false);
          } else console.error('Invalid mint phase');
        } else {
          if (currentTime >= mintStart && currentTime <= mintEnd) {
            setIsMintLive(true);
          }

          if (currentTime >= mintStart && currentTime <= publicStart) {
            setIsDiscountMint(true);
          }
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
    isPublicMintLive,
    isDiscountMintLive,
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
