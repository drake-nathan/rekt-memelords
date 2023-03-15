import styled from 'styled-components';

export const ModalBackground = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
  background: rgba(244, 245, 240, 0.85);
  backdrop-filter: blur(4px);
  cursor: pointer;
`;

export const BuyModalBackground = styled(ModalBackground)`
  z-index: 10;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(58, 58, 58, 0.7);
  border: 3px solid ${(props) => props.theme.colors.textMain};
  padding: 1.75em 1.5em;
  z-index: 40;
  min-width: 300px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const BuyModalContainer = styled(ModalContainer)`
  gap: 2.5em;
  justify-content: space-evenly;
  min-width: 400px;
  /* min-height: 425px; */
  z-index: 20;
  padding: 4em 3em;
  @media (max-width: 500px) {
    min-width: 375px;
  }
`;

export const ListingsWrapper = styled.div`
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  max-height: 550px;

  @media (max-height: 850px) {
    max-height: 400px;
  }

  @media (max-height: 750px) {
    max-height: 300px;
  }

  @media (max-height: 650px) {
    max-height: 200px;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 600px) {
    min-width: 350px;
  }
`;

export const CenterModalContainer = styled(ModalContainer)`
  align-items: center;
  justify-content: center;
`;

export const MsgDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const UnitDiv = styled(MsgDiv)`
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  .active {
    color: ${(props) => props.theme.colors.bgMain};
    font-weight: 500;
  }
`;

export const LinkDiv = styled(MsgDiv)`
  flex-direction: column;
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

export const Link = styled.a`
  color: ${(props) => props.theme.colors.textMain};
  font-size: 1.25rem;
  font-weight: 500;
  max-width: 30ch;
  text-align: center;
  line-height: 1.5;

  :hover {
    color: ${(props) => props.theme.colors.hover};
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 175px;
  min-height: 65px;
  border: 3px solid ${(props) => props.theme.colors.textMain};
  background-color: ${(props) => props.theme.colors.textMain};
  color: ${(props) => props.theme.colors.bgMain};
  font-size: 1.25rem;
  font-weight: 500;
  padding: 0 0.5em;
  cursor: pointer;
  transition-duration: 0.3s;
  background-color: ${(props) => props.theme.colors.textMain};
  color: ${(props) => props.theme.colors.bgMain};
  box-shadow: 4px 6px 12px -2px rgba(58, 58, 58, 0.61);
  -webkit-box-shadow: 4px 6px 12px -2px rgba(58, 58, 58, 0.61);
  -moz-box-shadow: 4px 6px 12px -2px rgba(58, 58, 58, 0.61);

  :hover {
    box-shadow: 6px 8px 14px -2px rgba(58, 58, 58, 0.61);
    -webkit-box-shadow: 6px 8px 14px -2px rgba(58, 58, 58, 0.61);
    -moz-box-shadow: 6px 8px 14px -2px rgba(58, 58, 58, 0.61);
    background-color: ${(props) => props.theme.colors.bgMain};
    color: ${(props) => props.theme.colors.textMain};
  }

  @media (max-width: 500px) {
    min-width: 150px;
    background-color: ${(props) => props.theme.colors.textMain};
    color: ${(props) => props.theme.colors.bgMain};
  }
`;

export const TokenListing = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  padding: 0px;
  height: 150px;
  min-height: 150px;
  width: 500px;
  border: none;
  transition-duration: 0.3s;
  background-color: ${(props) => props.theme.colors.textMain};
  color: ${(props) => props.theme.colors.bgMain};
  box-shadow: 4px 6px 12px -2px rgba(58, 58, 58, 0.61);
  -webkit-box-shadow: 4px 6px 12px -2px rgba(58, 58, 58, 0.61);
  -moz-box-shadow: 4px 6px 12px -2px rgba(58, 58, 58, 0.61);
  @media (max-width: 600px) {
    min-width: 350px;
  }

  :hover {
    background: rgba(58, 58, 58, 0.7);
    transform: scale(1.1);
    margin-bottom: 10px;
    margin-top: 10px;
    padding: 20px;

    box-shadow: 6px 8px 14px -2px rgba(58, 58, 58, 0.61);
    -webkit-box-shadow: 6px 8px 14px -2px rgba(58, 58, 58, 0.61);
    -moz-box-shadow: 6px 8px 14px -2px rgba(58, 58, 58, 0.61);
  }
`;

export const Choices = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;
`;

export const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: start;
  * {
    :hover {
      color: ${(props) => props.theme.colors.bgMain};
    }
  }
`;

export const TokenText = styled.p`
  color: ${(props) => props.theme.colors.textOffset};
`;

export const CollectionText = styled(TokenText)`
  font-size: 20px;
`;

export const CenterButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const XButton = styled.img`
  color: ${(props) => props.theme.colors.textMain};
  width: 1.25em;
  margin-top: -4px;
  cursor: pointer;
`;

export const LittleButtonDiv = styled.div`
  display: flex;
  gap: 2em;
`;

export const LittleButton = styled(Button)`
  min-width: 120px;
`;

export const PlusMinusDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const PlusMinusButton = styled(Button)`
  min-width: 55px;
  min-height: 55px;
  font-size: 30px;

  :disabled {
    color: ${(props) => props.theme.colors.textOffset};
    border-color: ${(props) => props.theme.colors.textOffset};

    :hover {
      background: none;
    }
  }
`;

export const SubtleText = styled.span`
  color: ${(props) => props.theme.colors.textOffset};
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

export const UnitText = styled(Text)`
  color: ${(props) => props.theme.colors.hover};
`;
