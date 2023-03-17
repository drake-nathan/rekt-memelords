import * as St from './MldModal.styled';
import { useEffect } from 'react';
import { sono } from 'styles/fonts';
import Checkbox from 'rc-checkbox';
import { claimed } from 'web3/ethers';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleError: (error: string) => void;
  userMldTokens: number[];
  setShowBurnModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedToken: number;
  setSelectedToken: React.Dispatch<React.SetStateAction<number>>;
}

const PremintModal: React.FC<Props> = ({
  setShowModal,
  handleError,
  userMldTokens,
  setShowBurnModal,
  selectedToken,
  setSelectedToken,
}) => {
  useEffect(() => {
    setSelectedToken(userMldTokens[0]);
  }, [userMldTokens]);

  const handleCheckboxClick = (tokenId: number) => {
    setSelectedToken(tokenId);
    // if (selectedToken.includes(tokenId)) {
    //   setselectedToken(selectedToken.filter((id) => id !== tokenId));
    // } else {
    //   setselectedToken([...selectedToken, tokenId]);
    // }
  };

  const handleBurnClick = async () => {
    const isClaimed = await claimed(selectedToken);

    if (isClaimed) {
      setShowBurnModal(false);
      handleError('MLD already claimed');
    } else if (!selectedToken) {
      setShowBurnModal(false);
      handleError('Please select at least one MLD');
    } else {
      setShowBurnModal(true);
    }
  };

  return (
    <>
      <St.Background onClick={() => setShowModal(false)} />
      <St.Container>
        <St.Text>Select MLD to claim with</St.Text>

        {userMldTokens && (
          <St.MldGrid>
            {userMldTokens.map((tokenId) => {
              const isChecked = selectedToken === tokenId;

              return (
                <St.Mld
                  key={`MLD ${tokenId}`}
                  onClick={() => handleCheckboxClick(tokenId)}
                >
                  <Checkbox checked={isChecked} />
                  <St.Text>{`#${tokenId}`}</St.Text>
                </St.Mld>
              );
            })}
          </St.MldGrid>
        )}

        <St.ButtonDiv>
          <St.Button className={sono.className}>mint</St.Button>
          <St.Button className={sono.className} onClick={handleBurnClick}>
            burn
          </St.Button>
        </St.ButtonDiv>
      </St.Container>
    </>
  );
};

export default PremintModal;
