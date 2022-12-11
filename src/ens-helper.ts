import { Address, BigInt, Bytes, ens } from "@graphprotocol/graph-ts"
import {
  ENS
} from "../generated/ENS/ENS"
import { Domain,OwnerAccount,RegisteredName,RenewedName } from "../generated/schema";

//function to create or get Domain Owner Account
export function getOrCreateAccount(address: Bytes): OwnerAccount{
    let account = OwnerAccount.load(address.toHexString())
    
    if(account==null){
        account = new OwnerAccount(address.toHexString())
        account.address = address;
        account.save()
    }
return account;

}

// export function getOrCreateAccount(address: Address): OwnerAccount{
  
//   let account = OwnerAccount.load(address)

//   if(account == null){
//       account = new OwnerAccount(address)
//       account.id = address

      
//        account.save()
      
//   }
  
//   return account as OwnerAccount
// }

//function to create  Domain
export function createDomain(tokenId: BigInt, name:string, owner:string ,expires:BigInt): Domain{
  let domain = new Domain(tokenId.toString());
  domain.tokenId= tokenId;
  domain.name = name;
  domain.owner = owner;
  domain.expires = expires;
  domain.save();
  return domain;
}

//function to get Domain

export function getDomain(tokenId: BigInt): Domain {
  let domain = Domain.load(tokenId.toString());
  return domain as Domain;

}
//get or create domain registered
//owner:string, registrationDate:BigInt, expires:BigInt, cost: BigInt, 
export function getOrCreateNameRegistered(id: string, owner: string, expires: BigInt, domain: string, cost:BigInt): RegisteredName {
  
  let name = RegisteredName.load(id);
    if(name==null){
      name = new RegisteredName(id)
      name.domain = domain
      name.owner = owner;
      name.cost = cost;
      name.updateRegistry = true;
      name.expires = expires;

      name.save()
    }
return name;
}
//get domain name to be renewed
export function getOrCreateRenewedName(id: string, expires: BigInt): RenewedName{
  let renewed = RenewedName.load(id);
  if(renewed==null){
    renewed = new RenewedName(id);
    
    renewed.expires = expires;
  }
  return renewed as RenewedName

}
