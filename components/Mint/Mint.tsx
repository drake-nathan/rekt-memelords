import * as St from './Mint.styled';
import { useEffect, useState } from 'react';
import { sono } from 'styles/fonts';
import { useAccount } from 'wagmi';
import { useUserMldTokens } from 'hooks/useUserMldTokens';
import BuyModal from 'components/Modals/BuyModal';
import ErrorModal from 'components/Modals/ErrorModal';
import SuccessModal from 'components/Modals/SuccessModal';
import MldModal from 'components/Modals/MldModal/MldModal';
import { useStoreFrontMintPrice } from 'web3/generated';
import { formatEther } from 'ethers/lib/utils.js';

const Mint = (): JSX.Element => {
  const { address } = useAccount();
  // safe to cast because user must be connected to get here
  const { data: userMldTokens } = useUserMldTokens(address as string);
  const { data: _mintPrice } = useStoreFrontMintPrice();

  const [showMldModal, setShowMldModal] = useState(false);
  const [mintOrBurn, setMintOrBurn] = useState<'mint' | 'burn'>('mint');

  const [showBuyModal, setShowBuyModal] = useState(false);
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
          setMintOrBurn={setMintOrBurn}
          setShowBuyModal={setShowBuyModal}
          selectedTokens={selectedTokens}
          setSelectedTokens={setSelectedTokens}
        />
      )}

      {showBuyModal && (
        <BuyModal
          setShowModal={setShowBuyModal}
          handleError={handleError}
          mintOrBurn={mintOrBurn as 'mint' | 'burn'}
          selectedTokens={selectedTokens}
          mintPrice={mintPrice}
          address={address as `0x${string}`}
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
