import styled from 'styled-components';

export const Background = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  background: rgba(141, 141, 141, 0.85);
  backdrop-filter: blur(4px);
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(58, 58, 58, 0.7);
  border: 3px solid ${(props) => props.theme.colors.textMain};
  min-width: 300px;
  gap: 2.5em;
  z-index: 20;
  padding: 2em 1.5em;
  border-radius: ${(props) => props.theme.borderRadius};

  @media (max-width: 500px) {
    max-width: 90%;
  }
`;

export const MldGrid = styled.div`
  z-index: 50;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  padding: 1.5em 0.5em;
  gap: 0.5em;
  border: 2px solid ${(props) => props.theme.colors.textMain};
  border-radius: ${(props) => props.theme.borderRadius};

  overflow-y: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Mld = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.25em 0.5em;

  :hover {
    cursor: pointer;
    outline: 1px solid ${(props) => props.theme.colors.textOffset};
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

export const Text = styled.span`
  color: ${(props) => props.theme.colors.textMain};
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
  max-width: 50ch;

  @media (max-width: 500px) {
    margin-top: 18px;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
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

  @media (max-width: 500px) {
    min-width: 125px;
  }
`;
