import * as St from './Modals.styled';
import { useState } from 'react';
import { useMintDetails } from 'hooks/useMintDetails';
import { sono } from 'styles/fonts';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDiscount: boolean;
  handleCryptoMint: (quantity: number) => void;
  handleError: (error: string) => void;
  buyButtonText: string;
  maxMint: number;
  walletBalance: string | null;
  tokensMinted: number;
}

const BuyModal = ({
  setShowModal,
  isDiscount,
  handleCryptoMint,
  handleError,
  buyButtonText,
  maxMint,
  walletBalance,
  tokensMinted,
}: Props): JSX.Element => {
  const { mintPrice, discountPrice } = useMintDetails();

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(
    isDiscount ? discountPrice.toFixed(3) : mintPrice.toFixed(3),
  );

  const price = isDiscount ? discountPrice : mintPrice;

  const minMint = 1;
  const maxMintFinal =
    tokensMinted + maxMint > 10 ? 10 - tokensMinted : maxMint;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= minMint && newQuantity <= maxMintFinal) {
      const newTotal = newQuantity * price;

      if (walletBalance && Number(newTotal) > Number(walletBalance)) {
        return handleError('Insufficient funds');
      }

      setQuantity(newQuantity);
      setTotal((newQuantity * price).toFixed(3));
    }
  };

  return (
    <>
      <St.BuyModalBackground onClick={() => setShowModal(false)} />

      <St.BuyModalContainer>
        <St.MsgDiv>
          <St.Text>Choose Quantity</St.Text>
        </St.MsgDiv>

        {isDiscount && (
          <St.UnitDiv>
            <St.SubtleText>
              Any unclaimed discount tokens will be reallocated to the public
              mint phase.
            </St.SubtleText>
          </St.UnitDiv>
        )}

        <St.UnitDiv>
          <St.UnitText>Max: {maxMintFinal}</St.UnitText>
          <St.UnitText>Price: {price}(ETH)</St.UnitText>
        </St.UnitDiv>

        <St.UnitDiv>
          <St.UnitText>Total: {total}(ETH)</St.UnitText>
        </St.UnitDiv>

        <St.PlusMinusDiv>
          <St.PlusMinusButton
            className={sono.className}
            disabled={quantity === minMint ? true : false}
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            -
          </St.PlusMinusButton>
          <St.CounterText>{quantity}</St.CounterText>
          <St.PlusMinusButton
            className={sono.className}
            disabled={quantity === maxMintFinal ? true : false}
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </St.PlusMinusButton>
        </St.PlusMinusDiv>

        <St.Button
          className={sono.className}
          onClick={() => handleCryptoMint(quantity)}
        >
          {buyButtonText}
        </St.Button>
      </St.BuyModalContainer>
    </>
  );
};

export default BuyModal;
