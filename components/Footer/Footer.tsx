import * as St from './Footer.styled';

const Footer = (): JSX.Element => {
  return (
    <St.Container>
      <St.Text>Your MemeLords are:</St.Text>

      <St.TwitterDiv>
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

      <St.Dicks>dicks, heheh</St.Dicks>
    </St.Container>
  );
};

export default Footer;
