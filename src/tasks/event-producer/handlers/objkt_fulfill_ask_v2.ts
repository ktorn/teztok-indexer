import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe, optional } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE_V2, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_OBJKT_FULFILL_ASK_V2 = 'OBJKT_FULFILL_ASK_V2';

export interface ObjktFulfillAskV2Event extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_FULFILL_ASK_V2;
  implements: SaleEventInterface;
  ask_id: string;
  seller_address: string;
  buyer_address: string;
  artist_address?: string;
  price: string;
  amount: string;
}

const ObjktFulfillAskV2EventSchema: Describe<Omit<ObjktFulfillAskV2Event, 'type' | 'implements'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  ask_id: PgBigInt,
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  artist_address: optional(TezosAddress),
  price: PgBigInt,
  amount: PgBigInt,
});

const ObjktFulfillAskV2Handler: Handler<Transaction, ObjktFulfillAskV2Event> = {
  type: EVENT_TYPE_OBJKT_FULFILL_ASK_V2,

  accept: {
    entrypoint: 'fulfill_ask',
    target_address: OBJKT_CONTRACT_MARKETPLACE_V2,
  },

  exec: (transaction) => {
    const askId = get(transaction, 'parameter.value.ask_id');
    const diff = findDiff(get(transaction, 'diffs')!, 103258, 'asks', ['remove_key', 'update_key'], askId);
    const price = String(get(transaction, 'amount'));
    const fa2Address = get(diff, 'content.value.token.address');
    const tokenId = get(diff, 'content.value.token.token_id');
    const buyerAddress = get(transaction, 'sender.address');
    //const artistAddress = get(diff, 'content.value.artist');
    const sellerAddress = get(diff, 'content.value.creator');
    const amount = get(diff, 'content.value.editions');
    const id = createEventId(EVENT_TYPE_OBJKT_FULFILL_ASK_V2, transaction);

    const event: ObjktFulfillAskV2Event = {
      id,
      type: EVENT_TYPE_OBJKT_FULFILL_ASK_V2,
      implements: SALE_INTERFACE,
      opid: transaction.id,
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      price,
      fa2_address: fa2Address,
      token_id: tokenId,
      //artist_address: artistAddress,
      buyer_address: buyerAddress,
      seller_address: sellerAddress,
      amount,
      ask_id: askId,
    };

    assert(omit(event, ['type', 'implements']), ObjktFulfillAskV2EventSchema);

    return event;
  },
};

export default ObjktFulfillAskV2Handler;
