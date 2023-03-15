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
    chainId === 69 ? '-goerli' : ''
  }?address=${address}`;

  const response = await axios.get<ITokenOwner[]>(url);
  console.log('response', response);

  return response.data;
};
