import * as St from './Modals.styled';
import { sono } from 'styles/fonts';
import {
  storeFrontAddress,
  usePrepareMldSetApprovalForAll,
  useMldSetApprovalForAll,
  useMldIsApprovedForAll,
  usePrepareStoreFrontBurnAndClaim,
  useStoreFrontBurnAndClaim,
} from 'web3/generated';
import { useChainId, UserRejectedRequestError } from 'wagmi';
import { useState } from 'react';
import { BarLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMldModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleError: (error: string) => void;
  selectedTokens: number[];
  address: `0x${string}`;
  refetch: () => void;
}

const BurnModal = ({
  setShowModal,
  setShowMldModal,
  handleError,
  selectedTokens,
  address,
  refetch,
}: Props): JSX.Element => {
  const chainId = useChainId() as 1 | 5;
  const { colors } = useTheme();
  const storefrontAddress = storeFrontAddress[chainId];

  const [isLoading, setIsLoading] = useState(false);

  const { data: isApproved, refetch: refetchIsApproved } =
    useMldIsApprovedForAll({
      args: [address, storefrontAddress],
    });
  const { config: configApproveAll } = usePrepareMldSetApprovalForAll({
    args: [storefrontAddress, true],
  });
  const { write: setApproval } = useMldSetApprovalForAll({
    ...configApproveAll,
    onSuccess: (data) => {
      setIsLoading(true);
      data.wait().then((receipt) => {
        refetchIsApproved().then(() => setIsLoading(false));
      });
    },
    onError: (error) => {
      setIsLoading(false);
      console.error(error);
      handleError('something went wrong, ngmi');
    },
  });

  const handleApproveClick = () => {
    setApproval?.();
  };

  const { config: burnAndClaimConfig } = usePrepareStoreFrontBurnAndClaim({
    args: [selectedTokens],
    onError: (error) => {
      console.error(selectedTokens);
      console.error(error);
      setShowModal(false);
      handleError(
        'these tokens may have already been claimed, let us know if this is not the case',
      );
    },
  });
  const { write } = useStoreFrontBurnAndClaim({
    ...burnAndClaimConfig,
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

  const handleBurnClick = () => {
    write?.();
  };

  return (
    <>
      <St.BuyModalBackground onClick={() => setShowModal(false)} />

      <St.BuyModalContainer>
        {!isApproved ? (
          isLoading ? (
            <>
              <St.UnitDiv>
                <St.UnitText>
                  setting burn approval on MLD contract...
                </St.UnitText>
              </St.UnitDiv>
              <BarLoader color={colors.textMain} height="10px" width="300px" />
            </>
          ) : (
            <>
              <St.UnitDiv>
                <St.UnitText>
                  First, you will need to approve MLD tokens for burning.
                </St.UnitText>
              </St.UnitDiv>
              <St.UnitDiv>
                <St.UnitText>
                  This is the same approval you would set for a marketplace, you
                  can revoke it after you burn.
                </St.UnitText>
              </St.UnitDiv>
              <St.Button
                className={sono.className}
                onClick={handleApproveClick}
              >
                set burn approval
              </St.Button>
            </>
          )
        ) : isLoading ? (
          <>
            <St.UnitDiv>
              <St.UnitText>
                lighting your tokens on fire, lemme find my lighter
              </St.UnitText>
            </St.UnitDiv>
            <BarLoader color={colors.textMain} height="10px" width="300px" />
          </>
        ) : (
          <>
            <St.UnitDiv>
              <St.UnitText>
                Are you sure you want to burn MLD for PML?
              </St.UnitText>
            </St.UnitDiv>
            <St.UnitDiv>
              <St.UnitText>This is not reversible!</St.UnitText>
            </St.UnitDiv>
            <St.Button className={sono.className} onClick={handleBurnClick}>
              burn me daddy
            </St.Button>
          </>
        )}
      </St.BuyModalContainer>
    </>
  );
};

export default BurnModal;
