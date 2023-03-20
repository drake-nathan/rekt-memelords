import axios from 'axios';

export interface ITokenOwner {
  _id?: string;
  collectionSlug: string;
  tokenId: number;
  ownerAddress: string;
}

export const fetchUserMldTokens = async (
  chainId: number,
  address?: `0x${string}`,
): Promise<ITokenOwner[]> => {
  const root = `https://api.rektmemelords.lol/mld-owners${
    chainId === 5 ? '-goerli' : ''
  }`;

  const url = address ? `${root}?address=${address}` : root;

  const response = await axios.get<ITokenOwner[]>(url);

  return response.data;
};
