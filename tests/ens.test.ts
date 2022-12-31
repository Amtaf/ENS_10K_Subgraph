import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  logStore
} from "matchstick-as/assembly/index"
import { Address, BigInt ,ethereum} from "@graphprotocol/graph-ts";
import { RegisteredName,RenewedName,transfer,Domain } from "../generated/schema";
import { NameRegistered,NameRenewed,Transfer} from "../generated/ENS/ENS";
import { handleNameRegistered,handleNameRenewed,handleTransfer } from "../src/ens"
import { createNameRegisteredEvent,createTransferEvent } from "./ens-utils"


test("Registered Domains",()=>{
  // Create a test entity and save it in the store as initial state (optional)
  beforeAll(() => {
    //let name = new RegisteredName('0x0')
    let Reg = new RegisteredName('regId0')
    Reg.save()
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let expires=BigInt.fromI32(234)
    let regid = BigInt.fromI32(144)
    
    
  // Create mock events
  let newNameRegisteredEvent = createNameRegisteredEvent(regid, owner, expires)
 
  
  // Call mapping functions passing the events we just created
  handleNameRegistered(newNameRegisteredEvent);
  // Assert the state of the store
  logStore();
  })
  assert.fieldEquals('RegisteredName','regId0','id', 'regId0')
  assert.fieldEquals('RegisteredName',  '15723943-153','owner', '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5')
  assert.fieldEquals('RegisteredName', '15723943-153', 'expires', '1726876223')

  assert.notInStore('RegisteredName', '0X00')

  clearStore()
  // Clear the store in order to start the next test off on a clean slate

})


    
    // For more test scenarios, see:
    // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test
describe("Testing domains",()=>{

  beforeAll(() => {
    let from = Address.fromString("0x0000000000000000000000000000000000000001")
    let to = Address.fromString(
      "0x0000000000000000000000000000000000000002"
    )
    let tokenId = BigInt.fromI32(234)
    let newTransferEvent = createTransferEvent(from, to, tokenId)
    handleTransfer(newTransferEvent)

    logStore();
  })

  afterAll(() => {
    clearStore()
  })
test("Domain created and stored", () => {
  
    assert.entityCount('Domain', 0)

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

  })


})    
    
  


