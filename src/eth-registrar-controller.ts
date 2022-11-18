import {
  EthRegistrarControllerNameRegistered as EthRegistrarControllerNameRegisteredEvent,
  EthRegistrarControllerNameRenewed as EthRegistrarControllerNameRenewedEvent,
  NewPriceOracle as NewPriceOracleEvent,
  EthRegistrarControllerOwnershipTransferred as EthRegistrarControllerOwnershipTransferredEvent
} from "../generated/EthRegistrarController/EthRegistrarController"
import {
  EthRegistrarControllerNameRegistered,
  EthRegistrarControllerNameRenewed,
  NewPriceOracle,
  EthRegistrarControllerOwnershipTransferred
} from "../generated/schema"

export function handleEthRegistrarControllerNameRegistered(
  event: EthRegistrarControllerNameRegisteredEvent
): void {
  let entity = new EthRegistrarControllerNameRegistered(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.name = event.params.name
  entity.label = event.params.label
  entity.owner = event.params.owner
  entity.cost = event.params.cost
  entity.expires = event.params.expires
  entity.save()
}

export function handleEthRegistrarControllerNameRenewed(
  event: EthRegistrarControllerNameRenewedEvent
): void {
  let entity = new EthRegistrarControllerNameRenewed(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.name = event.params.name
  entity.label = event.params.label
  entity.cost = event.params.cost
  entity.expires = event.params.expires
  entity.save()
}

export function handleNewPriceOracle(event: NewPriceOracleEvent): void {
  let entity = new NewPriceOracle(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.oracle = event.params.oracle
  entity.save()
}

export function handleEthRegistrarControllerOwnershipTransferred(
  event: EthRegistrarControllerOwnershipTransferredEvent
): void {
  let entity = new EthRegistrarControllerOwnershipTransferred(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}
