import axios from 'axios';
import { proofs } from './proofs';

export enum AllowlistStatus {
  NotAllowlisted,
  Allowlisted,
}

export const getAllowlistStatus = (account: string) => {
  const proof = proofs.find((proof) => proof.address === account.toLowerCase());

  if (proof) {
    return {
      allowlistStatus: AllowlistStatus.Allowlisted,
      amountOfTokens: proof.amountOfTokens || 10,
      merkleProof: proof.allowlist,
    };
  } else {
    return {
      allowlistStatus: AllowlistStatus.NotAllowlisted,
      amountOfTokens: 0,
      merkleProof: [''],
    };
  }
};
