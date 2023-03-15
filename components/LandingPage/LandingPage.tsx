import * as St from './LandingPage.styled';
import Link from 'next/link';

const LandingPage = (): JSX.Element => {
  return (
    <St.Container>
      <St.Text>This is the landing page.</St.Text>

      <St.Text>
        Oh, you want to{' '}
        <Link href="/mint" className="hvr-underline-from-left">
          mint
        </Link>
        ?
      </St.Text>

      <St.Text>
        <Link href="/about" className="hvr-underline-from-left">
          Wtf are MemeLords
        </Link>
        ?
      </St.Text>
    </St.Container>
  );
};

export default LandingPage;
