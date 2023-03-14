import * as St from './Header.styled';
import { Web3Button } from '@web3modal/react';
import Link from 'next/link';

const Header = (): JSX.Element => {
  return (
    <St.NavContainer>
      <St.Title>
        <Link href="/">rekt memelords</Link>
      </St.Title>

      <Web3Button />
    </St.NavContainer>
  );
};

export default Header;
