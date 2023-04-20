import * as St from './Modals.styled';
import { sono } from 'styles/fonts';
import { UserRejectedRequestError } from 'wagmi';
import { zeroAddress } from 'utils/constants';
import { parseEther } from 'ethers/lib/utils.js';
import {
  usePrepareStoreFrontFreeClaim,
  useStoreFrontClaim,
  useStoreFrontFreeClaim,
} from 'web3/generated';
import { useState } from 'react';
import { BarLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMldModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleError: (error: string) => void;
  selectedTokens: number[];
  mintPrice: number;
  address: `0x${string}`;
  refetch: () => void;
  vault?: `0x${string}`;
}

const MintModal = ({
  setShowModal,
  setShowMldModal,
  handleError,
  selectedTokens,
  mintPrice,
  address,
  refetch,
  vault,
}: Props): JSX.Element => {
  const { colors } = useTheme();
  const quantity = selectedTokens.length;
  const total = quantity * mintPrice;
  const displayPrice =
    mintPrice === 0 ? 'mfkin free bitchez!' : `${mintPrice}(ETH)`;

  const [isLoading, setIsLoading] = useState(false);

  const { config } = usePrepareStoreFrontFreeClaim({
    args: [address, selectedTokens, vault ?? zeroAddress],
    overrides: {
      from: address,
    },
    onError: (error) => {
      console.info(config);
      console.error(error);
      setShowModal(false);
      handleError(
        'these tokens may have already been claimed, or you may not have enough ETH to mint',
      );
    },
  });

  const { write } = useStoreFrontFreeClaim({
    ...config,
    onSuccess: (data) => {
      setIsLoading(true);
      data.wait().then((receipt) => {
        setIsLoading(false);
        setShowModal(false);
        handleError('much success! check your wallet.');
        refetch();
        setShowMldModal(false);
      });
    },
    onError: (error) => {
      setIsLoading(false);
      if (error instanceof UserRejectedRequestError) return;
      console.error(error);
      handleError('something went wrong, ngmi');
    },
  });

  const handleMintClick = () => {
    write?.();
  };

  return (
    <>
      <St.BuyModalBackground onClick={() => setShowModal(false)} />

      <St.BuyModalContainer>
        {isLoading ? (
          <>
            <St.UnitDiv>
              <St.UnitText>minting feet pics, please wait...</St.UnitText>
            </St.UnitDiv>
            <BarLoader color={colors.textMain} height="10px" width="300px" />
          </>
        ) : (
          <>
            <St.UnitDiv>
              <St.UnitText>Quantity: {quantity}</St.UnitText>
            </St.UnitDiv>

            <St.UnitDiv>
              <St.UnitText>Price: {displayPrice}</St.UnitText>
            </St.UnitDiv>

            {total > 0 && (
              <St.UnitDiv>
                <St.UnitText>Total: {total.toFixed(3)}(ETH)</St.UnitText>
              </St.UnitDiv>
            )}

            <St.Button onClick={handleMintClick} className={sono.className}>
              mint
            </St.Button>
          </>
        )}
      </St.BuyModalContainer>
    </>
  );
};

export default MintModal;
