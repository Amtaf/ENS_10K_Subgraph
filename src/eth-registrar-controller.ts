import {
  NameRegistered,
  NameRenewed,
  NewPriceOracle,
  OwnershipTransferred
} from "../generated/EthRegistrarController/EthRegistrarController"
// import {
//   NameRegistered,
//   NameRenewed,
//   NewPriceOracle,
//   OwnershipTransferred
// } from "../generated/schema"
import { Domain,OwnerAccount,RegisteredName,RenewedName } from "../generated/schema";

import { getOrCreateAccount ,createDomain, getDomain ,getOrCreateNameRegistered, getRenewName} from "./ens-helper"

export function handleNameRegistered(
  event: NameRegistered
): void {
  let entity = new NameRegistered(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.name = event.params.name
  entity.label = event.params.label
  entity.owner = event.params.owner
  entity.cost = event.params.cost
  entity.expires = event.params.expires
  entity.save()
}

export function handleNameRenewed(
  event: NameRenewed
): void {
  let entity = new NameRenewed(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.name = event.params.name
  entity.label = event.params.label
  entity.cost = event.params.cost
  entity.expires = event.params.expires
  entity.save()
}

export function handleNewPriceOracle(event: NewPriceOracle): void {
  let entity = new NewPriceOracle(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.oracle = event.params.oracle
  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferred
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}
