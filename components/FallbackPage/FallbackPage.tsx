import * as St from './Fallback.Syled';
import { useMintDetails } from 'hooks/useMintDetails';

const FallbackPage = (): JSX.Element => {
  const { mintStart } = useMintDetails();

  const now = new Date();

  return (
    <>
      <St.FallbackContainer>
        <St.Title>rekt memelords</St.Title>
        {mintStart > now ? (
          <>
            <St.Subtle>The MemeLord District mint begins soon...</St.Subtle>
          </>
        ) : (
          <St.Subtle>
            The mint you are trying access is no longer active.
          </St.Subtle>
        )}
        <a
          href="https://pbs.twimg.com/media/FodT_tnXEBIVC0v?format=jpg&name=large"
          target="_blank"
          rel="noreferrer"
        >
          <St.Text>here are bern&apos;s feet</St.Text>
        </a>
      </St.FallbackContainer>
    </>
  );
};

export default FallbackPage;
