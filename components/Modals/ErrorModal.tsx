import { sono } from 'styles/fonts';
import * as St from './Modals.styled';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

const ErrorModal = ({ setShowModal, message }: Props): JSX.Element => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <St.ModalBackground onClick={handleCloseModal}></St.ModalBackground>
      <St.CenterModalContainer>
        <St.MsgDiv>
          <St.UnitText>{message}</St.UnitText>
        </St.MsgDiv>

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
