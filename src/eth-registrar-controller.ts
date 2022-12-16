import {Address, BigInt, Bytes,ens,log } from "@graphprotocol/graph-ts"

import {
  NameRegistered,
  NameRenewed,
  OwnershipTransferred
} from "../generated/EthRegistrarController/EthRegistrarController"

import { Domain,OwnerAccount,Registration,RegisteredName,RenewedName,transfer,Mint} from "../generated/schema";

import { getOrCreateAccount ,createDomain, getDomain ,getOrCreateNameRegistered, getOrCreateRenewedName} from "./eth-registrar-helper"
import { uint256ToByteArray, validateNumber,createEventID, byteArrayFromHex } from "./utils";

//will be used for cheking transfers or destroying a token
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

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

let account = getOrCreateAccount(event.params.owner)
  if(account){
    let lbl = event.params.name
    let registration = new Registration(lbl)
    registration.domain = event.params.name
    registration.cost = event.transaction.value;
    registration.registrant = account.id
    registration.registrationDate = event.block.timestamp
    registration.expires = event.params.expires

    let nameReg = ens.nameByHash(lbl)
    if(nameReg!=null){
     
    registration.labelName = nameReg
    }
    registration.save()

    let registrationEvent = new RegisteredName(createEventID(event))
        registrationEvent.registration = registration.id
        registrationEvent.blockNumber=  event.block.number.toI32()
        registrationEvent.transactionID = event.transaction.hash
        registrationEvent.expires = event.params.expires
        registrationEvent.owner = account.id
        registrationEvent.save()
            }
      }
  

  //check if account exists, if it does check for the registered domain 
  //but should return validated number type of name




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
// let regName = getNameRegistered(event.params.name)
// if(regName){
//   getOrCreateRenewedName(event.params.id, event.params.name,
//     event.params.label,
//     event.params.cost,
//     event.params.expires)
// }
let tokenId = event.params.label.toHexString();
let domain = Domain.load(tokenId)
if (domain){
  domain.expires = event.params.expires
  domain.duration =  event.block.timestamp
  domain.save()
  //getDomain(event.params.label)

  let registration = RegisteredName.load(tokenId)
    if(registration){
      registration.expires = event.params.expires
      registration.save()
  
      
      let registrationEvent = new RenewedName(createEventID(event))
      registrationEvent.registration = registration.id
      registrationEvent.blockNumber = event.block.number.toI32()
      registrationEvent.transactionID = event.transaction.hash
      registrationEvent.expires = event.params.expires
      registrationEvent.cost = event.transaction.value
      registrationEvent.save()
    }
}

}


