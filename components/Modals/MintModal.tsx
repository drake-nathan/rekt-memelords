import * as St from './Modals.styled';
import { sono } from 'styles/fonts';
import { useBalance } from 'wagmi';
import { zeroAddress } from 'utils/constants';
import { BigNumber } from 'ethers';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleError: (error: string) => void;
  mintOrBurn: 'mint' | 'burn';
  selectedTokens: number[];
  mintPrice: number;
  address: `0x${string}`;
}

const MintModal = ({
  setShowModal,
  selectedTokens,
  mintPrice,
  address,
}: Props): JSX.Element => {
  const balance = useBalance();

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

  return (
    <>
      <St.BuyModalBackground onClick={() => setShowModal(false)} />

      <St.BuyModalContainer>
        <St.UnitDiv>
          <St.UnitText>Quantity: {quantity}</St.UnitText>
        </St.UnitDiv>

        <St.UnitDiv>
          <St.UnitText>Price: {mintPrice}(ETH)</St.UnitText>
        </St.UnitDiv>

        <St.UnitDiv>
          <St.UnitText>Total: {total}(ETH)</St.UnitText>
        </St.UnitDiv>

        <St.Button className={sono.className}>mint</St.Button>
      </St.BuyModalContainer>
    </>
  );
};

export default MintModal;
