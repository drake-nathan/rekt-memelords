import * as St from './Modals.styled';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Connectors, connectors } from 'web3/connectors';
import { sono } from 'styles/fonts';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConnectModal = ({ setShowModal }: Props): JSX.Element => {
  const { activate, active } = useWeb3React();

  const [txMsg, setTxMsg] = useState('');

  const handleConnectWallet = async (connectorToUse: Connectors) => {
    const connector = connectors[connectorToUse];

    try {
      await activate(connector);
    } catch (err) {
      console.error(err);
      setTxMsg('ERROR, PLEASE TRY AGAIN');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setTxMsg('');
    }, 5000);
  }, [txMsg]);

  useEffect(() => {
    if (active) {
      setTxMsg('SUCCESSFULLY CONNECTED');
    }
  }, [active]);

  return (
    <>
      <St.ModalBackground onClick={handleCloseModal}></St.ModalBackground>
      <St.ModalContainer>
        <St.MsgDiv>
          <St.Text>{txMsg ? txMsg : 'CHOOSE CONNECT METHOD'}</St.Text>
        </St.MsgDiv>

        <St.Button
          className={sono.className}
          onClick={() => handleConnectWallet(Connectors.Injected)}
        >
          METAMASK
        </St.Button>
        <St.Button
          className={sono.className}
          onClick={() => handleConnectWallet(Connectors.WalletConnect)}
        >
          WALLETCONNECT
        </St.Button>
        <St.Button
          className={sono.className}
          onClick={() => handleConnectWallet(Connectors.Coinbase)}
        >
          COINBASE
        </St.Button>
      </St.ModalContainer>
    </>
  );
};

export default ConnectModal;
