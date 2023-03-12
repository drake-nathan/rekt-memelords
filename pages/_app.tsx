import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Providers from 'providers/Providers';
import { AppContainer, BodyContainer } from '../styles/App.styled';
import { sono } from 'styles/fonts';
import { useWeb3ModalTheme, Web3Modal, useWeb3Modal } from '@web3modal/react';
import { ethereumClient } from 'web3/wagmi';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { theme } from 'styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

  if (!projectId) {
    throw new Error('Missing env project id');
  }

  const { isOpen } = useWeb3Modal();
  const { setTheme } = useWeb3ModalTheme();
  const { colors } = theme;

  // Set modal theme
  setTheme({
    themeMode: 'dark',
    themeVariables: {
      '--w3m-background-color': colors.bgMain,
      '--w3m-accent-color': isOpen ? colors.textOffset : colors.bgOffset,
      '--w3m-accent-fill-color': colors.textMain,
    },
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
