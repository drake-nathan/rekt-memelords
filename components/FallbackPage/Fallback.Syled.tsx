import styled from 'styled-components';

export const FallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
  gap: 3em;
`;

export const ParagraphDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const Subtle = styled.h3`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textOffset};

  a {
    color: ${({ theme }) => theme.colors.textMain};

    :hover {
      color: ${({ theme }) => theme.colors.textOffset};
    }
  }

  @media (max-width: 500px) {
    font-size: 1.125rem;
  }
`;

export const Text = styled.h4`
  font-weight: 500;
  :hover {
    color: ${({ theme }) => theme.colors.textOffset};
  }
`;
