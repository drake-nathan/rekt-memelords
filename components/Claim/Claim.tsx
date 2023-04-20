import * as St from './Claim.styled';
import { useEffect, useState } from 'react';
import { sono } from 'styles/fonts';
import { useAccount } from 'wagmi';
import { useUserMldTokens } from 'hooks/useUserMldTokens';
import BurnModal from 'components/Modals/BurnModal';
import ErrorModal from 'components/Modals/ErrorModal';
import MldModal from 'components/Modals/MldModal/MldModal';
import { useStoreFrontMintPrice, useTokenBalanceOf } from 'web3/generated';
import { formatEther } from 'ethers/lib/utils.js';
import MintModal from 'components/Modals/MintModal';
import { useDelegateCash } from 'hooks/useDelegateCash';
import { BigNumber } from 'ethers';

const Claim = (): JSX.Element => {
  const { address } = useAccount();
  // safe to cast because user must be connected to get here
  const { delegate } = useDelegateCash(address as `0x${string}`);
  const {
    userMldTokens,
    checkIfTokensClaimed,
    isLoading: isLoadingMldTokens,
    usingVault,
  } = useUserMldTokens(address as `0x${string}`, delegate);

  const { data: _mintPrice } = useStoreFrontMintPrice();

  const [showMldModal, setShowMldModal] = useState(false);

  const [showBurnModal, setShowBurnModal] = useState(false);
  const [showMintModal, setShowMintModal] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState<number[]>([]);
  const [mintPrice, setMintPrice] = useState<number>(0.042);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (_mintPrice) {
      setMintPrice(Number(formatEther(_mintPrice)));
    } else {
      setMintPrice(0.042);
    }
  }, [_mintPrice, mintPrice, setMintPrice]);

  const handleError = (error: string) => {
    setErrorMessage(error);
    setShowErrorModal(true);
  };

  const handleClaimClick = () => {
    setShowMldModal(true);
  };

  return (
    <St.Container>
      <St.Button className={sono.className} onClick={handleClaimClick}>
        claim
      </St.Button>

      {showMldModal && (
        <MldModal
          setShowModal={setShowMldModal}
          handleError={handleError}
          userMldTokens={userMldTokens}
          setShowBurnModal={setShowBurnModal}
          setShowMintModal={setShowMintModal}
          selectedTokens={selectedTokens}
          setSelectedTokens={setSelectedTokens}
          isLoading={isLoadingMldTokens}
          usingVault={usingVault}
        />
      )}

      {showBurnModal && selectedTokens && (
        <BurnModal
          setShowModal={setShowBurnModal}
          setShowMldModal={setShowMldModal}
          handleError={handleError}
          selectedTokens={selectedTokens}
          address={address as `0x${string}`}
          refetch={checkIfTokensClaimed}
        />
      )}

      {showMintModal && selectedTokens && (
        <MintModal
          setShowModal={setShowMintModal}
          setShowMldModal={setShowMldModal}
          handleError={handleError}
          selectedTokens={selectedTokens}
          mintPrice={mintPrice}
          address={address as `0x${string}`}
          refetch={checkIfTokensClaimed}
          vault={delegate?.vault}
        />
      )}

      {showErrorModal && (
        <ErrorModal setShowModal={setShowErrorModal} message={errorMessage} />
      )}
    </St.Container>
  );
};

export default Claim;
