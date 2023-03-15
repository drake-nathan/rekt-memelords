import * as St from './MldModal.styled';
import { useState, useEffect } from 'react';
import { ITokenOwner } from 'services/azure';
import Image from 'next/image';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleError: (error: string) => void;
  buyButtonText: string;
  userMldTokens: ITokenOwner[];
}

const PremintModal: React.FC<Props> = ({
  setShowModal,
  handleError,
  buyButtonText,
  userMldTokens,
}) => {
  const [activeMld, setActiveMld] = useState<number | null>(null);

  const [isFocusImgError, setIsFocusImgError] = useState<boolean>(false);

  const root = 'https://mattoapi.blob.core.windows.net/thumbnails';
  const enso = { id: 34, slug: 'enso' };
  const focus = { id: 181, slug: 'focus' };

  // useEffect(() => {
  //   if (!userMldTokens) {
  //     setShowModal(false);
  //   }
  // }, [userMldTokens]);

  const handleMintClick = () => {
    // const project = activeMld ? enso.id : focus.id;
    // const token = activeMld ? activeMld : activeFocus;
    // if (project && token) {
    //   handlePresaleMint(project, token);
    // } else {
    //   handleError('PLEASE SELECT A TOKEN TO MINT WITH');
    // }
  };

  return (
    <>
      <St.BuyModalBackground onClick={() => setShowModal(false)} />
      <St.BuyModalContainer>
        <St.UnitDiv>
          <St.UnitText>
            {userMldTokens.length && 'Select MLD to claim with'}
          </St.UnitText>
        </St.UnitDiv>
        <St.ListingsWrapper>
          {userMldTokens.map((token) => (
            <St.TokenListing
              key={`MLD ${token.tokenId}`}
              onClick={() => {
                setActiveMld(token.tokenId);
              }}
            >
              <Image
                src={`/memes/MLD.gif`}
                height={150}
                width={150}
                alt="mld"
              />{' '}
              <St.TokenInfo>
                <St.TokenText>
                  {activeMld === token.tokenId ? 'TOKEN SELECTED' : ''}
                </St.TokenText>
                {/* <St.TokenText>ENSO #{token}</St.TokenText> */}
              </St.TokenInfo>
            </St.TokenListing>
          ))}
        </St.ListingsWrapper>

        <St.Button onClick={handleMintClick}>
          {buyButtonText}
          {activeMld && `#${activeMld}`}
        </St.Button>
      </St.BuyModalContainer>
    </>
  );
};

export default PremintModal;
