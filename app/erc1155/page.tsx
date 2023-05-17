'use client'

import {
  useAddress,
  useAirdropNFT,
  useContract,
  useContractMetadata,
  useNFT,
  useNFTBalance,
  useTransferNFT,
} from '@thirdweb-dev/react'
import Image from 'next/image'
import Link from 'next/link'

const contractAddress = '0x454aFb47aA2c1925bA5EEEB5935c8b5804750F51' // Edition drop
const address1 = '0xE80A51ab33cAefE128AC9AE04BF6822C8FBb619b' // owner
const address2 = '0x3B4E78E08de9FF899EB5Ca82710C5f2cD26E0bBC'
const address3 = '0x495d579DB75cED9f912438666b98d9c8d5b3F6d5'

const ERC1155 = () => {
  const address = useAddress()

  // 1. Get contract
  const { contract, isLoading: i0 } = useContract(
    contractAddress,
    'edition-drop'
  )

  // 2. ContractMetadata
  const {
    data: contractMetadata,
    isLoading: i2,
    error: e2,
  } = useContractMetadata(contract)
  console.log(contractMetadata)

  // 3. ERC1155
  // Airdrop NFTs to a list of wallets
  // const {
  //   mutate: airdropNFT,
  //   isLoading: i3,
  //   error: e3,
  // } = useAirdropNFT(contract)

  // Get a single NFT
  const tokenId = 0 // the tokenId to look up
  const { data: nft, isLoading: i31, error: e31 } = useNFT(contract, tokenId)
  console.log(nft)

  // Get NFT balance of a specific wallet
  const {
    data: ownerBalance,
    isLoading: i32,
    error: e32,
  } = useNFTBalance(contract, address, tokenId)
  console.log(ownerBalance?.toNumber())

  // Transfer an NFT
  const {
    mutate: transferNFT,
    isLoading: i33,
    error: e33,
  } = useTransferNFT(contract)

  if (e33) {
    console.error('failed to transfer NFT', e33)
  }

  return (
    <div className="container mx-auto mt-5 h-screen">
      <div className="card">
        <h3 className="title">1. Contract Address</h3>
        <p className="desc">Contract Address: {contractAddress}</p>
        <p className="desc">
          <Link
            className="text-blue-600 font-bold"
            href={
              'https://thirdweb.com/mumbai/0x454aFb47aA2c1925bA5EEEB5935c8b5804750F51'
            }
          >
            Go to Dashboard
          </Link>
        </p>
      </div>

      <div className="card">
        <h3 className="title">2. ContractMetadata</h3>
        <p className="desc">
          Name: {contractMetadata?.name} <br />
          Symbol: {contractMetadata?.symbol} <br />
          Description: {contractMetadata?.description} <br />
          Fee Recipient: {contractMetadata?.fee_recipient} <br />
          Seller Fee Basic Points: {contractMetadata?.seller_fee_basis_points}
          <br />
          {/* <Image
            src={contractMetadata?.image}
            width={100}
            height={100}
            alt={contractMetadata?.name}
          /> */}
        </p>
      </div>

      <div className="card">
        <h3 className="title">3. ERC1155</h3>
        <p className="desc">
          {/* <button
            className="button"
            disabled={i3}
            onClick={() =>
              airdropNFT({
                tokenId: 0,
                addresses: [
                  // { address: address1, quantity: 1 },
                  { address: address2, quantity: 1 },
                  { address: address3, quantity: 1 },
                ],
              })
            }
          >
            Airdrop NFT from {address} to Address2, Address3
          </button> */}
          {/* <br /> */}
          Owner balance of {address} : {ownerBalance?.toNumber()}
          <br />
          <button
            className="button"
            disabled={i33}
            onClick={() =>
              transferNFT({
                to: address2,
                tokenId: 0,
                amount: 1,
              })
            }
          >
            Transfer a nft to address2
          </button>
        </p>
      </div>
    </div>
  )
}

export default ERC1155
