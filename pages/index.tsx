/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import NavBar from 'components/NavBar/NavBar';
import Slider from 'components/Slider/Slider';
import { sliderMedia } from 'components/Slider/sliderMedia';
import { useMintDetails } from 'hooks/useMintDetails';
import Hero from 'components/Hero/Hero';
import FallbackPage from 'components/FallbackPage/FallbackPage';
import Image from 'next/image';

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.bgMain};
  color: ${(props) => props.theme.colors.textMain};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  cursor: default;

  p {
    color: ${(props) => props.theme.colors.textOffset};
    padding-left: 55px;
    padding-right: 55px;
    margin-top: 10px;
    margin-bottom: 18px;
    text-align: center;
    z-index: 5;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const Home: NextPage = () => {
  const nodeEnv = process.env.NODE_ENV;
  const { isMintLive } = useMintDetails();
  const { query } = useRouter();

  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    // NOTE: add /?showFallback=true to the url to show the fallback page in development
    if (query.showFallback === 'true') {
      setShowFallback(true);
    } else if (
      // NOTE: add /?showFallback=false to the url to hide the fallback page in production
      // NOTE: also hide fallback page if mint is live in prod or anytime in dev
      query.showFallback === 'false' ||
      (nodeEnv === 'production' && isMintLive) ||
      nodeEnv === 'development'
    ) {
      setShowFallback(false);
    }
  }, [query, isMintLive, nodeEnv]);

  return (
    <AppContainer>
      <Head>
        <title>Rekt Memelords (Meme Lite District)</title>
        <meta name="description" content="Rekt Memelords" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      {!showFallback ? (
        <>
          <NavBar />
          <Hero />
          <img src="/MLD.gif" alt="Memelord District" width="500" />
          <p>Dicks, heheh</p>
        </>
      ) : (
        <FallbackPage />
      )}
    </AppContainer>
  );
};

export default Home;
