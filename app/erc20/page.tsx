'use client'
import {
  useAddress,
  useBurnToken,
  useContract,
  useContractMetadata,
  useGrantRole,
  useMintToken,
  usePlatformFees,
  useRevokeRole,
  useRoleMembers,
  useTokenBalance,
  useTokenDecimals,
  useTokenSupply,
  useTransferToken,
  useUpdateMetadata,
  useUpdatePlatformFees,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const contractAddress = '0x3b09f4a3571434B59fe7419457bAA8920Cc5B4F7'
const address1 = '0xE80A51ab33cAefE128AC9AE04BF6822C8FBb619b' // owner
const address2 = '0x3B4E78E08de9FF899EB5Ca82710C5f2cD26E0bBC'
const address3 = '0x495d579DB75cED9f912438666b98d9c8d5b3F6d5'

const ERC20: NextPage = () => {
  // 1. Get contract
  const address = useAddress()
  const { contract, isLoading: isLoadingContract } =
    useContract(contractAddress)

  // 2. ContractMetadata
  const {
    data: contractMetadata,
    isLoading: is2,
    error: e2,
  } = useContractMetadata(contract)

  const {
    mutate: updateMetadata,
    isLoading: is21,
    error: e21,
  } = useUpdateMetadata(contract)

  // 3. ERC20
  const {
    data: balance,
    isLoading: isLoadingBalance,
    error: errorBalance,
  } = useTokenBalance(contract, address)

  const {
    data: totalSupply,
    isLoading: isLoadingTotalSupply,
    error: errorTotalSupply,
  } = useTokenSupply(contract)

  const {
    data: decimals,
    isLoading: is3,
    error: e3,
  } = useTokenDecimals(contract)

  const {
    mutate: transferTokens,
    isLoading: isLoadingTransfer,
    error: errorTransfer,
  } = useTransferToken(contract)

  // 4. ERC20Burnable
  const {
    mutate: burnTokens,
    isLoading: i4,
    error: e4,
  } = useBurnToken(contract)

  // 5. ERC20Mintable
  const {
    mutate: mintTokens,
    isLoading: isLoadingMintTo,
    error: errorMintTo,
  } = useMintToken(contract)

  if (errorMintTo) {
    console.error('failed to mint tokens', errorMintTo)
  }

  // 6. Permissions
  const { mutate: grantRole, isLoading: i6, error: e6 } = useGrantRole(contract)

  const {
    mutate: revokeRole,
    isLoading: i61,
    error: e61,
  } = useRevokeRole(contract)

  // 7. PermissionsEnumerable
  const {
    data: adminMembers,
    isLoading: i7,
    error: e7,
  } = useRoleMembers(contract, 'admin')
  const {
    data: minterMembers,
    isLoading: i71,
    error: e71,
  } = useRoleMembers(contract, 'minter')
  console.log(adminMembers)
  console.log(minterMembers)

  // 8. PlatformFee
  const {
    data: platformFees,
    isLoading: i8,
    error: e8,
  } = usePlatformFees(contract)
  const {
    mutate: updatePlatformFees,
    isLoading: i81,
    error: e81,
  } = useUpdatePlatformFees(contract)

  return (
    <div className="container mx-auto mt-5 h-screen">
      <div className="card">
        <h3 className="title"> 1. Contract Address</h3>
        <p className="desc">Contract Address: {contractAddress} </p>
        <p className="desc text-blue-700 font-bold">
          <Link href="https://thirdweb.com/mumbai/0x3b09f4a3571434B59fe7419457bAA8920Cc5B4F7">
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
        <h3 className="title">3. ERC20 </h3>
        <p className="desc">
          Balance of current address: {balance?.displayValue} {balance?.symbol}
        </p>
        <p className="desc">
          Total supply: {totalSupply?.displayValue} {totalSupply?.symbol}
        </p>
        <p className="desc">Decimals: {decimals}</p>
        <p className="desc">
          Transfer tokens to address:
          <button
            className="button"
            disabled={isLoadingTransfer}
            onClick={() =>
              transferTokens({
                to: address2,
                amount: 1000,
              })
            }
          >
            Transfer 1000 to address2 - transferToken Hook
          </button>
          <button
            className="button"
            disabled={isLoadingTransfer}
            onClick={() => contract?.erc20.transfer(address2, 100)}
          >
            Transfer 100 to address2 - erc20.transfer
          </button>
        </p>
      </div>

      <div className="card">
        <h3 className="title">4. ERC20Burnable</h3>
        <p className="desc">
          <button
            className="button"
            disabled={i4}
            onClick={() => burnTokens({ amount: 1000 })}
          >
            Burn 1000 - burnTokens
          </button>
          <button
            className="button"
            disabled={i4}
            onClick={() => contract?.erc20.burn(100)}
          >
            Burn 100 - erc20.burn
          </button>
        </p>
      </div>

      <div className="card">
        <h3 className="title">5. ERC20Mintable</h3>
        <p className="desc">
          <button
            className="button"
            onClick={() => {
              mintTokens({ to: address3, amount: 12345 })
            }}
          >
            Mint 12345 to Address3 - mintTokens
          </button>
          <button
            className="button"
            onClick={() => {
              contract?.erc20.mint(1234)
              // mintTokens({ to: address3, amount: 12345 })
            }}
          >
            Mint 1234 to Address3 - erc20.mint
          </button>
        </p>
      </div>

      <div className="card">
        <h3 className="title">6. Permissions</h3>
        <p className="desc">
          Grant role using grantRole hook:
          <button
            className="button"
            disabled={i6}
            onClick={() => grantRole({ role: 'admin', address: address2 })}
          >
            Grant admin to address2
          </button>
          <button
            className="button"
            disabled={i6}
            onClick={() => grantRole({ role: 'minter', address: address2 })}
          >
            Grant minter to address2
          </button>
          <br />
          Grant role using contract.roles.grant:
          <button
            className="button"
            disabled={i6}
            onClick={() => contract?.roles.grant('admin', address3)}
          >
            Grant admin to address3
          </button>
          <button
            className="button"
            disabled={i6}
            onClick={() => contract?.roles.grant('minter', address3)}
          >
            Grant minter to address3
          </button>
          <br />
          Revoke role using revokeRole hook:
          <button
            className="button"
            disabled={i61}
            onClick={() => revokeRole({ role: 'admin', address: address2 })}
          >
            Revoke admin to address2
          </button>
          <button
            className="button"
            disabled={i61}
            onClick={() => revokeRole({ role: 'minter', address: address2 })}
          >
            Revoke minter to address2
          </button>
          <br />
          Revoke role using contract.roles.revoke:
          <button
            className="button"
            disabled={i61}
            onClick={() => contract?.roles.revoke('admin', address3)}
          >
            Revoke admin to address3
          </button>
          <button
            className="button"
            disabled={i61}
            onClick={() => contract?.roles.revoke('minter', address3)}
          >
            Revoke minter to address3
          </button>
        </p>
      </div>

      <div className="card">
        <h3 className="title">7. PermissionEnumerable</h3>
        <p className="desc">
          Admin members:
          {adminMembers?.map((m) => (
            <span> | {m} | </span>
          ))}
          <br />
          MinterMembers:
          {minterMembers?.map((m) => (
            <span> | {m} | </span>
          ))}
        </p>
      </div>

      <div className="card">
        <h3 className="title">8. PlatformFee </h3>
        <p className="desc">
          Platform fee recipient: {platformFees?.platform_fee_recipient} <br />
          Platform fee basis point : {platformFees?.platform_fee_basis_points}
        </p>
      </div>
    </div>
  )
}
export default ERC20
