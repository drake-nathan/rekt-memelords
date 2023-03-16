import { BigNumber } from 'ethers';
import { useChainId } from 'wagmi';
import {
  storeFrontAddress,
  useMldSetApprovalForAll,
  usePrepareMldSetApprovalForAll,
  useMldApprove,
  usePrepareMldApprove,
} from 'web3/generated';

interface ReturnType {
  approveBurn: (() => void) | undefined;
  burnSuccess: boolean;
  burnError: boolean;
}

export const useApproveBurn = (selectedTokens: number[]): ReturnType => {
  const chainId = useChainId() as 1 | 5;
  const storefrontAddress = storeFrontAddress[chainId];

  const { config: configApprove } = usePrepareMldApprove({
    args: [storefrontAddress, BigNumber.from(selectedTokens[0])],
  });
  const {
    write: writeApprove,
    isSuccess: isApproveSuccess,
    isError: isApproveError,
  } = useMldApprove(configApprove);

  const { config: configApproveAll } = usePrepareMldSetApprovalForAll({
    args: [storefrontAddress, true],
  });
  const {
    write: writeApproveAll,
    isSuccess: isApproveAllSuccess,
    isError: isApproveAllError,
  } = useMldSetApprovalForAll(configApproveAll);

  if (selectedTokens.length === 1) {
    return {
      approveBurn: writeApprove,
      burnSuccess: isApproveSuccess,
      burnError: isApproveError,
    };
  } else {
    return {
      approveBurn: writeApproveAll,
      burnSuccess: isApproveAllSuccess,
      burnError: isApproveAllError,
    };
  }
};
