import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ENS
} from "../generated/ENS/ENS"
import { Domain,OwnerAccount,RegisteredName,RenewedName } from "../generated/schema";

//function to create or get Domain Owner Account
// export function getOrCreateAccount(address: Address): OwnerAccount{
//     let account = OwnerAccount.load(address.toHexString())
    
//     if(account==null){
//         account = new OwnerAccount(address.toHexString())
//         account.id = address;
//         account.save()
//     }
// return account;

// }

export function getOrCreateAccount(address: Address): OwnerAccount{
  
  let account = OwnerAccount.load(address)

  if(account == null){
      account = new OwnerAccount(address)
      account.id = address

      
       account.save()
      
  }
  
  return account as OwnerAccount
}

//function to create  Domain
export function createDomain(tokenId: BigInt, name:string, owner:Bytes ,duration:BigInt): Domain{
  let domain = new Domain(tokenId.toString());
  domain.tokenId= tokenId;
  domain.name = name;
  domain.owner = owner;
  domain.duration = duration
  domain.save();
  return domain;
}

//function to get Domain

export function getDomain(tokenId: BigInt): Domain | null{
  let domain = Domain.load(tokenId.toString());
  return domain;

}
//get or create domain registered
//owner:string, registrationDate:BigInt, expires:BigInt, cost: BigInt, 
export function getOrCreateNameRegistered(OwnerAccount: string, duration: BigInt): RegisteredName {
 let id = OwnerAccount.id.toHexString().concat('-').concat(duration.toString())
  let name = RegisteredName.load(id);
    if(name==null){
      name = new RegisteredName(id)
      name.owner = OwnerAccount.id;
      name.updateRegistry = true;
      name.duration = duration;

      name.save()
    }
return name;
}
//get domain name to be renewed
export function getRenewName(OwnerAccount: OwnerAccount): RenewedName{
  let renewed = RenewedName.load(OwnerAccount.id);
  return renewed as RenewedName

}
