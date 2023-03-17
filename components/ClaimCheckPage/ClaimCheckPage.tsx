import * as St from './ClaimCheckPage.styled';
import { useState } from 'react';
import { sono } from 'styles/fonts';
import ErrorModal from 'components/Modals/ErrorModal';
import { claimed } from 'web3/ethers';

const CheckClaimPage = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tokenId = e.currentTarget.tokenId.value;

    const isClaimed = await claimed(tokenId);

    if (isClaimed) {
      setMessage(`MLD #${tokenId} has already been claimed.`);
      setShowModal(true);
    } else {
      setMessage(`MLD #${tokenId} has not been claimed yet.`);
      setShowModal(true);
    }
  };

  return (
    <>
      <St.Container>
        <St.Heading>
          Check if MLD has already been used to claim the current mint.
        </St.Heading>
        <St.Form onSubmit={handleSubmit}>
          <St.Input
            type="number"
            id="tokenId"
            placeholder="Token ID"
            className={sono.className}
          />
          <St.Button type="submit" className={sono.className}>
            check
          </St.Button>
        </St.Form>
      </St.Container>

      {showModal && (
        <ErrorModal setShowModal={setShowModal} message={message} />
      )}
    </>
  );
};

export default CheckClaimPage;
