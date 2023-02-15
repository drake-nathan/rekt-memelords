import * as St from './Fallback.Syled';
import { useMintDetails } from 'hooks/useMintDetails';

const FallbackPage = (): JSX.Element => {
  const { mintStart } = useMintDetails();

  const now = new Date();

  return (
    <>
      <St.FallbackContainer>
        {mintStart > now ? (
          <>
            <St.Subtle>The MemeLord District mint begins soon...</St.Subtle>
          </>
        ) : (
          <St.ParagraphDiv>
            <St.Subtle>The MemeLord&apos;s genesis mint is closed.</St.Subtle>
            <St.Subtle>
              You can buy on secondary on{' '}
              <a
                href="https://opensea.io/collection/memelord-district"
                target="_blank"
                rel="noreferrer"
              >
                OpenSea
              </a>
              .
            </St.Subtle>
            <St.Subtle>
              Join the{' '}
              <a
                href="https://discord.gg/cXy6RHvM8V"
                target="_blank"
                rel="noreferrer"
              >
                Discord
              </a>{' '}
              for announcments on future drops.
            </St.Subtle>
          </St.ParagraphDiv>
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
