import * as St from './Modals.styled';
// import { type ISuccessInfo } from 'components/Mint/helpers/mintFunctions';
import { sono } from 'styles/fonts';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  successInfo: any;
}

const ErrorModal = ({ setShowModal, successInfo }: Props): JSX.Element => {
  const { message, etherscanLink } = successInfo;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <St.ModalBackground onClick={handleCloseModal}></St.ModalBackground>

      <St.CenterModalContainer>
        <St.LinkDiv>
          <St.Text>{message}</St.Text>
          {/* 
          <St.Link href={openseaLink} target="_blank">
            OpenSea
          </St.Link> */}

          <St.Link href={etherscanLink} target="_blank">
            Etherscan
          </St.Link>
        </St.LinkDiv>

        <St.LittleButtonDiv>
          <St.LittleButton
            className={sono.className}
            onClick={handleCloseModal}
          >
            CLOSE
          </St.LittleButton>
        </St.LittleButtonDiv>
      </St.CenterModalContainer>
    </>
  );
};

export default ErrorModal;
