import {Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  NameRegistered,
  NameRenewed,
  OwnershipTransferred,
  Transfer
} from "../generated/ENS/ENS"
import { getOrCreateAccount ,createDomain, getDomain } from "./ens-helper"

//will be used for cheking transfers or destroying a token
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export function handleNameRegistered(event: NameRegistered): void{
  // Get or create the domain name registered(id).
  // Get or create account of name owner(address owner)
  // Get the expiry date of the name
}

export function handleNameRenewed(event: NameRenewed): void{
//   Get the id of the name to be renewed(event.params.id)
//   Get the expiry date of the renewed name
// 
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void{
// Assign Domain from previousOwner to new owner

}

export function handleTransfer(event: Transfer): void{
  // Get the current owner of the domain from DB(event.params.from).
  // Get the Domain from the DB
  // Get the account the domain is being transferred to (event.params.to)
  // Assign Domain to new owner
}