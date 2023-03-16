import * as St from './Modals.styled';
import { sono } from 'styles/fonts';
import { useBalance } from 'wagmi';
import {
  usePrepareStoreFrontClaim,
  useStoreFrontClaim,
  usePrepareMldSetApprovalForAll,
  storeFrontAddress,
  useMldSetApprovalForAll,
} from 'web3/generated';
import { zeroAddress } from 'utils/constants';
import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import { useApproveBurn } from 'hooks/useApproveBurn';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleError: (error: string) => void;
  mintOrBurn: 'mint' | 'burn';
  selectedTokens: number[];
  mintPrice: number;
  address: `0x${string}`;
}

const BuyModal = ({
  setShowModal,
  handleError,
  mintOrBurn,
  selectedTokens,
  mintPrice,
  address,
}: Props): JSX.Element => {
  const balance = useBalance();
  const { approveBurn, burnError, burnSuccess } =
    useApproveBurn(selectedTokens);

  const vault = zeroAddress;

  const quantity = selectedTokens.length;
  const total = (quantity * mintPrice).toFixed(3);

  // convert selectedTokens to bigNumber
  const claimTokens = selectedTokens.map((tokenId) => BigNumber.from(tokenId));

  // const { config } = usePrepareStoreFrontClaim({
  //   args: [address, claimTokens, vault],
  //   overrides: {
  //     from: address,
  //     value: parseEther(total),
  //   },
  // });
  // console.log(config);
  // const { write } = useStoreFrontClaim(config);

  const handleBurnClick = async () => {
    approveBurn?.();
  };

  return (
    <>
      <St.BuyModalBackground onClick={() => setShowModal(false)} />

      <St.BuyModalContainer>
        {mintOrBurn === 'mint' ? (
          <>
            <St.UnitDiv>
              <St.UnitText>Quantity: {quantity}</St.UnitText>
            </St.UnitDiv>

            <St.UnitDiv>
              <St.UnitText>Price: {mintPrice}(ETH)</St.UnitText>
            </St.UnitDiv>

            <St.UnitDiv>
              <St.UnitText>Total: {total}(ETH)</St.UnitText>
            </St.UnitDiv>
          </>
        ) : (
          <>
            <St.UnitDiv>
              <St.UnitText>
                Are you sure you want to burn {quantity} MLD tokens for{' '}
                {quantity} PML tokens?
              </St.UnitText>
            </St.UnitDiv>

            <St.UnitDiv>
              <St.UnitText>This is not reversible.</St.UnitText>
            </St.UnitDiv>

            <St.UnitDiv>
              <St.UnitText>
                First, you will be asked to approve MLD tokens for burning.
              </St.UnitText>
            </St.UnitDiv>
          </>
        )}

        <St.Button
          className={sono.className}
          onClick={
            mintOrBurn === 'burn' ? handleBurnClick : () => console.log('butts')
          }
        >
          {mintOrBurn === 'mint' ? 'mint' : 'burn them fuckers'}
        </St.Button>
      </St.BuyModalContainer>
    </>
  );
};

export default BuyModal;
