import * as St from './MldModal.styled';
import { useEffect } from 'react';
import { sono } from 'styles/fonts';
import Checkbox from 'rc-checkbox';
import { BarLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleError: (error: string) => void;
  userMldTokens: number[];
  setShowBurnModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMintModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTokens: number[];
  setSelectedTokens: React.Dispatch<React.SetStateAction<number[]>>;
  isLoading: boolean;
  usingVault: boolean;
}

const MldModal: React.FC<Props> = ({
  setShowModal,
  handleError,
  userMldTokens,
  setShowBurnModal,
  setShowMintModal,
  selectedTokens,
  setSelectedTokens,
  isLoading,
  usingVault,
}) => {
  const { colors } = useTheme();

  useEffect(() => {
    setSelectedTokens(userMldTokens);
  }, [userMldTokens]);

  const handleCheckboxClick = (tokenId: number) => {
    if (selectedTokens.includes(tokenId)) {
      setSelectedTokens(selectedTokens.filter((id) => id !== tokenId));
    } else {
      setSelectedTokens([...selectedTokens, tokenId]);
    }
  };

  const handleBurnClick = async () => {
    if (!selectedTokens.length) {
      handleError('Please select an MLD to claim with');
    } else {
      setShowBurnModal(true);
    }
  };

  const handleMintClick = async () => {
    if (!selectedTokens.length) {
      handleError('Please select an MLD to claim with');
    } else {
      setShowMintModal(true);
    }
  };

  return (
    <>
      <St.Background onClick={() => setShowModal(false)} />
      <St.Container>
        {isLoading ? (
          <BarLoader color={colors.textMain} height="10px" width="300px" />
        ) : (
          <>
            {userMldTokens.length ? (
              <>
                <St.Text>Select MLD to claim with</St.Text>
                {usingVault && (
                  <St.SubtleText>
                    Delegate.cash detected, burns diabled when using delegate
                  </St.SubtleText>
                )}
                <St.TextButtonDiv>
                  <St.TextButton
                    onClick={() => setSelectedTokens(userMldTokens)}
                  >
                    select all
                  </St.TextButton>
                  <St.TextButton onClick={() => setSelectedTokens([])}>
                    deselect all
                  </St.TextButton>
                </St.TextButtonDiv>
                <St.MldGrid>
                  {userMldTokens.map((tokenId) => {
                    const isChecked = selectedTokens.includes(tokenId);
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
              </>
            ) : (
              <St.Text>You have no MLD to claim with</St.Text>
            )}

            {/* <St.Form>
              <St.Label htmlFor="input-number">Specify token id</St.Label>
              <St.Input
                id="input-number"
                type="number"
                className={sono.className}
                onChange={(e) => {
                  const tokenId = parseInt(e.target.value);

                  setSelectedTokens([tokenId]);
                }}
              />
            </St.Form> */}

            <St.ButtonDiv>
              <St.Button className={sono.className} onClick={handleMintClick}>
                mint
              </St.Button>
              <St.Button
                disabled={usingVault}
                className={sono.className}
                onClick={handleBurnClick}
              >
                burn
              </St.Button>
            </St.ButtonDiv>
          </>
        )}
      </St.Container>
    </>
  );
};

export default MldModal;
