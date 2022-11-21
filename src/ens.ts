import {Address, BigInt, Bytes,ens } from "@graphprotocol/graph-ts"
import {
  NameRegistered,
  NameRenewed,
  OwnershipTransferred,
  Transfer
} from "../generated/ENS/ENS"
import { Domain,OwnerAccount,RegisteredName,RenewedName } from "../generated/schema";
import { getOrCreateAccount ,createDomain, getDomain ,getOrCreateNameRegistered, getRenewName} from "./ens-helper"

//will be used for cheking transfers or destroying a token
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'


export function handleNameRegistered(event: NameRegistered): void{
  // Get or create the domain name registered(id).
  // Get or create account of name owner(address owner)
  // Get the expiry date of the name
  //check if name is in the 10k category
  let account = getOrCreateAccount(event.params.owner)
  if(account){
    getOrCreateNameRegistered(event.params.id.toHexString(),event.params.owner.toHexString(), event.params.expires)
  }
}

export function handleNameRenewed(event: NameRenewed): void{
//   Get the id of the name to be renewed(event.params.id)
//   Get the expiry date of the renewed name
let renewed = getRenewName(event.params.id.toHexString())
// 
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void{
// Assign Domain from previousOwner to new owner

}

export function handleTransfer(event: Transfer): void{
  // Get the Domain from the DB
  // Get the current owner of the domain from DB(event.params.from).
  // Get the account the domain is being transferred to (event.params.to) 
  //mint
  // let fromId = event.params.from.toHex()
  // let toId = event.params.to.toHex()

  let domain = getDomain(event.params.tokenId);
  let account = getOrCreateAccount(event.params.from)
  if(account){
   domain
  }
  
  let previousOwner = getOrCreateAccount(event.params.from) 
  let newOwner = getOrCreateAccount(event.params.to)
 if(domain!=null){
  domain.previousOwner = previousOwner.id;
  domain.owner = newOwner.id;
 }
    
  
 
}