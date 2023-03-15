import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1em;
  margin-top: 1.5em;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const MintSection = styled.div`
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
`;

export const Title = styled.h3`
  font-weight: 400;

  @media (max-width: 600px) {
    font-size: 1rem;
    text-align: center;
  }
`;

export const ImageWrapper = styled.div``;

export const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25em;
  margin-top: 1.25em;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const ExplainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  text-align: center;

  a {
    text-decoration: underline;

    :hover {
      color: ${(props) => props.theme.colors.textMain};
    }
  }
`;

export const Text = styled.span`
  color: ${(props) => props.theme.colors.textOffset};
  font-size: 16px;
`;

export const LinksDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const LinkItem = styled(Text)`
  :hover {
    color: ${(props) => props.theme.colors.textMain};
    cursor: pointer;
  }
`;
