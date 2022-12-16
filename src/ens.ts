import {Address, BigInt, Bytes,ens,log} from "@graphprotocol/graph-ts"
import {
  NameRegistered,
  NameRenewed,
  OwnershipTransferred,
  RenewCall,
  Transfer
} from "../generated/ENS/ENS"
import { Domain,OwnerAccount,Registration,RegisteredName,RenewedName, Mint,transfer} from "../generated/schema";
import { getOrCreateAccount ,createDomain, getDomain ,getOrCreateNameRegistered, getOrCreateRenewedName} from "./ens-helper"
import { byteArrayFromHex, createEventID, uint256ToByteArray, validateNumber } from "./utils";

//will be used for cheking transfers or destroying a token
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'


export function getNameRegistered(id: string): RegisteredName| null{
  let name = RegisteredName.load(id)
  return name;

}
export function handleNameRegistered(event: NameRegistered): void{
  // Get or create the domain name registered(id).
  // Get or create account of name owner(address owner)
  // Get the expiry date of the name
  //check if name is in the 10k category
  
  let account = getOrCreateAccount(event.params.owner)
  if(account){
    let lbl = uint256ToByteArray(event.params.id)
    let registration = new Registration(lbl.toHex())
    registration.domain = event.params.id.toHexString()
    registration.cost = event.transaction.value;
    registration.registrant = account.id
    registration.registrationDate = event.block.timestamp
    registration.expires = event.params.expires

    let nameReg = ens.nameByHash(lbl.toHexString())
    if((nameReg!=null)){
      registration.labelName = nameReg
      
    }
    registration.save()

    
        //getOrCreateNameRegistered(event.params.id.toHexString(),event.params.owner.toHexString(), event.params.expires,event.params)     
   let registrationEvent = new RegisteredName(createEventID(event))
        registrationEvent.registration = registration.id
        registrationEvent.owner = account.id
        registrationEvent.transactionID = event.transaction.hash
        registrationEvent.blockNumber= event.block.number.toI32()
        registrationEvent.expires = event.params.expires
        registrationEvent.save()
              }
        
        
      }
    
  



export function handleNameRenewed(event: NameRenewed): void{
  //first check if the name is registered
//   Get the id of the name to be renewed(event.params.id)
//   Get the expiry date of the renewed name
// let regName = getNameRegistered(event.params.id.toHex())
// if(regName){
//   getOrCreateRenewedName(event.params.id.toHexString(),event.params.expires)
// }
// 
let tokenId = event.params.id.toHexString();
let domain = Domain.load(tokenId)
if (domain){
  domain.expires = event.params.expires
  domain.duration =  event.block.timestamp
  domain.save()
  //getDomain(event.params.id)

  let registration = Registration.load(tokenId)
    if(registration){
      registration.expires = event.params.expires
      registration.save()
  
      
      let registrationEvent = new RenewedName(createEventID(event))
      registrationEvent.registration = registration.id
      registrationEvent.blockNumber=  event.block.number.toI32()
      registrationEvent.transactionID = event.transaction.hash
      registrationEvent.expires = event.params.expires
      registrationEvent.cost = event.transaction.value
      registrationEvent.save()
    }
}

}

// export function handleOwnershipTransferred(event: OwnershipTransferred): void{
// // Assign Domain from previousOwner to new owner

// }

export function handleTransfer(event: Transfer): void{
  // Get the Domain from the DB
  // Get the current owner of the domain from DB(event.params.from).
  // Get the account the domain is being transferred to (event.params.to) 
  //mint
  // let fromId = event.params.from.toHex()
  // let toId = event.params.to.toHex()
  //we create a domain during mint
  //tokenid is hash of the name for ens domains
  let tokenId = event.params.tokenId.toHexString()
  if(event.params.from.toHexString()==ZERO_ADDRESS){
    let lbl = uint256ToByteArray(event.params.tokenId)
    let nameReg = ens.nameByHash(lbl.toHexString())

    
    if(nameReg){
      log.info("Registered ENS:",[nameReg])
      if(validateNumber(nameReg)){
          let accountCreator = getOrCreateAccount(event.params.to)
  //Mint
          let item = new Domain(tokenId)
          item.owner = accountCreator.id
          item.name = nameReg
          item.expires = event.block.timestamp
          item.tokenId = event.params.tokenId
          item.createdAt = event.block.timestamp
        
          item.save()
    

          let DomainEvent = new Mint(createEventID(event))
          DomainEvent.blockNumber = event.block.number.toI32()
          DomainEvent.transactionID = event.transaction.hash
          DomainEvent.domain = item.id
          DomainEvent.owner = accountCreator.id

          DomainEvent.save()

          log.info("Mint Domain with tokenId: {},txnHash: {},from:{}",[tokenId,event.transaction.hash.toHexString(),event.params.from.toHexString()])
          
        }
        else{
          log.info("NOT 10k: {}", [event.params.tokenId.toHexString()]);

        }
        
      }else{
        log.info("COULD NOT GET ENS NEW RESULT OLD: {}", [
          event.params.tokenId.toHexString(),
        ]);
      }
    }else{
      let item = Domain.load(tokenId)
      if(item!=null){
        let account = getOrCreateAccount(event.params.to)
        if(event.params.to.toHexString()==ZERO_ADDRESS){
          // Burn token
          log.info("BURN OLD - tokenid: {}, txHash: {}", [
            tokenId,
            event.transaction.hash.toHexString(),
          ]);
          item.save();
        }else{
          // Transfer token
        var oldOwner = item.owner;
        item.owner = account.id;
        

        let domainEvent = new transfer(createEventID(event))
        domainEvent.blockNumber = event.block.number.toI32()
        domainEvent.transactionID = event.transaction.hash
        domainEvent.domain = item.id
        domainEvent.owner = account.id;
        domainEvent.oldOwner = oldOwner;
        domainEvent.save()

        log.info("TRANSFER OLD - tokenid: {}, txHash: {}", [
          tokenId,
          event.transaction.hash.toHexString(),
        ]);
        item.save();
    }
        } else {
          log.warning("Domain #{} not exists OLD", [tokenId]);
        }
      }
    }

  
  // let previousOwner = getOrCreateAccount(event.params.from) 
  // let newOwner = getOrCreateAccount(event.params.to)
//  if(domain!=null){
//   domain.previousOwner = previousOwner.id;
//   domain.owner = newOwner.id;
//  }
    
