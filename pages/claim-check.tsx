import type { NextPage } from 'next';
import Head from 'next/head';
import ClaimCheckPage from 'components/ClaimCheckPage/ClaimCheckPage';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>rekt memelords | MLD Claim Check</title>
        <meta name="description" content="rekt memelords" />
      </Head>

      <ClaimCheckPage />
    </>
  );
};

export default About;
