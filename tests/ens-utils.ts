import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NameRegistered,
  NameRenewed,
  OwnershipTransferred,
  Transfer
} from "../generated/ENS/ENS"



export function createNameRegisteredEvent(
  id: BigInt,
  owner: Address,
  expires: BigInt
): NameRegistered {
  let nameRegisteredEvent = changetype<NameRegistered>(newMockEvent())

  nameRegisteredEvent.parameters = new Array()

  nameRegisteredEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  nameRegisteredEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  nameRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "expires",
      ethereum.Value.fromUnsignedBigInt(expires)
    )
  )

  return nameRegisteredEvent
}

export function createNameRenewedEvent(
  id: BigInt,
  expires: BigInt
): NameRenewed {
  let nameRenewedEvent = changetype<NameRenewed>(newMockEvent())

  nameRenewedEvent.parameters = new Array()

  nameRenewedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  nameRenewedEvent.parameters.push(
    new ethereum.EventParam(
      "expires",
      ethereum.Value.fromUnsignedBigInt(expires)
    )
  )

  return nameRenewedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
