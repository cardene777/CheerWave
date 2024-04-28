import {
  StreamCreated as StreamCreatedEvent,
  StreamDeleted as StreamDeletedEvent,
  StreamUpdated as StreamUpdatedEvent,
  TokenWrapped as TokenWrappedEvent
} from "../generated/FlowSender/FlowSender"
import {
  StreamCreated,
  StreamDeleted,
  StreamUpdated,
  TokenWrapped
} from "../generated/schema"

export function handleStreamCreated(event: StreamCreatedEvent): void {
  let entity = new StreamCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenAddress = event.params.tokenAddress
  entity.flowRate = event.params.flowRate
  entity.receiver = event.params.receiver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStreamDeleted(event: StreamDeletedEvent): void {
  let entity = new StreamDeleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenAddress = event.params.tokenAddress
  entity.receiver = event.params.receiver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStreamUpdated(event: StreamUpdatedEvent): void {
  let entity = new StreamUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenAddress = event.params.tokenAddress
  entity.flowRate = event.params.flowRate
  entity.receiver = event.params.receiver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenWrapped(event: TokenWrappedEvent): void {
  let entity = new TokenWrapped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenAddress = event.params.tokenAddress
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
