import axios from 'axios';

export interface ITokenOwner {
  _id?: string;
  collectionSlug: string;
  tokenId: number;
  ownerAddress: string;
}

export const fetchUserMldTokens = async (
  chainId: number,
  address: string,
): Promise<ITokenOwner[]> => {
  const url = `https://api.rektmemelords.lol/mld-owners${
    chainId === 5 ? '-goerli' : ''
  }?address=${address}`;

  const response = await axios.get<ITokenOwner[]>(url);

  return response.data;
};
