// 'use client'
import { ConnectWallet } from '@thirdweb-dev/react'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <div className="m-2 p-2 flex justify-between items-center">
      <div className="flex justify-between items-center">
        <Link href={'/'} className="menuitem">
          Home
        </Link>
        <Link href={'/erc20'} className="menuitem">
          ERC20
        </Link>
        <Link href={'/erc721'} className="menuitem">
          ERC721
        </Link>
        <Link href={'/erc1155'} className="menuitem">
          ERC1155
        </Link>
        <Link href={'/marketplace'} className="menuitem">
          Marketplace
        </Link>
      </div>
      <div>
        <ConnectWallet />
      </div>
    </div>
  )
}

export default Header
