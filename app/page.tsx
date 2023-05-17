'use client'

import { useAddress } from '@thirdweb-dev/react'
import Image from 'next/image'
import Link from 'next/link'

const address1 = '0xE80A51ab33cAefE128AC9AE04BF6822C8FBb619b' // owner
const address2 = '0x3B4E78E08de9FF899EB5Ca82710C5f2cD26E0bBC'
const address3 = '0x495d579DB75cED9f912438666b98d9c8d5b3F6d5'

export default function Home() {
  const address = useAddress()

  return (
    <main className="container mx-auto mt-5 h-screen">
      <h1 className="text-3xl font-bold">ERC 표준 컨트랙트 분석</h1>
      <div className="card text-xl font-bold">
        <Link href={'/erc20'}>
          <h2> ERC20: Token </h2>
        </Link>
      </div>
      <div className="card text-xl font-bold">
        <Link href={'/erc721'}>
          <h2> ERC721: NFT Collection </h2>
        </Link>
      </div>
      <div className="card text-xl font-bold">
        <Link href={'/erc1155'}>
          <h2> ERC1155: Multi-token Edition Drop </h2>
        </Link>
      </div>
      <div className="card text-xl font-bold">
        <Link href={'/marketplace'}>
          <h2> Mumbai Marketplace </h2>
        </Link>
      </div>

      <div className="card">
        <h3 className="title">Wallet Address</h3>
        <p className="desc">Current Wallet Address: {address}</p>
        <p className="desc">Address 1 : {address1}</p>
        <p className="desc">Address 2 : {address2}</p>
        <p className="desc">Address 3 : {address3}</p>
      </div>
    </main>
  )
}
