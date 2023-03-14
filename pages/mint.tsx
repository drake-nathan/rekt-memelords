import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useStoreFrontIsMintOpen } from 'web3/generated';
import Head from 'next/head';
import Hero from 'components/Hero/Hero';
import FallbackPage from 'components/FallbackPage/FallbackPage';
import { BarLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

enum Content {
  Loading,
  Error,
  Fallback,
  Hero,
}

const Home: NextPage = () => {
  const { colors } = useTheme();
  const { data: isMintOpen, isLoading, error } = useStoreFrontIsMintOpen();

  const [content, setContent] = useState<Content>(Content.Loading);

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        setContent(Content.Error);
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
      <BarLoader color={colors.textMain} height="10px" width="300px" />
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
