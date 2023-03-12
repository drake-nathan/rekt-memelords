import * as St from './Header.styled';
import SocialIcons from '../Footer/SocialIcons/SocialIcons';
import { Web3Button } from '@web3modal/react';

const Header = (): JSX.Element => {
  return (
    <St.NavContainer>
      <St.Title>rekt memelords</St.Title>

      <Web3Button />
    </St.NavContainer>
  );
};

export default Header;
