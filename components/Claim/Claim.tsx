import * as St from './Claim.styled';
import { useEffect, useState } from 'react';
import { sono } from 'styles/fonts';
import { useAccount } from 'wagmi';
import { useUserMldTokens } from 'hooks/useUserMldTokens';
import BurnModal from 'components/Modals/BurnModal';
import ErrorModal from 'components/Modals/ErrorModal';
import SuccessModal from 'components/Modals/SuccessModal';
import MldModal from 'components/Modals/MldModal/MldModal';
import { useStoreFrontMintPrice } from 'web3/generated';
import { formatEther } from 'ethers/lib/utils.js';

const Mint = (): JSX.Element => {
  const { address } = useAccount();
  // safe to cast because user must be connected to get here
  const { userMldTokens, refetch } = useUserMldTokens(address as string);
  const { data: _mintPrice } = useStoreFrontMintPrice();

  const [showMldModal, setShowMldModal] = useState(false);

  const [showBurnModal, setShowBurnModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<number>();
  const [mintPrice, setMintPrice] = useState<number>(0.042);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [successInfo, setSuccessInfo] = useState<ISuccessInfo>();

  useEffect(() => {
    if (_mintPrice) {
      setMintPrice(Number(formatEther(_mintPrice)));
    } else {
      setMintPrice(0.042);
    }
  }, [mintPrice]);

  const handleError = (error: string) => {
    setErrorMessage(error);
    setShowErrorModal(true);
  };

  const handleClaimClick = () => {
    if (!userMldTokens || userMldTokens.length === 0) {
      handleError('You have no MLDs to claim');
      return;
    }
    setShowMldModal(true);
  };

  // const handleSuccess = (successInfo: ISuccessInfo) => {
  //   setSuccessInfo(successInfo);
  //   setShowSuccessModal(true);
  // };

  return (
    <St.Container>
      <St.Button className={sono.className} onClick={handleClaimClick}>
        claim
      </St.Button>

      {showMldModal && userMldTokens && (
        <MldModal
          setShowModal={setShowMldModal}
          handleError={handleError}
          userMldTokens={userMldTokens}
          setShowBurnModal={setShowBurnModal}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
        />
      )}

      {showBurnModal && selectedToken && (
        <BurnModal
          setShowModal={setShowBurnModal}
          handleError={handleError}
          selectedToken={selectedToken}
          address={address as `0x${string}`}
          refetch={refetch}
        />
      )}

      {showErrorModal && (
        <ErrorModal setShowModal={setShowErrorModal} message={errorMessage} />
      )}

      {/* {showSuccessModal && (
        <SuccessModal
          setShowModal={setShowSuccessModal}
          successInfo={successInfo as ISuccessInfo}
        />
      )} */}
    </St.Container>
  );
};

export default Mint;
