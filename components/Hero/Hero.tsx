import * as St from './Hero.styled';
import { useEffect, useState } from 'react';
import { useMintDetails } from 'hooks/useMintDetails';
import Web3Buttons from '../Web3/Web3Buttons';
import { useContract } from 'hooks/useContract';
import { fetchCurrentSupply } from 'web3/contractInteractions';
import Image from 'next/image';

const Hero = (): JSX.Element => {
  const { maxSupply, mintPrice } = useMintDetails();

  const [currentSupply, setCurrentSupply] = useState(maxSupply);

  const { contract } = useContract();

  useEffect(() => {
    fetchCurrentSupply(contract).then((response) => setCurrentSupply(response));
  }, []);

  return (
    <St.Container>
      <St.ImageWrapper>
        <Image src="/MLD.gif" alt="MemeLord District" fill />
      </St.ImageWrapper>

      <St.MintSection>
        <St.Title>[ MemeLord District ]</St.Title>
        <Web3Buttons />
        <St.InfoDiv>
          <St.Text>{mintPrice}(ETH)</St.Text>
          <St.Text>
            {currentSupply < maxSupply ? maxSupply - currentSupply : maxSupply}{' '}
            {currentSupply < maxSupply ? 'NFTS REMAINING' : 'NFTS TOTAL'}
          </St.Text>
        </St.InfoDiv>
      </St.MintSection>
    </St.Container>
  );
};

export default Hero;
