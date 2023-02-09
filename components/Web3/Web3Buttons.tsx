import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect } from 'hooks/useEagerConnect';
import { useMintDetails } from 'hooks/useMintDetails';
import { useContract } from 'hooks/useContract';
import { publicMint, discountMint, ISuccessInfo } from './web3Helpers';
import { checkIfUserHasClaimedDiscount } from 'web3/contractInteractions';
import ConnectModal from 'components/Modals/ConnectModal';
import BuyModal from 'components/Modals/BuyModal';
import ErrorModal from 'components/Modals/ErrorModal';
import SuccessModal from 'components/Modals/SuccessModal';
import { getAllowlistStatus, AllowlistStatus } from 'utils/getAllowlistStatus';
import * as St from '../Hero/Hero.styled';

const Web3Buttons: React.FC = () => {
  useEagerConnect();
  const { active, account } = useWeb3React();
  const { isDiscountMint, mintPrice, maxSupply, discountPrice, isMintLive } =
    useMintDetails();
  const { contract } = useContract();

  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const [allowlistInfo, setAllowlistInfo] = useState({
    allowlistStatus: AllowlistStatus.NotAllowlisted,
    merkleProof: [''],
  });

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successInfo, setSuccessInfo] = useState<ISuccessInfo>();

  const [cryptoButtonText, setCryptoButtonText] = useState('CONNECT WALLET');
  const [buyButtonText, setBuyButtonText] = useState('MINT');

  const handleError = (error: string) => {
    setErrorMessage(error);
    setShowErrorModal(true);
  };

  const handleCryptoClick = async () => {
    if (!isMintLive) {
      return handleError('MINT IS NOT LIVE YET');
    }

    if (!active) {
      setShowConnectModal(!showConnectModal);
    } else if (
      isDiscountMint &&
      allowlistInfo.allowlistStatus === AllowlistStatus.NotAllowlisted
    ) {
      handleError('MUST BE ALLOWLISTED TO MINT DURING THIS PHASE');
    } else {
      setBuyButtonText('MINT');
      setShowBuyModal(true);
    }
  };

  const handleMintClick = async (numberOfTokens: number) => {
    try {
      if (
        isDiscountMint &&
        allowlistInfo.allowlistStatus === AllowlistStatus.Allowlisted
      ) {
        const payableAmount = numberOfTokens * discountPrice;

        discountMint(
          contract,
          maxSupply,
          account as string,
          payableAmount,
          numberOfTokens,
          allowlistInfo.merkleProof,
          handleError,
          handleSuccess,
          setBuyButtonText,
          setShowBuyModal,
        );
      } else {
        const payableAmount = numberOfTokens * mintPrice;

        publicMint(
          contract,
          maxSupply,
          account as string,
          payableAmount,
          numberOfTokens,
          handleError,
          handleSuccess,
          setBuyButtonText,
          setShowBuyModal,
        );
      }
    } catch (err) {
      console.error(err);
      handleError('Error minting token');
    }
  };

  const handleSuccess = (successInfo: ISuccessInfo) => {
    setSuccessInfo(successInfo);
    setShowSuccessModal(true);
  };

  const closeAllModals = () => {
    setShowConnectModal(false);
    setShowBuyModal(false);
    setShowErrorModal(false);
    setShowSuccessModal(false);
  };

  useEffect(() => {
    if (active) {
      if (account) {
        getAllowlistStatus(account)
          .then((status) => {
            if (status) setAllowlistInfo(status);
          })
          .catch((err) => {
            console.error(err);
            setAllowlistInfo({
              allowlistStatus: AllowlistStatus.NotAllowlisted,
              merkleProof: [''],
            });
          });
      }

      setCryptoButtonText('MINT');
      setTimeout(() => {
        setShowConnectModal(false);
      }, 2000);
    }

    if (!active) {
      setCryptoButtonText('CONNECT WALLET');
      closeAllModals();
    }
  }, [active]);

  return (
    <St.ButtonContainer>
      <St.Button onClick={handleCryptoClick}>{cryptoButtonText}</St.Button>

      {showConnectModal && <ConnectModal setShowModal={setShowConnectModal} />}

      {showBuyModal && (
        <BuyModal
          setShowModal={setShowBuyModal}
          isDiscount={isDiscountMint}
          handleCryptoMint={handleMintClick}
          handleError={handleError}
          buyButtonText={buyButtonText}
        />
      )}

      {showErrorModal && (
        <ErrorModal setShowModal={setShowErrorModal} message={errorMessage} />
      )}

      {showSuccessModal && (
        <SuccessModal
          setShowModal={setShowSuccessModal}
          successInfo={successInfo as ISuccessInfo}
        />
      )}
    </St.ButtonContainer>
  );
};

export default Web3Buttons;
