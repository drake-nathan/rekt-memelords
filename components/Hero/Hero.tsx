import { useEffect, useState } from 'react';
import { useMintDetails } from 'hooks/useMintDetails';
import Web3Buttons from '../Web3/Web3Buttons';
import { useContract } from 'hooks/useContract';
import { fetchCurrentSupply } from 'web3/web3Fetches';
import * as St from './Hero.styled';

const Hero = (): JSX.Element => {
  const { maxSupply, mintPrice } = useMintDetails();

  const [currentSupply, setCurrentSupply] = useState(maxSupply);

  const currentContract = useContract();

  const tC = currentContract.tokenContract;

  useEffect(() => {
    fetchCurrentSupply(tC).then((response) => setCurrentSupply(response));
  }, []);

  return (
    <St.HeroContainer>
      <St.Title>rekt Memelords</St.Title>
      <St.SubTitle>[ Memelord District ]</St.SubTitle>

      <Web3Buttons />

      <St.SubtleDiv>
        <St.YellowText>
          {mintPrice}
          <St.SubtleText> (ETH).</St.SubtleText>
        </St.YellowText>

        <St.YellowText>
          {currentSupply < maxSupply ? maxSupply - currentSupply : maxSupply}{' '}
          <St.SubtleText>
            {currentSupply < maxSupply ? 'NFTS REMAINING' : 'NFTS TOTAL'}.
          </St.SubtleText>
        </St.YellowText>
      </St.SubtleDiv>
    </St.HeroContainer>
  );
};

export default Hero;
