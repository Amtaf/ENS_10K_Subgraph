import { Address, BigInt, Bytes,  ByteArray,ens,crypto,log } from "@graphprotocol/graph-ts"
import {
    NameRegistered,
    NameRenewed,
    OwnershipTransferred
  } from "../generated/EthRegistrarController/EthRegistrarController"
import { Domain,OwnerAccount,RegisteredName,RenewedName } from "../generated/schema";
import { byteArrayFromHex, uint256ToByteArray } from "./utils";

  
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
export function createDomain(tokenId: BigInt, name:string, owner:string ,duration:BigInt): Domain{
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
//event NameRegistered(string name, bytes32 indexed label, address indexed owner, uint cost, uint expires);
  export function getOrCreateNameRegistered(name:string, label: Bytes, owner: string, cost: BigInt, expires: BigInt): RegisteredName{
    let id = label.toHexString().concat("_").concat(name)
    //let txnHash = hash.toHexString()
    //let lbl = txnHash
    let register_name = RegisteredName.load(id);
    if(register_name==null){
        register_name = new RegisteredName(id)
        register_name.owner = owner
        register_name.name = name
        
        register_name.cost = cost
        register_name.expires=expires
        let labelName = ens.nameByHash(id)
        if(labelName){
         register_name.labelName=labelName
        }

        register_name.save()
  }
  return register_name
  }
  //get domain name to be renewed
  //event NameRenewed(string name, bytes32 indexed label, uint cost, uint expires);
  export function getOrCreateRenewedName(name: string,label: Bytes, cost: BigInt, expires: BigInt): RenewedName{
    let id = label.toHexString().concat("_").concat(name);
    //let txnHash = hash
    
    //let rnw = txnHash.toHexString()
        let renewed = RenewedName.load(id)
        if(renewed==null){
            renewed = new RenewedName(id)
            renewed.name = name
            renewed.label = label
            renewed.cost = cost
            renewed.expires = expires 
        }
        return renewed
  }