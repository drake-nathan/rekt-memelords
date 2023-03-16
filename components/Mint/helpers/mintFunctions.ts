// import React from 'react';
// import { Contract } from 'web3-eth-contract';
// import {
//   fetchCurrentSupply,
//   fetchMintPhase,
//   checkIfUserHasClaimedDiscount,
//   callPublicMint,
//   callDiscountMint,
//   checkTokensMintedByWallet,
// } from 'web3/contractInteractions';
// import { Chain, MintPhase } from 'web3/types';

export const chain = process.env.NEXT_PUBLIC_CHAIN;

// const urlsMainnet = {
//   // openSea: `https://opensea.io/assets/ethereum`,
//   etherscan: `https://etherscan.io/tx`,
// };

// const urlsGoerli = {
//   // openSea: `https://testnets.opensea.io/assets/goerli`,
//   etherscan: `https://goerli.etherscan.io/tx`,
// };

// const urls = chain === 'goerli' ? urlsGoerli : urlsMainnet;

// export interface ISuccessInfo {
//   message: string;
//   // openseaLink: string;
//   etherscanLink: string;
// }

// export const discountMint = async (
//   contract: Contract,
//   maxSupply: number,
//   account: string,
//   payableAmount: number,
//   numberOfTokens: number,
//   merkleProof: string[],
//   handleError: (error: string) => void,
//   handleSuccess: (successInfo: ISuccessInfo) => void,
//   setBuyButtonText: React.Dispatch<React.SetStateAction<string>>,
//   setShowBuyModal: React.Dispatch<React.SetStateAction<boolean>>,
// ) => {
//   const isDiscountActive =
//     (await fetchMintPhase(contract)) === MintPhase.discount;
//   if (!isDiscountActive) return handleError('MINT IS NOT ACTIVE');

//   const isSupplyRemaining = (await fetchCurrentSupply(contract)) < maxSupply;
//   if (!isSupplyRemaining) return handleError('MINT HAS SOLD OUT');

//   const tokensMintedByUser = await checkTokensMintedByWallet(contract, account);
//   if (tokensMintedByUser >= 10)
//     return handleError('Cannot mint more than 10 tokens per wallet total');

//   setBuyButtonText('MINTING...');
//   const txObj = await callDiscountMint(
//     contract,
//     account,
//     payableAmount,
//     numberOfTokens,
//     merkleProof,
//   );
//   if (!txObj) return handleError('MINT FAILED');

//   const txHash = txObj.transactionHash;
//   if (!txHash) return handleError('MINT FAILED');

//   // const tokenId = txObj?.events?.Transfer?.returnValues?.tokenId as string;
//   // const contractAddress = txObj?.events?.Transfer?.address as string;

//   setBuyButtonText('MINTED');

//   const successInfo: ISuccessInfo = {
//     message: `SUCCESSFULLY MINTED ${numberOfTokens} NFT${
//       numberOfTokens > 1 ? 'S' : ''
//     }`,
//     etherscanLink: `${urls.etherscan}/${txHash}`,
//     // openseaLink: `${urls.openSea}/${contractAddress}/${tokenId}`,
//   };

//   setShowBuyModal(false);
//   handleSuccess(successInfo);
// };

// export const publicMint = async (
//   contract: Contract,
//   maxSupply: number,
//   account: string,
//   payableAmount: number,
//   numberOfTokens: number,
//   handleError: (error: string) => void,
//   handleSuccess: (successInfo: ISuccessInfo) => void,
//   setBuyButtonText: React.Dispatch<React.SetStateAction<string>>,
//   setShowBuyModal: React.Dispatch<React.SetStateAction<boolean>>,
// ) => {
//   const isMintActive = (await fetchMintPhase(contract)) === MintPhase.public;
//   if (!isMintActive) return handleError('Mint is not active');

//   const isSupplyRemaining = (await fetchCurrentSupply(contract)) < maxSupply;
//   if (!isSupplyRemaining) return handleError('Mint has sold out');

//   const tokensMintedByUser = await checkTokensMintedByWallet(contract, account);
//   if (tokensMintedByUser >= 10)
//     return handleError('Cannot mint more than 10 tokens per wallet total');

//   setBuyButtonText('MINTING...');
//   const txObj = await callPublicMint(
//     contract,
//     account,
//     payableAmount,
//     numberOfTokens,
//   );
//   if (!txObj) return handleError('MINT FAILED');

//   const txHash = txObj.transactionHash;
//   if (!txHash) return handleError('MINT FAILED');

//   // const tokenId = txObj?.events?.Transfer?.returnValues?.tokenId as string;
//   // const contractAddress = txObj?.events?.Transfer?.address as string;

//   setBuyButtonText('MINTED');

//   const successInfo: ISuccessInfo = {
//     message: `Successfully minted ${numberOfTokens} NFT${
//       numberOfTokens > 1 ? 's' : ''
//     }`,
//     etherscanLink: `${urls.etherscan}/${txHash}`,
//   };

//   setShowBuyModal(false);
//   handleSuccess(successInfo);
// };

// export const switchChain = async (chain: Chain) => {
//   const chainIds: Record<Chain, string> = {
//     [Chain.mainnet]: '0x1',
//     [Chain.goerli]: '0x5',
//   };

//   const chainId = chainIds[chain];

//   await window.ethereum?.request({
//     method: 'wallet_switchEthereumChain',
//     params: [{ chainId }],
//   });
// };
