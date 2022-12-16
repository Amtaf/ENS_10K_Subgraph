import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { RegisteredName,RenewedName,transfer } from "../generated/schema"
import { NameRegistered,NameRenewed,Transfer} from "../generated/ENS/ENS"
import { handleNameRegistered,handleNameRenewed,handleTransfer } from "../src/ens"
import { createTransferEvent } from "./ens-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let from = Address.fromString("0x0000000000000000000000000000000000000000")
    let to = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let newTransferEvent = createTransferEvent(from, to, tokenId)
    handleTransfer(newTransferEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Domain created and stored", () => {
    assert.entityCount("Domain", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Domain",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "from",
      "0x0000000000000000000000000000000000000000"
    )
    assert.fieldEquals(
      "Domain",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "to",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Domain",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "tokenId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
