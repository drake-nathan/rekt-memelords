import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Providers from 'providers/Providers';
import { AppContainer, BodyContainer } from '../styles/App.styled';
import { sono } from 'styles/fonts';
import { useWeb3ModalTheme, Web3Modal } from '@web3modal/react';
import { ethereumClient } from 'web3/wagmi';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

  if (!projectId) {
    throw new Error('Missing env project id');
  }

  const { setTheme } = useWeb3ModalTheme();

  // Set modal theme
  setTheme({
    themeMode: 'dark',
    themeColor: 'blackWhite',
    themeBackground: 'themeColor',
  });

  return (
    <>
      <Providers>
        <AppContainer className={sono.className}>
          <Header />
          <BodyContainer>
            <Component {...pageProps} />
          </BodyContainer>
          <Footer />
        </AppContainer>
      </Providers>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default MyApp;
