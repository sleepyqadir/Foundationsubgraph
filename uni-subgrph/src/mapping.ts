import { BigInt } from '@graphprotocol/graph-ts';
import {
  UniswapFactory,
  PairCreated,
} from '../generated/UniswapFactory/UniswapFactory';
import { ExampleEntity, Pair } from '../generated/schema';
import { Pair as PairTemple } from '../generated/templates';
import { Sync } from '../generated/templates/Pair/Pair';

export function handleSync(event: Sync): void {
  let pair = Pair.load(event.address.toHex())

  if(pair){
    pair.reserve0 = BigInt.fromI32(event.params.reserve0.toI32())
    pair.reserve1 = BigInt.fromI32(event.params.reserve1.toI32())
    pair.save()
  }
}

export function handlePairCreated(event: PairCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from.toHex());
  let pair = Pair.load(event.transaction.from.toHex());
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!pair) {
    pair = new Pair(event.transaction.from.toHex());

    // Entity fields can be set using simple assignments
    pair.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported

  pair.count = pair.count + BigInt.fromI32(1);

  // Entity fields can be set based on event parameters
  pair.token0 = event.params.token0;
  pair.token1 = event.params.token1;

  PairTemple.create(event.params.pair);
  // Entities can be written to the store with `.save()`
  pair.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.allPairs(...)
  // - contract.allPairsLength(...)
  // - contract.createPair(...)
  // - contract.feeTo(...)
  // - contract.feeToSetter(...)
  // - contract.getPair(...)
}
