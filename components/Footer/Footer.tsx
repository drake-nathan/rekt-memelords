import * as St from './Footer.styled';

const Footer = (): JSX.Element => {
  return (
    <St.Container>
      <St.Text>Your MemeLords are:</St.Text>

      <St.TwitterDiv>
        <a href="https://twitter.com/rhm_eth" target="_blank" rel="noreferrer">
          <St.TwitterItem>
            <St.Text>rhm.eth</St.Text>
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

      <St.BottomRow>
        <St.TwitterDiv>
          <a
            href="https://twitter.com/nathandrake"
            target="_blank"
            rel="noreferrer"
          >
            <St.TwitterItem className="dev">
              <St.Text>Dev: TheNathanDrake.eth</St.Text>
            </St.TwitterItem>
          </a>
        </St.TwitterDiv>

        <St.Dicks>dicks, heheh</St.Dicks>
      </St.BottomRow>
    </St.Container>
  );
};

export default Footer;
