import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Providers from 'providers/Providers';
import { AppContainer, BodyContainer } from '../styles/App.styled';
import { sono } from 'styles/fonts';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <AppContainer className={sono.className}>
        <Header />

        <BodyContainer>
          <Component {...pageProps} />
        </BodyContainer>

        <Footer />
      </AppContainer>
    </Providers>
  );
};

export default MyApp;
