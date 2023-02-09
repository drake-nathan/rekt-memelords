import axios from 'axios';

export enum AllowlistStatus {
  NotAllowlisted,
  Allowlisted,
  DiscountListed,
}

export const getAllowlistStatus = async (account: string) => {
  const allowlistUrl = `api/allowlist/${account}`;

  try {
    const response = await axios.get(allowlistUrl);
    const merkleProof = JSON.parse(response.data);

    if (merkleProof) {
      return {
        allowlistStatus: AllowlistStatus.DiscountListed,
        merkleProof: merkleProof.allowlist,
      };
    }
  } catch (error) {
    return {
      allowlistStatus: AllowlistStatus.NotAllowlisted,
      merkleProof: [''],
    };
  }
};
