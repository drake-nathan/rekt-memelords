import * as St from './SocialIcons.styled';
import OpenSea from 'public/icons/opensea.svg';
import EtherScan from 'public/icons/etherscan.svg';
import Discord from 'public/icons/discord.svg';

const SocialIcons = (): JSX.Element => (
  <St.Container>
    <a
      href="https://etherscan.io/address/0x924F2a4D3e93cC595792292C84A41Ad3AEd70E95"
      target="_blank"
      rel="noreferrer"
    >
      <EtherScan className="icon" style={{ marginRight: '2px' }} />
    </a>

    <a
      href="https://opensea.io/collection/memelord-district"
      target="_blank"
      rel="noreferrer"
    >
      <OpenSea className="icon" />
    </a>

    <a
      href="https://twitter.com/RektMemelords"
      target="_blank"
      rel="noreferrer"
    >
      <St.Twitter className="icon" size={23} />
    </a>

    <a href="https://discord.gg/cXy6RHvM8V" target="_blank" rel="noreferrer">
      <Discord className="icon" />
    </a>
  </St.Container>
);

export default SocialIcons;
