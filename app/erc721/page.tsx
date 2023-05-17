'use client'
import {
  useAddress,
  useContract,
  useContractMetadata,
  useNFT,
  useNFTBalance,
  useTransferNFT,
} from '@thirdweb-dev/react'
import Image from 'next/image'
import Link from 'next/link'

const contractAddress = '0x4b37532Eb5e2f40BF31e34d90A52454FdB003128'
const address1 = '0xE80A51ab33cAefE128AC9AE04BF6822C8FBb619b' // owner
const address2 = '0x3B4E78E08de9FF899EB5Ca82710C5f2cD26E0bBC'
const address3 = '0x495d579DB75cED9f912438666b98d9c8d5b3F6d5'

const ERC721 = () => {
  const address = useAddress()

  // 1. Get contract
  const { contract, isLoading: ic } = useContract(contractAddress)

  // 2. ContractMetadata
  const {
    data: contractMetadata,
    isLoading: i2,
    error: e2,
  } = useContractMetadata(contract)
  // console.log(contractMetadata)

  // 3. ERC721
  const { data: nft0 } = useNFT(contract, 0)
  const { data: nft1 } = useNFT(contract, 1)
  const { data: nft2 } = useNFT(contract, 2)
  // console.log(nft0)

  const { data: ownerBalance1 } = useNFTBalance(contract, address1)
  const { data: ownerBalance2 } = useNFTBalance(contract, address2)
  const { data: ownerBalance3 } = useNFTBalance(contract, address3)
  // console.log(ownerBalance1)

  const {
    mutate: transferNFT,
    isLoading: i3,
    error: e3,
  } = useTransferNFT(contract)

  return (
    <div className="container mx-auto mt-5 h-screen">
      <div className="card">
        <h3 className="title">1. Contract Address</h3>
        <p className="desc">Contract Address: {contractAddress}</p>
        <p className="desc">
          <Link
            className="text-blue-600 font-bold"
            href={
              'https://thirdweb.com/mumbai/0x4b37532Eb5e2f40BF31e34d90A52454FdB003128'
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
          <Image
            src={contractMetadata?.image}
            width={100}
            height={100}
            alt={contractMetadata?.name}
          />
        </p>
      </div>

      <div className="card">
        <h3 className="title">3. ERC721</h3>
        <p className="desc">
          <Image
            src={nft0?.metadata.image}
            width={100}
            height={100}
            alt={nft0?.metadata.name}
          />
          Owner: {nft0?.owner} <br />
          Type: {nft0?.type} <br />
          Supply: {nft0?.supply} <br />
          Description: {nft0?.metadata.description}
        </p>
        <p className="desc ">
          <Image
            src={nft1?.metadata.image}
            width={100}
            height={100}
            alt={nft1?.metadata.name}
          />
          Owner: {nft1?.owner} <br />
          Type: {nft1?.type} <br />
          Supply: {nft1?.supply} <br />
          Description: {nft1?.metadata.description}
        </p>
        <p className="desc ">
          <Image
            src={nft2?.metadata.image}
            width={100}
            height={100}
            alt={nft2?.metadata.name}
          />
          Owner: {nft2?.owner} <br />
          Type: {nft2?.type} <br />
          Supply: {nft2?.supply} <br />
          Description: {nft2?.metadata.description}
        </p>
        <h3 className="title">Owner Balance </h3>
        <p className="desc ">
          Balance of Address1: {ownerBalance1?.toString()} <br />
          Balance of Address2: {ownerBalance2?.toString()} <br />
          Balance of Address3: {ownerBalance3?.toString()} <br />
        </p>
        <h3 className="title">Transfer NFT </h3>
        <p className="desc">
          <button
            className="button"
            disabled={i3}
            onClick={() => transferNFT({ to: address1, tokenId: 0 })}
          >
            Transfer tokenId 0 to address1
          </button>
        </p>
      </div>

      <div className="card">
        <h3 className="title">4. ERC721</h3>
        <p className="desc"></p>
      </div>
    </div>
  )
}
export default ERC721
