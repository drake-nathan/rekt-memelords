import * as St from './Hero.styled';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useWindowSize } from 'hooks/useWindowSize';
import Claim from 'components/Claim/Claim';
import Link from 'next/link';

const Hero = (): JSX.Element => {
  const { windowWidth } = useWindowSize();

  const openSeaLink = 'https://opensea.io/collection/rektmemelord-editions';
  const etherscanLink =
    'https://etherscan.io/address/0x0b820E51631389C92e9aB12126a0434c04dBe02e';

  const aspectRatio = 1;
  const [width, setWidth] = useState<number>(550);
  const height = width / aspectRatio;

  useEffect(() => {
    if (windowWidth > 1300) setWidth(550);
    else if (windowWidth <= 1300 && windowWidth > 1100) setWidth(500);
    else if (windowWidth <= 1100 && windowWidth > 900) setWidth(450);
    else if (windowWidth <= 400) setWidth(325);
    else setWidth(350);
  }, [windowWidth]);

  return (
    <St.Container>
      <St.ImageWrapper>
        <a
          href="https://memelordsresources9838.blob.core.windows.net/memes/rmlrg.gif"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            priority
            src="/memes/rmlrg.gif"
            alt="Professional MemeLord"
            width={width}
            height={height}
          />
        </a>
      </St.ImageWrapper>

      <St.MintSection>
        <St.Title>[ Memelord Rektguy ]</St.Title>

        <St.LinksDiv>
          <a href={openSeaLink} target="_blank" rel="noreferrer">
            <St.LinkItem>OpenSea</St.LinkItem>
          </a>
          <a href={etherscanLink} target="_blank" rel="noreferrer">
            <St.LinkItem>Etherscan</St.LinkItem>
          </a>
        </St.LinksDiv>

        <St.ExplainDiv>
          <St.Text>1 MemeLord District = 1 Mint</St.Text>

          <St.Text>
            Check if MLD has already been used to claim{' '}
            <Link href="/claim-check" className="hvr-underline-from-left">
              here
            </Link>
          </St.Text>
        </St.ExplainDiv>

        <Claim />

        {/* 
        <St.InfoDiv>
          <St.Text>
            {currentSupply < maxSupply ? maxSupply - currentSupply : maxSupply}{' '}
            {currentSupply < maxSupply ? 'NFTS REMAINING' : 'NFTS TOTAL'}
          </St.Text>
        </St.InfoDiv> */}
      </St.MintSection>
    </St.Container>
  );
};

export default Hero;
