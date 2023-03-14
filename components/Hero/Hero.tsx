import * as St from './Hero.styled';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useWindowSize } from 'hooks/useWindowSize';
import { useStoreFrontMintPrice } from 'web3/generated';
import { formatEther } from 'ethers/lib/utils.js';

const Hero = (): JSX.Element => {
  const { windowWidth } = useWindowSize();

  const { data: mintPrice } = useStoreFrontMintPrice();

  const openSeaLink = 'https://opensea.io/collection/memelord-district';
  const etherscanLink =
    'https://etherscan.io/address/0x924F2a4D3e93cC595792292C84A41Ad3AEd70E95';

  const aspectRatio = 1.5;
  const [width, setWidth] = useState<number>(550);
  const height = width / aspectRatio;

  useEffect(() => {
    if (windowWidth > 1300) setWidth(700);
    else if (windowWidth <= 1300 && windowWidth > 1100) setWidth(525);
    else if (windowWidth <= 1100 && windowWidth > 900) setWidth(450);
    else if (windowWidth <= 400) setWidth(325);
    else setWidth(350);
  }, [windowWidth]);

  return (
    <St.Container>
      <St.ImageWrapper>
        <Image
          priority
          src="/memes/PML.gif"
          alt="Professional MemeLord"
          width={width}
          height={height}
        />
      </St.ImageWrapper>

      <St.MintSection>
        <St.Title>[ Professional MemeLord ]</St.Title>

        <St.LinksDiv>
          <a href={openSeaLink} target="_blank" rel="noreferrer">
            <St.LinkItem>OpenSea</St.LinkItem>
          </a>
          <a href={etherscanLink} target="_blank" rel="noreferrer">
            <St.LinkItem>Etherscan</St.LinkItem>
          </a>
        </St.LinksDiv>

        <St.InfoDiv>
          <St.Text>{mintPrice ? formatEther(mintPrice) : 0.042}(ETH)</St.Text>

          {/* <St.Text>
            {currentSupply < maxSupply ? maxSupply - currentSupply : maxSupply}{' '}
            {currentSupply < maxSupply ? 'NFTS REMAINING' : 'NFTS TOTAL'}
          </St.Text> */}
        </St.InfoDiv>

        <St.ExplainDiv>
          <St.Text>1 MemeLord District = 1 Professional MemeLord</St.Text>
          <St.Text>Mint 1 PML per MLD, or burn 1 MLD for 1 PML</St.Text>
        </St.ExplainDiv>
      </St.MintSection>
    </St.Container>
  );
};

export default Hero;
