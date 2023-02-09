import styled from 'styled-components';

export const FallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80vh;
  padding: 1em;
  gap: 3em;
`;

export const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  width: 80%;
`;

export const Subtle = styled.h3`
  color: ${({ theme }) => theme.colors.textOffset};
`;

export const Text = styled.h4`
  :hover {
    color: ${({ theme }) => theme.colors.textOffset};
  }
`;
