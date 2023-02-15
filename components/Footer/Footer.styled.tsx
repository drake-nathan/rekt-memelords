import styled from 'styled-components';
import { FiTwitter } from 'react-icons/fi';

export const Container = styled.footer`
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 0;
  padding: 1em;
  margin-top: 2em;
  gap: 1em;
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

export const Dicks = styled.p`
  position: absolute;
  bottom: 1em;
  right: 1em;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textOffset};
`;
