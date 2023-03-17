import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`;

export const Heading = styled.h3`
  font-weight: 400;
  max-width: 400px;
  text-align: center;
  line-height: 1.5;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  max-width: 250px;
`;

export const Input = styled.input`
  min-height: 40px;
  width: 100%;
  border: 2px solid ${(props) => props.theme.colors.textOffset};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 0 0.5em;
  font-size: 1.25rem;
  font-weight: 500;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
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

  @media (max-width: 500px) {
    min-width: 125px;
  }
`;
