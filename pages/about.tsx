import AboutPage from 'components/AboutPage/AboutPage';
import type { NextPage } from 'next';
import Head from 'next/head';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>rekt memelords | MemeLord District Mint</title>
        <meta name="description" content="rekt memelords" />
      </Head>

      <AboutPage />
    </>
  );
};

export default About;
