import { BigInt } from "@graphprotocol/graph-ts";
import {
  StreamCreated as StreamCreatedEvent,
  StreamDeleted as StreamDeletedEvent,
  StreamUpdated as StreamUpdatedEvent,
  TokenWrapped as TokenWrappedEvent,
} from "../generated/FlowSender/FlowSender";
import {
  StreamCreated,
  StreamDeleted,
  StreamUpdated,
  TokenWrapped,
  Stream,
  Token,
  Transaction,
  Block,
  Wallet,
} from "../generated/schema";

export function handleStreamCreated(event: StreamCreatedEvent): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let entity = new StreamCreated(id);
  entity.stream = id;
  entity.transaction = event.transaction.hash.toHex();
  entity.save();

  let streamId =
    event.params.tokenAddress.toHex() + "-" + event.params.receiver.toHex();
  let stream = new Stream(streamId);
  stream.token = event.params.tokenAddress.toHex();
  stream.sender = event.transaction.from.toHex();
  stream.receiver = event.params.receiver.toHex();
  stream.flowRate = event.params.flowRate;
  stream.totalAmountStreamed = event.params.flowRate;
  stream.lastUpdatedAtBlock = event.block.number.toString();
  stream.lastUpdatedAtTimestamp = event.block.timestamp;
  stream.createdAtBlock = event.block.number.toString();
  stream.createdAtTimestamp = event.block.timestamp;
  stream.createdAtTransaction = event.transaction.hash.toHex();
  stream.isActive = true;
  stream.duration = event.block.timestamp;
  stream.startedAtTimestamp = event.block.timestamp;
  stream.startedAtBlock = event.block.number.toString();
  stream.save();
}

export function handleStreamDeleted(event: StreamDeletedEvent): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let entity = new StreamDeleted(id);
  entity.stream =
    event.params.tokenAddress.toHex() + "-" + event.params.receiver.toHex();
  entity.transaction = event.transaction.hash.toHex();
  entity.save();

  let streamId =
    event.params.tokenAddress.toHex() + "-" + event.params.receiver.toHex();
  let stream = Stream.load(streamId);
  if (stream != null) {
    stream.isActive = false;
    stream.stoppedAtTimestamp = event.block.timestamp;
    stream.stoppedAtBlock = event.block.number.toString();
    stream.duration = event.block.timestamp.minus(stream.startedAtTimestamp);
    stream.save();
  }
}

export function handleStreamUpdated(event: StreamUpdatedEvent): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let entity = new StreamUpdated(id);
  entity.stream =
    event.params.tokenAddress.toHex() + "-" + event.params.receiver.toHex();
  entity.transaction = event.transaction.hash.toHex();

  // Get the old flowRate from the existing Stream entity
  let streamId =
    event.params.tokenAddress.toHex() + "-" + event.params.receiver.toHex();
  let stream = Stream.load(streamId);
  let oldFlowRate = stream != null ? stream.flowRate : BigInt.fromI32(0);

  entity.oldFlowRate = oldFlowRate;
  entity.newFlowRate = event.params.flowRate;
  entity.flowRateDelta = event.params.flowRate.minus(oldFlowRate);
  entity.save();

  if (stream != null) {
    stream.flowRate = event.params.flowRate;
    stream.totalAmountStreamed = stream.totalAmountStreamed.plus(
      event.params.flowRate
    );
    stream.lastUpdatedAtBlock = event.block.number.toString();
    stream.lastUpdatedAtTimestamp = event.block.timestamp;
    stream.save();
  }
}

export function handleTokenWrapped(event: TokenWrappedEvent): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let entity = new TokenWrapped(id);
  entity.token = event.params.tokenAddress.toHex();
  entity.transaction = event.transaction.hash.toHex();
  entity.amount = event.params.amount;
  entity.save();

  let token = Token.load(event.params.tokenAddress.toHex());
  if (token == null) {
    token = new Token(event.params.tokenAddress.toHex());
    token.address = event.params.tokenAddress;
    token.totalAmountWrapped = event.params.amount;
    token.totalAmountStreamed = BigInt.fromI32(0);
    token.totalActiveStreams = 0;
    token.totalHistoricalStreams = 0;
  } else {
    token.totalAmountWrapped = token.totalAmountWrapped.plus(
      event.params.amount
    );
  }
  token.lastUpdatedAtBlock = event.block.number.toString();
  token.lastUpdatedAtTimestamp = event.block.timestamp;
  token.save();
}
