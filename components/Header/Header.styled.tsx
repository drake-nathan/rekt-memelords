import styled from 'styled-components';
import { FiTwitter } from 'react-icons/fi';

export const NavContainer = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  gap: 0.75em;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-weight: 500;
  letter-spacing: 1.25px;
`;

export const TwitterDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75em;
`;

export const TwitterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;

  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textOffset};
  }
`;

export const Text = styled.span``;

export const TwitterIcon = styled(FiTwitter)`
  font-size: 1.125rem;
`;
