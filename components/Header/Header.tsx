import * as St from './Header.styled';

const Header = (): JSX.Element => {
  return (
    <St.NavContainer>
      <St.Title>rekt Memelords</St.Title>

      <St.TwitterDiv>
        <a
          href="https://twitter.com/hmoore_eth"
          target="_blank"
          rel="noreferrer"
        >
          <St.TwitterItem>
            <St.Text>hmoore</St.Text>
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
            <St.Text>saintkw</St.Text>
            <St.TwitterIcon />
          </St.TwitterItem>
        </a>
      </St.TwitterDiv>
    </St.NavContainer>
  );
};

export default Header;
