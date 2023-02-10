import * as St from './Hero.styled';
import { useEffect, useState } from 'react';
import { useMintDetails } from 'hooks/useMintDetails';
import Web3Buttons from '../Web3/Web3Buttons';
import { useContract } from 'hooks/useContract';
import { fetchCurrentSupply } from 'web3/contractInteractions';
import Image from 'next/image';
import { MintPhase } from 'web3/types';

const Hero = (): JSX.Element => {
  const { contract } = useContract();
  const { maxSupply, mintPrice, discountPrice, mintPhase } = useMintDetails();

  const [currentSupply, setCurrentSupply] = useState(maxSupply);
  const price = mintPhase === MintPhase.discount ? discountPrice : mintPrice;

  useEffect(() => {
    fetchCurrentSupply(contract).then((response) => setCurrentSupply(response));
  }, []);

  const openSeaLink = 'https://opensea.io/collection/memelord-district';
  const etherscanLink =
    'https://etherscan.io/address/0x924F2a4D3e93cC595792292C84A41Ad3AEd70E95';

  return (
    <St.Container>
      <St.ImageWrapper>
        <Image src="/MLD.gif" alt="MemeLord District" fill />
      </St.ImageWrapper>

      <St.MintSection>
        <St.Title>[ MemeLord District ]</St.Title>

        <St.LinksDiv>
          <a href={openSeaLink} target="_blank" rel="noreferrer">
            <St.LinkItem>OpenSea</St.LinkItem>
          </a>
          <a href={etherscanLink} target="_blank" rel="noreferrer">
            <St.LinkItem>Etherscan</St.LinkItem>
          </a>
        </St.LinksDiv>

        <Web3Buttons />

        <St.InfoDiv>
          <St.Text>{price}(ETH)</St.Text>

          <St.Text>
            {currentSupply < maxSupply ? maxSupply - currentSupply : maxSupply}{' '}
            {currentSupply < maxSupply ? 'NFTS REMAINING' : 'NFTS TOTAL'}
          </St.Text>
        </St.InfoDiv>

        {mintPhase === MintPhase.discount && (
          <St.ExplainDiv>
            <St.Text>Red Lite District mint phase</St.Text>
            <St.Text>Must be on pre-set allowlist</St.Text>
            <St.Text>Public mint begins on Feb 11</St.Text>
            <St.Text>Public mint price: {mintPrice}(ETH)</St.Text>
          </St.ExplainDiv>
        )}
      </St.MintSection>
    </St.Container>
  );
};

export default Hero;
