import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  EthRegistrarControllerNameRegistered,
  EthRegistrarControllerNameRenewed,
  NewPriceOracle,
  EthRegistrarControllerOwnershipTransferred
} from "../generated/EthRegistrarController/EthRegistrarController"

export function createEthRegistrarControllerNameRegisteredEvent(
  name: string,
  label: Bytes,
  owner: Address,
  cost: BigInt,
  expires: BigInt
): EthRegistrarControllerNameRegistered {
  let ethRegistrarControllerNameRegisteredEvent = changetype<
    EthRegistrarControllerNameRegistered
  >(newMockEvent())

  ethRegistrarControllerNameRegisteredEvent.parameters = new Array()

  ethRegistrarControllerNameRegisteredEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  ethRegistrarControllerNameRegisteredEvent.parameters.push(
    new ethereum.EventParam("label", ethereum.Value.fromFixedBytes(label))
  )
  ethRegistrarControllerNameRegisteredEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  ethRegistrarControllerNameRegisteredEvent.parameters.push(
    new ethereum.EventParam("cost", ethereum.Value.fromUnsignedBigInt(cost))
  )
  ethRegistrarControllerNameRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "expires",
      ethereum.Value.fromUnsignedBigInt(expires)
    )
  )

  return ethRegistrarControllerNameRegisteredEvent
}

export function createEthRegistrarControllerNameRenewedEvent(
  name: string,
  label: Bytes,
  cost: BigInt,
  expires: BigInt
): EthRegistrarControllerNameRenewed {
  let ethRegistrarControllerNameRenewedEvent = changetype<
    EthRegistrarControllerNameRenewed
  >(newMockEvent())

  ethRegistrarControllerNameRenewedEvent.parameters = new Array()

  ethRegistrarControllerNameRenewedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  ethRegistrarControllerNameRenewedEvent.parameters.push(
    new ethereum.EventParam("label", ethereum.Value.fromFixedBytes(label))
  )
  ethRegistrarControllerNameRenewedEvent.parameters.push(
    new ethereum.EventParam("cost", ethereum.Value.fromUnsignedBigInt(cost))
  )
  ethRegistrarControllerNameRenewedEvent.parameters.push(
    new ethereum.EventParam(
      "expires",
      ethereum.Value.fromUnsignedBigInt(expires)
    )
  )

  return ethRegistrarControllerNameRenewedEvent
}

export function createNewPriceOracleEvent(oracle: Address): NewPriceOracle {
  let newPriceOracleEvent = changetype<NewPriceOracle>(newMockEvent())

  newPriceOracleEvent.parameters = new Array()

  newPriceOracleEvent.parameters.push(
    new ethereum.EventParam("oracle", ethereum.Value.fromAddress(oracle))
  )

  return newPriceOracleEvent
}

export function createEthRegistrarControllerOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): EthRegistrarControllerOwnershipTransferred {
  let ethRegistrarControllerOwnershipTransferredEvent = changetype<
    EthRegistrarControllerOwnershipTransferred
  >(newMockEvent())

  ethRegistrarControllerOwnershipTransferredEvent.parameters = new Array()

  ethRegistrarControllerOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ethRegistrarControllerOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ethRegistrarControllerOwnershipTransferredEvent
}
