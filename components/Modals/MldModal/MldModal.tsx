import * as St from './MldModal.styled';
import { useEffect, useState } from 'react';
import { ITokenOwner } from 'services/azure';
import { sono } from 'styles/fonts';
import Checkbox from 'rc-checkbox';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleError: (error: string) => void;
  userMldTokens: ITokenOwner[];
  setMintOrBurn: React.Dispatch<React.SetStateAction<'mint' | 'burn'>>;
  setShowBuyModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTokens: number[];
  setSelectedTokens: React.Dispatch<React.SetStateAction<number[]>>;
}

const PremintModal: React.FC<Props> = ({
  setShowModal,
  handleError,
  userMldTokens,
  setMintOrBurn,
  setShowBuyModal,
  selectedTokens,
  setSelectedTokens,
}) => {
  useEffect(() => {
    setSelectedTokens(userMldTokens.map((token) => token.tokenId));
  }, [userMldTokens]);

  const handleCheckboxClick = (tokenId: number) => {
    if (selectedTokens.includes(tokenId)) {
      setSelectedTokens(selectedTokens.filter((id) => id !== tokenId));
    } else {
      setSelectedTokens([...selectedTokens, tokenId]);
    }
  };

  const handleMintClick = (mintOrBurn: 'mint' | 'burn') => {
    if (selectedTokens.length === 0) {
      handleError('Please select at least one MLD');
    } else {
      setMintOrBurn(mintOrBurn);
      setShowBuyModal(true);
    }
  };

  return (
    <>
      <St.Background onClick={() => setShowModal(false)} />
      <St.Container>
        <St.Text>Select MLD to claim with</St.Text>

        {userMldTokens && (
          <St.MldGrid>
            {userMldTokens.map((token) => {
              const { tokenId } = token;
              const isChecked = selectedTokens.includes(tokenId);

              return (
                <St.Mld key={`MLD ${tokenId}`}>
                  <Checkbox
                    checked={isChecked}
                    onClick={() => handleCheckboxClick(tokenId)}
                  />
                  <St.Text>{`#${tokenId}`}</St.Text>
                </St.Mld>
              );
            })}
          </St.MldGrid>
        )}

        <St.ButtonDiv>
          <St.Button
            className={sono.className}
            onClick={() => handleMintClick('mint')}
          >
            mint
          </St.Button>
          <St.Button
            className={sono.className}
            onClick={() => handleMintClick('burn')}
          >
            burn
          </St.Button>
        </St.ButtonDiv>
      </St.Container>
    </>
  );
};

export default PremintModal;
