'use client'

import {
  useActiveListings,
  useAddress,
  useContract,
  useContractMetadata,
  useListings,
} from '@thirdweb-dev/react'
import Image from 'next/image'
import Link from 'next/link'

const contractAddress = '0x19f7Ee16C08479AF1D18c2dBA6A1bD0EC138BB10' // Marketplace
const address1 = '0xE80A51ab33cAefE128AC9AE04BF6822C8FBb619b' // owner
const address2 = '0x3B4E78E08de9FF899EB5Ca82710C5f2cD26E0bBC'
const address3 = '0x495d579DB75cED9f912438666b98d9c8d5b3F6d5'

export default function Marketplace() {
  // 1. Contract address
  const address = useAddress()
  const { contract } = useContract(contractAddress, 'marketplace')

  // 2. Contract Metadata
  const {
    data: contractMetadata,
    isLoading: is2,
    error: e2,
  } = useContractMetadata(contract)
  // console.log(contractMetadata)

  // 3. Get all active listings
  const {
    data: alistings,
    isLoading: i3,
    error: e3,
  } = useActiveListings(contract, {
    seller: address,
    tokenContract: contractAddress,
    tokenId: 1,
    start: 0,
    count: 100,
  })
  console.log(alistings)

  // Get all the listings
  const {
    data: listings,
    isLoading: i31,
    error: e31,
  } = useListings(contract, { start: 0, count: 100 })
  console.log(listings)

  return (
    <div className="container mx-auto mt-5 h-screen">
      <div className="card">
        <h3 className="title">1. Contract Address</h3>
        <p className="desc">Contract Address: {contractAddress}</p>
        <p className="desc">
          <Link
            className="text-blue-600 font-bold"
            href={
              'https://thirdweb.com/mumbai/0x19f7Ee16C08479AF1D18c2dBA6A1bD0EC138BB10'
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
        <h3 className="title">3. Get All Listings</h3>
        <p className="desc">
          {listings?.map((item) => {
            return (
              <div key={item.id}>
                <Image
                  src={item.asset.image}
                  width={100}
                  height={100}
                  alt={item.asset.name}
                />
                {item.asset.name} <br />
                {item.asset.description} <br />
                price: {item.buyoutPrice.toString()}
              </div>
            )
          })}
        </p>
      </div>
    </div>
  )
}
