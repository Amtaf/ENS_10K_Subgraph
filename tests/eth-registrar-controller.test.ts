import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { EthRegistrarControllerNameRegistered } from "../generated/schema"
import { EthRegistrarControllerNameRegistered as EthRegistrarControllerNameRegisteredEvent } from "../generated/EthRegistrarController/EthRegistrarController"
import { handleEthRegistrarControllerNameRegistered } from "../src/eth-registrar-controller"
import { createEthRegistrarControllerNameRegisteredEvent } from "./eth-registrar-controller-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let name = "Example string value"
    let label = Bytes.fromI32(1234567890)
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let cost = BigInt.fromI32(234)
    let expires = BigInt.fromI32(234)
    let newEthRegistrarControllerNameRegisteredEvent = createEthRegistrarControllerNameRegisteredEvent(
      name,
      label,
      owner,
      cost,
      expires
    )
    handleEthRegistrarControllerNameRegistered(
      newEthRegistrarControllerNameRegisteredEvent
    )
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("EthRegistrarControllerNameRegistered created and stored", () => {
    assert.entityCount("EthRegistrarControllerNameRegistered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EthRegistrarControllerNameRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "EthRegistrarControllerNameRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "label",
      "1234567890"
    )
    assert.fieldEquals(
      "EthRegistrarControllerNameRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "EthRegistrarControllerNameRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "cost",
      "234"
    )
    assert.fieldEquals(
      "EthRegistrarControllerNameRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "expires",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
