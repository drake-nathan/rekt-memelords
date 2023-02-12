import * as St from './Modals.styled';
import React from 'react';
import { sono } from 'styles/fonts';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

const ErrorModal = ({ setShowModal, message }: Props): JSX.Element => {
  const handleCloseModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setShowModal(false);
    // NOTE: to avoid click throughs, might not be necessary
    e.stopPropagation();
  };

  return (
    <>
      <St.ModalBackground
        onClick={() => setShowModal(false)}
      ></St.ModalBackground>
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
