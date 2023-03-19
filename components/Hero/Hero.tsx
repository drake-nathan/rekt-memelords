import * as St from './Hero.styled';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useWindowSize } from 'hooks/useWindowSize';
import { useStoreFrontMintPrice } from 'web3/generated';
import { formatEther } from 'ethers/lib/utils.js';
import Mint from 'components/Claim/Claim';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useDelegateCash } from 'hooks/useDelegateCash';

const Hero = (): JSX.Element => {
  const { windowWidth } = useWindowSize();

  const { address } = useAccount();
  // safe to cast, as we only render this component if the user is logged in
  const { data: delegates } = useDelegateCash(address as string);

  useEffect(() => {
    if (delegates) {
      console.log('delegates', delegates);
    }
  }, [delegates]);

  const { data: mintPrice } = useStoreFrontMintPrice();

  const openSeaLink = 'https://opensea.io/collection/rektmemelord-editions';
  const etherscanLink =
    'https://etherscan.io/address/0x0b820E51631389C92e9aB12126a0434c04dBe02e';

  const aspectRatio = 1.5;
  const [width, setWidth] = useState<number>(550);
  const height = width / aspectRatio;

  useEffect(() => {
    if (windowWidth > 1300) setWidth(650);
    else if (windowWidth <= 1300 && windowWidth > 1100) setWidth(525);
    else if (windowWidth <= 1100 && windowWidth > 900) setWidth(450);
    else if (windowWidth <= 400) setWidth(325);
    else setWidth(350);
  }, [windowWidth]);

  return (
    <St.Container>
      <St.ImageWrapper>
        <a
          href="https://memelordsresources9838.blob.core.windows.net/memes/PML.gif"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            priority
            src="/memes/PML-small.gif"
            alt="Professional MemeLord"
            width={width}
            height={height}
          />
        </a>
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

        <St.ExplainDiv>
          <St.Text>1 MemeLord District = 1 PML</St.Text>
          <St.Text>
            Mint 1 PML per MLD for {mintPrice ? formatEther(mintPrice) : 0.042}
            (ETH)
          </St.Text>
          <St.Text>OR burn 1 MLD for 1 PML</St.Text>
          <St.Text>
            OR send DPs to{' '}
            <a
              href="https://twitter.com/crookedwest"
              target="_blank"
              rel="noreferrer"
            >
              OG daddy
            </a>{' '}
            (nfa)
          </St.Text>
          <St.Text>
            Check if MLD has already been used to claim{' '}
            <Link href="/claim-check" className="hvr-underline-from-left">
              here
            </Link>
          </St.Text>
        </St.ExplainDiv>

        <Mint />

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
