import type { NextPage } from 'next';
import Head from 'next/head';
import ClaimCheckPage from 'components/ClaimCheckPage/ClaimCheckPage';
import { useEffect } from 'react';
import { claimed } from 'web3/ethers';

const About: NextPage = () => {
  // useEffect(() => {
  //   // array of number from 0 to 284
  //   const arr = Array.from(Array(285).keys());
  //   arr.forEach((i) => {
  //     claimed(i).then((res) => {
  //       if (res === true) console.log(i);
  //     });
  //   });
  // }, []);

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
