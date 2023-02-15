import * as St from './Header.styled';
import SocialIcons from './SocialIcons/SocialIcons';

const Header = (): JSX.Element => {
  return (
    <St.NavContainer>
      <St.Title>rekt memelords</St.Title>

      <SocialIcons />
    </St.NavContainer>
  );
};

export default Header;
