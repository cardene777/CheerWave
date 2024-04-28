import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { StreamCreated } from "../generated/schema"
import { StreamCreated as StreamCreatedEvent } from "../generated/FlowSender/FlowSender"
import { handleStreamCreated } from "../src/flow-sender"
import { createStreamCreatedEvent } from "./flow-sender-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let tokenAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let flowRate = BigInt.fromI32(234)
    let receiver = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newStreamCreatedEvent = createStreamCreatedEvent(
      tokenAddress,
      flowRate,
      receiver
    )
    handleStreamCreated(newStreamCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("StreamCreated created and stored", () => {
    assert.entityCount("StreamCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "StreamCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "StreamCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "flowRate",
      "234"
    )
    assert.fieldEquals(
      "StreamCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "receiver",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
