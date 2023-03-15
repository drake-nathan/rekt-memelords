import * as St from './Mint.styled';
import { useEffect, useState } from 'react';
import { ISuccessInfo } from './helpers/mintFunctions';
import { sono } from 'styles/fonts';
import { useAccount } from 'wagmi';
import { useUserMldTokens } from 'hooks/useUserMldTokens';
import BuyModal from 'components/Modals/BuyModal';
import ErrorModal from 'components/Modals/ErrorModal';
import SuccessModal from 'components/Modals/SuccessModal';
import MldModal from 'components/Modals/MldModal/MldModal';

const Mint = (): JSX.Element => {
  const { address } = useAccount();

  // safe to cast because user must be connected to get here
  const { data: userMldTokens } = useUserMldTokens(
    '0x56ee8bD11b5A385d3d533B4c2c6E37DE78b2aAFb',
  );

  // useEffect(() => {
  //   console.log(query.data);
  // }, []);

  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showMldModal, setShowMldModal] = useState(true);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successInfo, setSuccessInfo] = useState<ISuccessInfo>();

  const [mintButtonText, setMintButtonText] = useState('mint');
  const [burnButtonText, setBurnButtonText] = useState('bern');
  const [buyButtonText, setBuyButtonText] = useState('MINT');

  const handleError = (error: string) => {
    setErrorMessage(error);
    setShowErrorModal(true);
  };

  const handleMintClick = async () => {
    // if (isMintClosed(mintPhase)) {
    //   return handleError('Mint is not live yet');
    // }
    // if (!active) {
    //   return setShowConnectModal(!showConnectModal);
    // }
    // if (
    //   mintPhase === MintPhase.discount &&
    //   allowlistInfo.allowlistStatus === AllowlistStatus.NotAllowlisted
    // ) {
    //   return handleError('Must be allowlisted to mint during this phase');
    // } else {
    //   const hasClaimed = await checkIfUserHasClaimedDiscount(
    //     contract,
    //     account as string,
    //   );
    //   if (hasClaimed) {
    //     return handleError('You have already claimed your discount allocation');
    //   }
    // }
    // if (walletBalance && Number(price) > Number(walletBalance)) {
    //   return handleError('Insufficient funds');
    // }
    // if (tokensMinted >= 10) {
    //   return handleError('Cannot mint more than 10 tokens per wallet total');
    // }
    // setBuyButtonText('MINT');
    // setShowBuyModal(true);
  };

  // const handleMint = async (numberOfTokens: number) => {
  //   try {
  //     if (
  //       mintPhase === MintPhase.discount &&
  //       allowlistInfo.allowlistStatus === AllowlistStatus.Allowlisted
  //     ) {
  //       const payableAmount = numberOfTokens * discountPrice;

  //       discountMint(
  //         contract,
  //         maxSupply,
  //         account as string,
  //         payableAmount,
  //         numberOfTokens,
  //         allowlistInfo.merkleProof,
  //         handleError,
  //         handleSuccess,
  //         setBuyButtonText,
  //         setShowBuyModal,
  //       );
  //     } else {
  //       const payableAmount = numberOfTokens * mintPrice;

  //       publicMint(
  //         contract,
  //         maxSupply,
  //         account as string,
  //         payableAmount,
  //         numberOfTokens,
  //         handleError,
  //         handleSuccess,
  //         setBuyButtonText,
  //         setShowBuyModal,
  //       );
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     handleError('Error minting token');
  //   }
  // };

  const handleSuccess = (successInfo: ISuccessInfo) => {
    setSuccessInfo(successInfo);
    setShowSuccessModal(true);
  };

  const closeAllModals = () => {
    setShowBuyModal(false);
    setShowErrorModal(false);
    setShowSuccessModal(false);
  };

  // useEffect(() => {
  //   if (!active) {
  //     setMintButtonText('CONNECT WALLET');
  //     closeAllModals();
  //   }

  //   if (active && account && mintPhase === MintPhase.discount) {
  //     const allowListInfo = getAllowlistStatus(account);
  //     setAllowlistInfo(allowListInfo);
  //     setMaxMint(allowListInfo.amountOfTokens);
  //   }

  //   if (active && account) {
  //     setMintButtonText('MINT');
  //     setTimeout(() => {
  //       setShowConnectModal(false);
  //     }, 1500);
  //   }
  // }, [active, account]);

  return (
    <St.Container>
      <St.Button className={sono.className} onClick={handleMintClick}>
        {mintButtonText}
      </St.Button>

      <St.Button className={sono.className}>{burnButtonText}</St.Button>

      {/* {showBuyModal && (
        <BuyModal
          setShowModal={setShowBuyModal}
          isDiscount={mintPhase === MintPhase.discount}
          handleCryptoMint={handleMint}
          handleError={handleError}
          buyButtonText={buyButtonText}
          maxMint={maxMint}
          walletBalance={walletBalance}
          tokensMinted={tokensMinted}
        />
      )} */}

      {showMldModal && userMldTokens && (
        <MldModal
          setShowModal={setShowMldModal}
          handleError={handleError}
          buyButtonText={buyButtonText}
          userMldTokens={userMldTokens}
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
    </St.Container>
  );
};

export default Mint;
