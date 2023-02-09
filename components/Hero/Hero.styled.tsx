import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1em;
  padding: 1em;

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

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 0.5em;
  gap: 1em;
  width: 35%;
  max-width: 450px;
  /* 
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5em;
  } */
`;

export const Title = styled.h3`
  font-weight: 400;
  margin-bottom: 1em;

  @media (max-width: 600px) {
    font-size: 1rem;
    text-align: center;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 550px;
  aspect-ratio: 1/1;

  @media (max-width: 1100px) {
    max-width: 450px;
  }

  @media (max-width: 900px) {
    max-width: 350px;
  }
`;

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
  gap: 0.25em;
  text-align: center;
`;

export const Text = styled.span`
  color: ${(props) => props.theme.colors.textOffset};
  font-size: 16px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 175px;
  min-height: 65px;
  border: 3px solid ${(props) => props.theme.colors.textMain};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.bgMain};
  color: ${(props) => props.theme.colors.textMain};
  font-size: 1rem;
  font-weight: 500;
  padding: 0 0.5em;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.colors.textMain};
    color: ${(props) => props.theme.colors.bgMain};
    font-weight: 700;
  }

  /* @media (max-width: 600px) {
    width: 300px;
    min-width: 150px;
  } */
`;
