import * as St from './Header.styled';
import { useWindowSize } from 'hooks/useWindowSize';

const Header = (): JSX.Element => {
  const { windowWidth } = useWindowSize();

  return (
    <St.NavContainer>
      <St.Title>rekt memelords</St.Title>

      {windowWidth <= 550 && (
        <a
          href="https://twitter.com/RektMemelords"
          target="_blank"
          rel="noreferrer"
        >
          <St.TwitterItem>
            <St.Text>@RektMemelords</St.Text>
            <St.TwitterIcon />
          </St.TwitterItem>
        </a>
      )}
      <St.TwitterDiv>
        {windowWidth > 550 && (
          <a
            href="https://twitter.com/RektMemelords"
            target="_blank"
            rel="noreferrer"
          >
            <St.TwitterItem>
              <St.Text>@RektMemelords</St.Text>
              <St.TwitterIcon />
            </St.TwitterItem>
          </a>
        )}

        {windowWidth > 550 && <St.Text>/</St.Text>}

        <a
          href="https://twitter.com/hmoore_eth"
          target="_blank"
          rel="noreferrer"
        >
          <St.TwitterItem>
            <St.Text>hmoore.eth</St.Text>
            <St.TwitterIcon />
          </St.TwitterItem>
        </a>

        <St.Text>/</St.Text>

        <a
          href="https://twitter.com/0xSaintKW"
          target="_blank"
          rel="noreferrer"
        >
          <St.TwitterItem>
            <St.Text>saintkw.eth</St.Text>
            <St.TwitterIcon />
          </St.TwitterItem>
        </a>
      </St.TwitterDiv>
    </St.NavContainer>
  );
};

export default Header;
