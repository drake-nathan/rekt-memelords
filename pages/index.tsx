import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMintDetails } from 'hooks/useMintDetails';
import Hero from 'components/Hero/Hero';
import FallbackPage from 'components/FallbackPage/FallbackPage';
import { MintPhase } from 'web3/types';

const Home: NextPage = () => {
  const nodeEnv = process.env.NODE_ENV;
  const { mintPhase } = useMintDetails();
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
      (nodeEnv === 'production' && mintPhase !== MintPhase.closed) ||
      nodeEnv === 'development'
    ) {
      setShowFallback(false);
    }
  }, [query, mintPhase, nodeEnv]);

  return (
    <>
      <Head>
        <title>rekt memelords | MemeLord District Mint</title>
        <meta name="description" content="rekt memelords" />
      </Head>

      {!showFallback ? (
        <>
          <Hero />
        </>
      ) : (
        <FallbackPage />
      )}
    </>
  );
};

export default Home;
