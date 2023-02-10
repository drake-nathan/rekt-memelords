import * as St from '../Hero/Hero.styled';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect } from 'hooks/useEagerConnect';
import { useMintDetails } from 'hooks/useMintDetails';
import { useContract } from 'hooks/useContract';
import { useWeb3 } from 'hooks/useWeb3';
import { publicMint, discountMint, ISuccessInfo } from './web3Helpers';
import { sono } from 'styles/fonts';
import {
  checkIfUserHasClaimedDiscount,
  checkTokensMintedByWallet,
} from 'web3/contractInteractions';
import ConnectModal from 'components/Modals/ConnectModal';
import BuyModal from 'components/Modals/BuyModal';
import ErrorModal from 'components/Modals/ErrorModal';
import SuccessModal from 'components/Modals/SuccessModal';
import { getAllowlistStatus, AllowlistStatus } from 'utils/getAllowlistStatus';
import { MintPhase } from 'web3/types';

const Web3Buttons = (): JSX.Element => {
  useEagerConnect();
  const web3 = useWeb3();
  const { active, account } = useWeb3React();
  const {
    mintPhase,
    mintPrice,
    discountPrice,
    maxSupply,
    maxDiscountMint,
    maxPublicMint,
  } = useMintDetails();
  const { contract } = useContract();

  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const [allowlistInfo, setAllowlistInfo] = useState({
    allowlistStatus: AllowlistStatus.NotAllowlisted,
    amountOfTokens: 0,
    merkleProof: [''],
  });

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successInfo, setSuccessInfo] = useState<ISuccessInfo>();

  const [cryptoButtonText, setCryptoButtonText] = useState('CONNECT WALLET');
  const [buyButtonText, setBuyButtonText] = useState('MINT');

  const [walletBalance, setWalletBalance] = useState('0');
  const [maxMint, setMaxMint] = useState(maxPublicMint);
  const price = mintPhase === MintPhase.discount ? discountPrice : mintPrice;

  const [tokensMinted, setTokensMinted] = useState(0);

  const handleError = (error: string) => {
    setErrorMessage(error);
    setShowErrorModal(true);
  };

  const handleMintClick = async () => {
    if (mintPhase === MintPhase.closed) {
      return handleError('Mint is not live yet');
    }

    if (!active) {
      return setShowConnectModal(!showConnectModal);
    }

    if (
      mintPhase === MintPhase.discount &&
      allowlistInfo.allowlistStatus === AllowlistStatus.NotAllowlisted
    ) {
      return handleError('Must be allowlisted to mint during this phase');
    }

    if (
      mintPhase === MintPhase.discount &&
      allowlistInfo.allowlistStatus === AllowlistStatus.Allowlisted
    ) {
      const hasClaimed = await checkIfUserHasClaimedDiscount(
        contract,
        account as string,
      );

      if (hasClaimed) {
        return handleError('You have already claimed your discount allocation');
      }
    }

    if (Number(price) > Number(walletBalance)) {
      return handleError('Insufficient funds');
    }

    if (tokensMinted >= maxDiscountMint) {
      return handleError('Cannot mint more than 10 tokens per wallet total');
    }

    setBuyButtonText('MINT');
    setShowBuyModal(true);
  };

  const handleMint = async (numberOfTokens: number) => {
    try {
      if (
        mintPhase === MintPhase.discount &&
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
    if (!active) {
      setCryptoButtonText('CONNECT WALLET');
      closeAllModals();
    }

    if (account && mintPhase === MintPhase.discount) {
      const allowListInfo = getAllowlistStatus(account);
      console.info(allowListInfo);
      setAllowlistInfo(allowListInfo);
      setMaxMint(allowListInfo.amountOfTokens);
    }

    setCryptoButtonText('MINT');
    setTimeout(() => {
      setShowConnectModal(false);
    }, 2000);

    if (account) {
      web3.eth
        .getBalance(account)
        .then((balance) => {
          setWalletBalance(web3.utils.fromWei(balance, 'ether'));
        })
        .catch(console.error);

      checkTokensMintedByWallet(contract, account)
        .then((res) => {
          if (res) {
            setTokensMinted(res);
            console.log('tokens minted', res);
          }
        })
        .catch(console.error);
    }
  }, [active, account]);

  return (
    <St.ButtonContainer>
      <St.Button className={sono.className} onClick={handleMintClick}>
        {cryptoButtonText}
      </St.Button>

      {showConnectModal && <ConnectModal setShowModal={setShowConnectModal} />}

      {showBuyModal && (
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
