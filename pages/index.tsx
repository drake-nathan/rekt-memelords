import LandingPage from 'components/LandingPage/LandingPage';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>rekt memelords</title>
        <meta name="description" content="rekt memelords" />
      </Head>

      <LandingPage />
    </>
  );
};

export default Home;
