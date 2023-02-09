import axios from 'axios';

export enum AllowlistStatus {
  NotAllowlisted,
  Allowlisted,
}

export const getAllowlistStatus = async (account: string) => {
  const allowlistUrl = `api/allowlist/${account}`;

  try {
    const response = await axios.get(allowlistUrl);
    const merkleProof = JSON.parse(response.data);

    if (merkleProof) {
      return {
        allowlistStatus: AllowlistStatus.Allowlisted,
        amountOfTokens: merkleProof.amountOfTokens || 10,
        merkleProof: merkleProof.allowlist,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      allowlistStatus: AllowlistStatus.NotAllowlisted,
      amountOfTokens: 0,
      merkleProof: [''],
    };
  }
};
