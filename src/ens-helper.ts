import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
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

//function to create  Domain
export function createDomain(tokenId: BigInt, name:string, owner:string,duration:BigInt): Domain{
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
export function getOrCreateNameRegistered(id: string, labelName: string): RegisteredName {
 let Name = RegisteredName.load(id);
    if(Name==null){
      Name = new RegisteredName(id)
      Name.labelName=labelName;
      Name.save()
    }
return Name;
}
//get domain name to be renewed
export function renewName(id: string): RenewedName{
  let renewed = RenewedName.load(id);
  return renewed as RenewedName

}
