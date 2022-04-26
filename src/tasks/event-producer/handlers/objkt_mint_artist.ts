import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, MintEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_MINTING_FACTORY } from '../../../consts';

export const EVENT_TYPE_OBJKT_MINT_ARTIST = 'OBJKT_MINT_ARTIST';

export interface ObjktMintArtistEvent extends MintEvent {
  type: typeof EVENT_TYPE_OBJKT_MINT_ARTIST;
  collection_id: string;
  metadata_uri: string;
}

const ObjktMintArtistEventSchema: Describe<Omit<ObjktMintArtistEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  artist_address: TezosAddress,
  collection_id: PgBigInt,
  editions: PgBigInt,
  metadata_uri: MetadataUri,
});

const HenMintHandler: Handler<Transaction, ObjktMintArtistEvent> = {
  type: EVENT_TYPE_OBJKT_MINT_ARTIST,

  accept: [
    {
      entrypoint: 'mint_artist',
      target_address: OBJKT_CONTRACT_MINTING_FACTORY,
    },
    {
      entrypoint: 'mint',
    },
  ],

  exec: (transaction, operation) => {
    const mintTransaction = operation.transactions.find((transaction) => get(transaction, 'parameter.entrypoint') === 'mint');
    const collectionId = get(transaction, 'parameter.value.collection_id');
    const fa2Address = get(mintTransaction, 'target.address');
    const tokenId = get(mintTransaction, 'parameter.value.token_id');
    const editions = get(mintTransaction, 'parameter.value.amount');
    const metadataUri = Buffer.from(get(mintTransaction, 'parameter.value.metadata.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_OBJKT_MINT_ARTIST, transaction);

    const event: ObjktMintArtistEvent = {
      id,
      type: EVENT_TYPE_OBJKT_MINT_ARTIST,
      opid: transaction.id,
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      token_id: tokenId,
      level: transaction.level,
      collection_id: collectionId,
      artist_address: transaction.sender.address,
      editions: editions,
      metadata_uri: metadataUri,
    };

    assert(omit(event, ['type']), ObjktMintArtistEventSchema);

    return event;
  },
};

export default HenMintHandler;
