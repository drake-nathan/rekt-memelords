import Link from 'next/link';
import * as St from './AboutPage.styled';

const AboutPage = (): JSX.Element => {
  return (
    <St.Container>
      <St.Title>wtf are memelords?</St.Title>
      <St.Subtitle>they make memes, sometimes</St.Subtitle>
      <St.Text>
        You probably need one of{' '}
        <a
          href="https://opensea.io/collection/memelord-district"
          target="_blank"
          rel="noreferrer"
          className="hvr-underline-from-left"
        >
          these
        </a>{' '}
        to get the memes
      </St.Text>
      <St.Text>
        if you already have one of those, check <Link href="/mint">here</Link>{' '}
        for fresh memes
      </St.Text>
    </St.Container>
  );
};

export default AboutPage;
