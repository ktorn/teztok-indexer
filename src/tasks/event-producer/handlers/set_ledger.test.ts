import SetLedgerHandler, { isValidMultiAssetLedgerEntry, extractAddressAndTokenIdFromBigmapDiffKey } from './set_ledger';
import { Transactions } from '../../../types';
import { transactionsToEvents } from '../event-producer';

test('extracts holderAddress and tokenId from bigmap-diff key', () => {
  expect(
    extractAddressAndTokenIdFromBigmapDiffKey({
      owner: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
      token_id: '2',
    })
  ).toEqual({
    holderAddress: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
    tokenId: '2',
  });

  expect(
    extractAddressAndTokenIdFromBigmapDiffKey({
      address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      nat: '152',
    })
  ).toEqual({
    holderAddress: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
    tokenId: '152',
  });

  expect(() => {
    extractAddressAndTokenIdFromBigmapDiffKey(null);
  }).toThrow();

  expect(() => {
    extractAddressAndTokenIdFromBigmapDiffKey({
      address: 'foo',
      nat: '152',
    });
  }).toThrow();

  expect(() => {
    extractAddressAndTokenIdFromBigmapDiffKey({
      address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      nat: '152234823947152234823947152234823947152234823947152234823947152234823947152234823947152234823947152234823947152234823947152234823947152234823947',
    });
  }).toThrow();

  expect(() => {
    extractAddressAndTokenIdFromBigmapDiffKey({
      address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
    });
  }).toThrow();

  expect(() => {
    extractAddressAndTokenIdFromBigmapDiffKey({
      address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      nat: '152',
      baz: 'test',
    });
  }).toThrow();
});

test('checks if a diff entry is a valid multi-asset', () => {
  expect(
    isValidMultiAssetLedgerEntry({
      hash: 'expruZkxjTyNjtSAg9hnGDdEpS6kY6b5gjdaN9aE2xVr9wGrTBqNbP',
      key: {
        owner: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
        token_id: '2',
      },
      value: '1',
    })
  ).toBe(true);

  expect(
    isValidMultiAssetLedgerEntry({
      hash: 'expruZkxjTyNjtSAg9hnGDdEpS6kY6b5gjdaN9aE2xVr9wGrTBqNbP',
      key: {
        owner: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
        token_id: '2',
      },
      value: 'foo',
    })
  ).toBe(false);
});

test('creates SET_LEDGER events', async () => {
  const transactions: Transactions = [
    {
      id: 42065345,
      level: 1365242,
      timestamp: '2021-03-01T03:39:21Z',
      block: 'BMPAfxwn8rgQdhgvHJ479aF5sLPQ3uocSTkeZLDpLapf4Wqp34J',
      hash: 'onyoeuGPkxxXdKXYLwdzZ91nyaRFW4qVLKqkfwJv6j8Mt5cWb8C',
      counter: 4957695,
      nonce: null,
      sender: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      target: {
        alias: 'hic et nunc NFTs',
        address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      },
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
          token_id: '152',
          token_info: {
            '': '697066733a2f2f516d6131316b366168505258475656375267484e754c7577423950715142324d564a55744e4e584a376451654172',
          },
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'hicetnunc2000lab',
        address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      },
      storage: {
        ledger: 511,
        paused: false,
        metadata: 512,
        operators: 513,
        all_tokens: '153',
        administrator: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
        token_metadata: 514,
      },
      diffs: [
        {
          bigmap: 514,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprusBDEMffQGtgXrHHfUWWWvDGJvSRdt4WBNR5PRsZ5eWqC2nfJ7',
            key: '152',
            value: {
              token_id: '152',
              token_info: {
                '': '697066733a2f2f516d6131316b366168505258475656375267484e754c7577423950715142324d564a55744e4e584a376451654172',
              },
            },
          },
        },
        {
          bigmap: 511,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expru3VKqrBfsG3ZbP9eBTTpWrYWth5Ypp8qhn6JyM4BR3pTB3PGu8',
            key: {
              nat: '152',
              address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
            },
            value: '1',
          },
        },
      ],
    },
    {
      id: 42083287,
      level: 1365705,
      timestamp: '2021-03-01T11:28:07Z',
      block: 'BMedZBvdqk8Sv2anm4JXUjhhX6HnHaYFVdJYWm57xvWtbju8qvA',
      hash: 'ooDEeiWKwk7eL4DgUELErf6qkycYisbehWZsU3R1M2XWA5DKW2P',
      counter: 10511770,
      nonce: null,
      sender: {
        alias: 'KOSHA',
        address: 'tz1ZdMfzmWLb8mu22jE7rZ8Y3t9iKezM68cq',
      },
      target: {
        alias: 'hic et nunc NFTs',
        address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      },
      parameter: {
        entrypoint: 'transfer',
        value: [
          {
            txs: [
              {
                to_: 'tz1dfERyYcVRPG4WkZPf8k9TeRvc6i2gqBPx',
                amount: '100',
                token_id: '157',
              },
            ],
            from_: 'tz1ZdMfzmWLb8mu22jE7rZ8Y3t9iKezM68cq',
          },
        ],
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        ledger: 511,
        paused: false,
        metadata: 512,
        operators: 513,
        all_tokens: '160',
        administrator: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
        token_metadata: 514,
      },
      diffs: [
        {
          bigmap: 511,
          path: 'ledger',
          action: 'update_key',
          content: {
            hash: 'exprtokC7bqNeRVaLs5L9pE7ZqsBQdCcwuuYLm7mxLvqjATnXkjZ3k',
            key: {
              nat: '157',
              address: 'tz1ZdMfzmWLb8mu22jE7rZ8Y3t9iKezM68cq',
            },
            value: '0',
          },
        },
        {
          bigmap: 511,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprv6Rz5zhyhds5TdrHJKufekJHpxmMvUpikWYqmmV11JEXTpReiC',
            key: {
              nat: '157',
              address: 'tz1dfERyYcVRPG4WkZPf8k9TeRvc6i2gqBPx',
            },
            value: '100',
          },
        },
      ],
    },
    {
      id: 73113736,
      level: 1654751,
      timestamp: '2021-08-31T19:12:48Z',
      block: 'BM3iDeDvCVmwpM2cky9cqRbYzB1e9dt1Et8FNb2h6nxZYpuHxyc',
      hash: 'ooPfj1wFuJgUCkmmFMkgSvsMQCQ6g2uisedy1ktd8u7xys4PjXD',
      counter: 14390193,
      nonce: null,
      sender: {
        address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
      },
      target: {
        alias: 'Tezzardz Crowdsale',
        address: 'KT1DdxmJujm3u2ZNkYwV24qLBJ6iR7sc58B9',
      },
      parameter: {
        entrypoint: 'mint',
        value: '1',
      },
      amount: 15000000,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fa2: 'KT1LHHLso8zQWQWg1HUukajdxxbkGfNoHjh6',
        admin: 'tz1hFhmqKNB7hnHVHAFSk9wNqm7K9GgF2GDN',
        price: '15000000',
        artist: 'tz1LLPWMyZ7gKsp3WnLfemyAYW6CoZoozku5',
        oracle: 'KT1AdbYiPYb5hDuEuVrfxmFehtnBCXv4Np7r',
        max_mint: '10',
        metadata: 12111,
        n_minted: '3167',
        max_supply: '4200',
        mint_index: '3680',
        sale_started: true,
        giveaway_index: '42',
        freeze_metadata: false,
        giveaway_amount: '42',
        provenance_hash: 'ipfs://QmYZPNzf2dgQoek9PMc4ZtPoaGB6hWnibKw95NaLDMGgp5',
        placeholder_ipfs_path:
          '697066733a2f2f7a646a37576b507672784c3756786957626a425035726673685074417a58775a373775765a686653416f484465623369772f',
        oracle_callback_expected: false,
      },
      diffs: null,
    },
    {
      id: 73113737,
      level: 1654751,
      timestamp: '2021-08-31T19:12:48Z',
      block: 'BM3iDeDvCVmwpM2cky9cqRbYzB1e9dt1Et8FNb2h6nxZYpuHxyc',
      hash: 'ooPfj1wFuJgUCkmmFMkgSvsMQCQ6g2uisedy1ktd8u7xys4PjXD',
      counter: 14390193,
      nonce: 1,
      sender: {
        alias: 'Tezzardz Crowdsale',
        address: 'KT1DdxmJujm3u2ZNkYwV24qLBJ6iR7sc58B9',
      },
      target: {
        alias: 'Tezzardz',
        address: 'KT1LHHLso8zQWQWg1HUukajdxxbkGfNoHjh6',
      },
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
          metadata: {
            '': '697066733a2f2f7a646a37576b507672784c3756786957626a425035726673685074417a58775a373775765a686653416f484465623369772f33363830',
          },
          token_id: '3680',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
      },
      storage: {
        ledger: 12112,
        paused: false,
        metadata: 12113,
        operators: 12114,
        all_tokens: [],
        total_supply: 12116,
        administrator: 'KT1DdxmJujm3u2ZNkYwV24qLBJ6iR7sc58B9',
        token_metadata: 12115,
      },
      diffs: [
        {
          bigmap: 12116,
          path: 'total_supply',
          action: 'add_key',
          content: {
            hash: 'exprtmP4hDUAVxxPVGa52AxtbKCYT6cWX75JNTUmymrzxANgKEPaer',
            key: '3680',
            value: '1',
          },
        },
        {
          bigmap: 12115,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprtmP4hDUAVxxPVGa52AxtbKCYT6cWX75JNTUmymrzxANgKEPaer',
            key: '3680',
            value: {
              token_id: '3680',
              token_info: {
                '': '697066733a2f2f7a646a37576b507672784c3756786957626a425035726673685074417a58775a373775765a686653416f484465623369772f33363830',
              },
            },
          },
        },
        {
          bigmap: 12112,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruq4h1cuWJmEtMDCTsiMuHHySc2ZExRprXL4WHPMYGCBi4y7tBY',
            key: {
              nat: '3680',
              address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
            },
            value: '1',
          },
        },
        {
          bigmap: 12112,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruq4h1cuWJmEtMDCTsiMuHHySc2ZExRprXL4WHPMYGCBi4y7tBY2',
            key: {
              nat: '3680',
              address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
            },
            value: '13435345348536458736458734657834658734653874563847563478563487563478563478563487563475836458734658743',
          },
        },
      ],
    },
    {
      id: 73113738,
      level: 1654751,
      timestamp: '2021-08-31T19:12:48Z',
      block: 'BM3iDeDvCVmwpM2cky9cqRbYzB1e9dt1Et8FNb2h6nxZYpuHxyc',
      hash: 'ooPfj1wFuJgUCkmmFMkgSvsMQCQ6g2uisedy1ktd8u7xys4PjXD',
      counter: 14390193,
      nonce: 2,
      sender: {
        alias: 'Tezzardz Crowdsale',
        address: 'KT1DdxmJujm3u2ZNkYwV24qLBJ6iR7sc58B9',
      },
      target: {
        alias: 'Tezzardz Artist',
        address: 'tz1LLPWMyZ7gKsp3WnLfemyAYW6CoZoozku5',
      },
      parameter: null,
      amount: 7500000,
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
      },
      storage: null,
      diffs: null,
    },
    {
      id: 73113739,
      level: 1654751,
      timestamp: '2021-08-31T19:12:48Z',
      block: 'BM3iDeDvCVmwpM2cky9cqRbYzB1e9dt1Et8FNb2h6nxZYpuHxyc',
      hash: 'ooPfj1wFuJgUCkmmFMkgSvsMQCQ6g2uisedy1ktd8u7xys4PjXD',
      counter: 14390193,
      nonce: 3,
      sender: {
        alias: 'Tezzardz Crowdsale',
        address: 'KT1DdxmJujm3u2ZNkYwV24qLBJ6iR7sc58B9',
      },
      target: {
        alias: 'Tezzardz Admin',
        address: 'tz1hFhmqKNB7hnHVHAFSk9wNqm7K9GgF2GDN',
      },
      parameter: null,
      amount: 7500000,
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
      },
      storage: null,
      diffs: null,
    },
    {
      id: 190861006,
      level: 2219948,
      timestamp: '2022-03-23T09:40:44Z',
      block: 'BLoB4JMUUbhNzXLRXkWQkHVh9Zx2HzU6HNwBzT1TuptuuUVUdoZ',
      hash: 'oopLhJLjumQYaA3ryubFKtrkRQoBdewgBsqNwDqEb2zUQjobdGF',
      counter: 11694432,
      nonce: null,
      sender: {
        address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
      },
      target: {
        alias: '8bidou 8x8',
        address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      },
      parameter: {
        entrypoint: 'transfer',
        value: [
          {
            txs: [
              {
                to_: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
                amount: '10',
                token_id: '2213',
              },
            ],
            from_: 'tz1XrutuvkFRG15HmV2gdon86F38NMMGMAXr',
          },
        ],
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'Mark Knol',
        address: 'tz1XrutuvkFRG15HmV2gdon86F38NMMGMAXr',
      },
      storage: {
        rgb: 113218,
        ledger: 113213,
        metadata: 113217,
        operators: 113214,
        token_index: '2219',
        token_metadata: 113216,
        token_total_supply: 113215,
      },
      diffs: [
        {
          bigmap: 113213,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruR1DW4t37iSVtz6SMousHz9BU9NN7dsqdLsZAkmiwt2aPdZ9DS',
            key: {
              nat: '2213',
              address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
            },
            value: '10',
          },
        },
        {
          bigmap: 113213,
          path: 'ledger',
          action: 'remove_key',
          content: {
            hash: 'exprugEenUr6dev2pi4Q246k3AFvyuiG7LAwUmUqKaSoffPia1khJX',
            key: {
              nat: '2213',
              address: 'tz1XrutuvkFRG15HmV2gdon86F38NMMGMAXr',
            },
            value: '10',
          },
        },
      ],
    },
    {
      id: 185310949,
      level: 2187033,
      timestamp: '2022-03-11T10:10:04Z',
      block: 'BMWpcykkEXjfU2W14wUprEU7JrsvXTcBfkrut3BR35qGrxPkmLL',
      hash: 'ootJMtSR9vBpNvsk1hZm63wgBLu5fFY9Mu1riNaxMkWqkjyaSkA',
      counter: 50147075,
      nonce: null,
      sender: {
        address: 'tz2EV1f4dheCSYBDbxqjrx1Jyd6HffisKC8u',
      },
      target: {
        address: 'KT1CzVSa18hndYupV9NcXy3Qj7p8YFDZKVQv',
      },
      amount: 0,
      parameter: {
        entrypoint: 'transfer',
        value: [
          {
            txs: [
              {
                to_: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
                amount: '1',
                token_id: '2',
              },
            ],
            from_: 'tz2EV1f4dheCSYBDbxqjrx1Jyd6HffisKC8u',
          },
        ],
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        admin: 'tz1bWgKiizRZxCyQzJhDtiGmu3jduyaauKmW',
        ledger: 127310,
        minted: 127313,
        metadata: 127315,
        operators: 127311,
        transmuter: 'KT1WvV2rPBQUFUqtCWmnnj8JX2gkmDtMBzQi',
        token_limits: 127314,
        frozen_ledger: 127312,
        token_metadata: 127316,
      },
      diffs: [
        {
          bigmap: 127310,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruZkxjTyNjtSAg9hnGDdEpS6kY6b5gjdaN9aE2xVr9wGrTBqNbP',
            key: {
              owner: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
              token_id: '2',
            },
            value: '1',
          },
        },
        {
          bigmap: 127310,
          path: 'ledger',
          action: 'remove_key',
          content: {
            hash: 'exprvLCwU4re5DnUyjpDCsY8thXVKMT2QfK7Qw2eRwAYYRTvQzdpyf',
            key: {
              owner: 'tz2EV1f4dheCSYBDbxqjrx1Jyd6HffisKC8u',
              token_id: '2',
            },
            value: '1',
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [SetLedgerHandler]);

  expect(events).toStrictEqual([
    {
      id: '354fb63356b430b339d04250a5fa6e65',
      type: 'SET_LEDGER',
      opid: 42065345,
      ophash: 'onyoeuGPkxxXdKXYLwdzZ91nyaRFW4qVLKqkfwJv6j8Mt5cWb8C',
      timestamp: '2021-03-01T03:39:21Z',
      level: 1365242,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '152',
      holder_address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      amount: '1',
      is_mint: true,
    },
    {
      id: '24fa886117ad30c88583c51eab12711b',
      type: 'SET_LEDGER',
      opid: 42083287,
      ophash: 'ooDEeiWKwk7eL4DgUELErf6qkycYisbehWZsU3R1M2XWA5DKW2P',
      timestamp: '2021-03-01T11:28:07Z',
      level: 1365705,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '157',
      holder_address: 'tz1ZdMfzmWLb8mu22jE7rZ8Y3t9iKezM68cq',
      amount: '0',
      is_mint: false,
    },
    {
      id: 'f58d89c87461f104631e2015037e30b6',
      type: 'SET_LEDGER',
      opid: 42083287,
      ophash: 'ooDEeiWKwk7eL4DgUELErf6qkycYisbehWZsU3R1M2XWA5DKW2P',
      timestamp: '2021-03-01T11:28:07Z',
      level: 1365705,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '157',
      holder_address: 'tz1dfERyYcVRPG4WkZPf8k9TeRvc6i2gqBPx',
      amount: '100',
      is_mint: false,
    },
    {
      id: 'cd2f8fc883455aeb42d1bec81f5d00d5',
      type: 'SET_LEDGER',
      opid: 190861006,
      ophash: 'oopLhJLjumQYaA3ryubFKtrkRQoBdewgBsqNwDqEb2zUQjobdGF',
      timestamp: '2022-03-23T09:40:44Z',
      level: 2219948,
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      token_id: '2213',
      holder_address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
      amount: '10',
      is_mint: false,
    },
    {
      id: '1a80d530bace83c7b031d2842557ecdb',
      type: 'SET_LEDGER',
      opid: 190861006,
      ophash: 'oopLhJLjumQYaA3ryubFKtrkRQoBdewgBsqNwDqEb2zUQjobdGF',
      timestamp: '2022-03-23T09:40:44Z',
      level: 2219948,
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      token_id: '2213',
      holder_address: 'tz1XrutuvkFRG15HmV2gdon86F38NMMGMAXr',
      amount: '0',
      is_mint: false,
    },
    {
      id: 'eb341a14514b840b7c90593aa31b7742',
      type: 'SET_LEDGER',
      opid: 185310949,
      ophash: 'ootJMtSR9vBpNvsk1hZm63wgBLu5fFY9Mu1riNaxMkWqkjyaSkA',
      timestamp: '2022-03-11T10:10:04Z',
      level: 2187033,
      fa2_address: 'KT1CzVSa18hndYupV9NcXy3Qj7p8YFDZKVQv',
      token_id: '2',
      holder_address: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
      amount: '1',
      is_mint: false,
    },
    {
      id: '6b7351feda83fa84e6eb8de25eb1af05',
      type: 'SET_LEDGER',
      opid: 185310949,
      ophash: 'ootJMtSR9vBpNvsk1hZm63wgBLu5fFY9Mu1riNaxMkWqkjyaSkA',
      timestamp: '2022-03-11T10:10:04Z',
      level: 2187033,
      fa2_address: 'KT1CzVSa18hndYupV9NcXy3Qj7p8YFDZKVQv',
      token_id: '2',
      holder_address: 'tz2EV1f4dheCSYBDbxqjrx1Jyd6HffisKC8u',
      amount: '0',
      is_mint: false,
    },
  ]);
});
