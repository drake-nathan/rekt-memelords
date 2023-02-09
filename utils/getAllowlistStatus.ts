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

// export const getAllowlistStatus = async (account: string) => {
//   const allowlistUrl = `api/allowlist/${account}`;

//   try {
//     const response = await axios.get(allowlistUrl);
//     const merkleProof = JSON.parse(response.data);

//     if (merkleProof) {
//       return {
//         allowlistStatus: AllowlistStatus.Allowlisted,
//         amountOfTokens: merkleProof.amountOfTokens || 10,
//         merkleProof: merkleProof.allowlist,
//       };
//     }
//   } catch (error) {
//     return {
//       allowlistStatus: AllowlistStatus.NotAllowlisted,
//       amountOfTokens: 0,
//       merkleProof: [''],
//     };
//   }
// };
