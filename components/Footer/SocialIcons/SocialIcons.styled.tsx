import styled from 'styled-components';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75em;
  margin-top: 0.25em;

  .icon {
    font-size: 1.25rem;

    :hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.textOffset};
    }
  }
`;

export const Twitter = styled(AiFillTwitterCircle)``;

export const Discord = styled(FaDiscord)``;
