import {Address, BigInt, Bytes,ens,log } from "@graphprotocol/graph-ts"

import {
  NameRegistered,
  NameRenewed,
  OwnershipTransferred
} from "../generated/EthRegistrarController/EthRegistrarController"

import { Domain,OwnerAccount,RegisteredName,RenewedName } from "../generated/schema";

import { getOrCreateAccount ,createDomain, getDomain ,getOrCreateNameRegistered, getOrCreateRenewedName} from "./eth-registrar-helper"
import { uint256ToByteArray, validateNumber } from "./utils";

export function getNameRegistered(name: string): RegisteredName| null{
  let regname = RegisteredName.load(name)
  return regname;

}
export function handleNameRegistered(
  event: NameRegistered
): void {
//   let entity = new NameRegistered(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.name = event.params.name
//   entity.label = event.params.label
//   entity.owner = event.params.owner
//   entity.cost = event.params.cost
//   entity.expires = event.params.expires
//   entity.save()
//
let account = getOrCreateAccount(event.params.owner)
  if(account){
    let lbl = event.transaction.hash
    let nameReg = ens.nameByHash(lbl.toHexString())
    if(nameReg){
      log.info("Registered ENS:",[nameReg])
      if(validateNumber(nameReg)){
        getOrCreateNameRegistered(event.transaction.hash,event.params.name,event.params.label,event.params.owner.toHexString(),event.params.cost, event.params.expires)
        

      }
    }
  }
  //check if account exists, if it does check for the registered domain 
  //but should return validated number type of name

 }

export function handleNameRenewed(
  event: NameRenewed
): void {
//   let entity = new NameRenewed(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.name = event.params.name
//   entity.label = event.params.label
//   entity.cost = event.params.cost
//   entity.expires = event.params.expires
//   entity.save()
//event NameRegistered(string name, bytes32 indexed label, address indexed owner, uint cost, uint expires);
let regName = getNameRegistered(event.params.name)
if(regName){
  getOrCreateRenewedName(event.transaction.hash, event.params.name,
    event.params.label,
    event.params.cost,
    event.params.expires)
}

 }



export function handleOwnershipTransferred(
  event: OwnershipTransferred
): void {
  // let entity = new OwnershipTransferred(
  //   event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  // )
  // entity.previousOwner = event.params.previousOwner
  // entity.newOwner = event.params.newOwner
  // entity.save()
  
  
  getOrCreateAccount(event.params.previousOwner) 
  getOrCreateAccount(event.params.newOwner)
 
    
}
