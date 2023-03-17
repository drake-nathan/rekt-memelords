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
import MintModal from 'components/Modals/MintModal';

const Mint = (): JSX.Element => {
  const { address } = useAccount();
  // safe to cast because user must be connected to get here
  const { userMldTokens, refetch, isLoading, isFetching } = useUserMldTokens(
    address as string,
  );
  const { data: _mintPrice } = useStoreFrontMintPrice();

  const [showMldModal, setShowMldModal] = useState(false);

  const [showBurnModal, setShowBurnModal] = useState(false);
  const [showMintModal, setShowMintModal] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState<number[]>([]);
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
          setShowMintModal={setShowMintModal}
          selectedTokens={selectedTokens}
          setSelectedTokens={setSelectedTokens}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}

      {showBurnModal && selectedTokens && (
        <BurnModal
          setShowModal={setShowBurnModal}
          setShowMldModal={setShowMldModal}
          handleError={handleError}
          selectedTokens={selectedTokens}
          address={address as `0x${string}`}
          refetch={refetch}
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
