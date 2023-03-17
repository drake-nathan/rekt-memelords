import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useStoreFrontIsMintOpen } from 'web3/generated';
import Head from 'next/head';
import Hero from 'components/Hero/Hero';
import FallbackPage from 'components/FallbackPage/FallbackPage';
import { BarLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';

enum Content {
  Loading,
  Error,
  Fallback,
  Hero,
}

const Home: NextPage = () => {
  const { colors } = useTheme();
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();

  const { data: isMintOpen, isLoading, error } = useStoreFrontIsMintOpen();

  const [content, setContent] = useState<Content>(Content.Loading);

  useEffect(() => {
    if (!isConnected) open();
  }, [isConnected]);

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        setContent(Content.Error);
        console.error(error);
      } else if (isMintOpen === false) {
        setContent(Content.Fallback);
      } else if (isMintOpen === true) {
        setContent(Content.Hero);
      }
    } else {
      setContent(Content.Loading);
    }
  }, [isMintOpen, isLoading, error]);

  const render: Record<Content, JSX.Element> = {
    [Content.Loading]: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1em',
        }}
      >
        <h2>Must connect wallet to proceed</h2>
        <BarLoader color={colors.textMain} height="10px" width="300px" />
      </div>
    ),
    [Content.Error]: <h1>rekt</h1>,
    [Content.Fallback]: <FallbackPage />,
    [Content.Hero]: <Hero />,
  };

  return (
    <>
      <Head>
        <title>rekt memelords | MemeLord District Mint</title>
        <meta name="description" content="rekt memelords" />
      </Head>

      {render[content]}
    </>
  );
};

export default Home;
