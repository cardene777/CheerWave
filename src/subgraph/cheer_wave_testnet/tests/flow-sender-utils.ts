import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  StreamCreated,
  StreamDeleted,
  StreamUpdated,
  TokenWrapped
} from "../generated/FlowSender/FlowSender"

export function createStreamCreatedEvent(
  tokenAddress: Address,
  flowRate: BigInt,
  receiver: Address
): StreamCreated {
  let streamCreatedEvent = changetype<StreamCreated>(newMockEvent())

  streamCreatedEvent.parameters = new Array()

  streamCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  streamCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "flowRate",
      ethereum.Value.fromSignedBigInt(flowRate)
    )
  )
  streamCreatedEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )

  return streamCreatedEvent
}

export function createStreamDeletedEvent(
  tokenAddress: Address,
  receiver: Address
): StreamDeleted {
  let streamDeletedEvent = changetype<StreamDeleted>(newMockEvent())

  streamDeletedEvent.parameters = new Array()

  streamDeletedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  streamDeletedEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )

  return streamDeletedEvent
}

export function createStreamUpdatedEvent(
  tokenAddress: Address,
  flowRate: BigInt,
  receiver: Address
): StreamUpdated {
  let streamUpdatedEvent = changetype<StreamUpdated>(newMockEvent())

  streamUpdatedEvent.parameters = new Array()

  streamUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  streamUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "flowRate",
      ethereum.Value.fromSignedBigInt(flowRate)
    )
  )
  streamUpdatedEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )

  return streamUpdatedEvent
}

export function createTokenWrappedEvent(
  tokenAddress: Address,
  amount: BigInt
): TokenWrapped {
  let tokenWrappedEvent = changetype<TokenWrapped>(newMockEvent())

  tokenWrappedEvent.parameters = new Array()

  tokenWrappedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  tokenWrappedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokenWrappedEvent
}
