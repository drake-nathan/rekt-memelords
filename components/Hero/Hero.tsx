import * as St from './Hero.styled';
import { useEffect, useState } from 'react';
import { useMintDetails } from 'hooks/useMintDetails';
import Image from 'next/image';
import { MintPhase } from 'web3/types';
import { useWindowSize } from 'hooks/useWindowSize';
import { Web3Button } from '@web3modal/react';

const Hero = (): JSX.Element => {
  const { maxSupply, mintPrice, discountPrice, mintPhase } = useMintDetails();
  const { windowWidth } = useWindowSize();

  const [currentSupply, setCurrentSupply] = useState(maxSupply);
  const price = mintPhase === MintPhase.discount ? discountPrice : mintPrice;

  const openSeaLink = 'https://opensea.io/collection/memelord-district';
  const etherscanLink =
    'https://etherscan.io/address/0x924F2a4D3e93cC595792292C84A41Ad3AEd70E95';

  const aspectRatio = 1.0828313253;
  const [width, setWidth] = useState<number>(550);
  const height = width / aspectRatio;

  useEffect(() => {
    if (windowWidth > 1300) setWidth(550);
    else if (windowWidth <= 1300 && windowWidth > 1100) setWidth(525);
    else if (windowWidth <= 1100 && windowWidth > 900) setWidth(450);
    else if (windowWidth <= 400) setWidth(325);
    else setWidth(350);
  }, [windowWidth]);

  return (
    <St.Container>
      <St.ImageWrapper>
        <Image
          src="/MLD.gif"
          alt="MemeLord District"
          width={width}
          height={height}
        />
      </St.ImageWrapper>

      <St.MintSection>
        <Web3Button />

        <St.Title>[ MemeLord District ]</St.Title>

        <St.LinksDiv>
          <a href={openSeaLink} target="_blank" rel="noreferrer">
            <St.LinkItem>OpenSea</St.LinkItem>
          </a>
          <a href={etherscanLink} target="_blank" rel="noreferrer">
            <St.LinkItem>Etherscan</St.LinkItem>
          </a>
        </St.LinksDiv>

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

        {mintPhase === MintPhase.public && (
          <St.ExplainDiv>
            <St.Text>Public mint phase</St.Text>
            <St.Text>Max 3 mints at a time</St.Text>
            <St.Text>Max 10 total mints per wallet</St.Text>
          </St.ExplainDiv>
        )}
      </St.MintSection>
    </St.Container>
  );
};

export default Hero;
