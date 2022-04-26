import VersumMintHandler from './versum_mint';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates VERSUM_MINT events', async () => {
  const transactions: Transactions = [
    {
      id: 137729490,
      level: 2023174,
      timestamp: '2022-01-12T00:14:30Z',
      block: 'BLy67RAWHwoVqnwMjKry3SwFH8krNg9YQD91nhmJDESiC3frmDx',
      hash: 'ono5r7ZwqCXoSJwN6M6wtoDx2Nh17aFprgd2jHofmBijkvWR9hm',
      counter: 44861645,
      nonce: null,
      sender: {
        address: 'tz1QjLDuXQrFL2kQyT7NVUXKi1E3U998CmCg',
      },
      target: {
        address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
      },
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '10000',
          splits: [
            {
              pct: '300',
              address: 'tz1V11Mtz8jZ9DcwUqqy8fRGgSi7ERuceqQn',
            },
            {
              pct: '300',
              address: 'tz1gWf9tis5tF11W4e5Vd3uD4sGuUkG6fGnn',
            },
            {
              pct: '300',
              address: 'tz1NBAh46Vyz7CdNLpnZ68jpN6nBFH4LSboy',
            },
            {
              pct: '10',
              address: 'tz1eht4WAjkqU7kaupJd8qCDmec9HuKfGf68',
            },
            {
              pct: '10',
              address: 'tz1WidyAU8wuyG25Pd7b93bcx9hMu7W9Pea8',
            },
            {
              pct: '10',
              address: 'tz1hpdyGDit2se5ztF2Y9piXQfc3rFhYot9t',
            },
            {
              pct: '10',
              address: 'tz1cjTb6ijvnPrJBfaTEFphxDovW9xQbkmDK',
            },
            {
              pct: '10',
              address: 'tz1PBArJZ5FX6uKdGQwuHZ7NcyMCffN5z3Xa',
            },
            {
              pct: '10',
              address: 'tz1XvP1MfRgh6DbHhVXK5TTqKznV5MYCGoMv',
            },
            {
              pct: '10',
              address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
            },
            {
              pct: '10',
              address: 'tz1d4cbP98Sbni6mxUmvAN9vufMZskSv3F4K',
            },
            {
              pct: '10',
              address: 'tz1fUmgqttdH9eJ17FRdyeTSZ7eLBDajRN1Q',
            },
            {
              pct: '10',
              address: 'tz1QjLDuXQrFL2kQyT7NVUXKi1E3U998CmCg',
            },
          ],
          royalty: '200',
          metadata: {
            '': '697066733a2f2f516d5466346f6a64464d35336f347836325963336a6a66697448784a31533779727474705463746d775a4b597268',
          },
          infusions: [],
          max_per_address: '2',
          no_transfers_until: '2022-01-15T00:07:00Z',
          req_verified_to_own: false,
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        ledger: 75550,
        market: 'KT1FRHTMDUJTQXZ3BvrJ6rfySxNvpthyh88r',
        paused: false,
        big_map: 75558,
        extra_db: 75549,
        identity: 'KT1NUrzs7tiT4VbNPqeTxgAFa4SXeV1f3xe9',
        metadata: 75551,
        operators: 75553,
        all_tokens: ['0'],
        mint_slots: 75552,
        total_supply: 75557,
        administrator: 'KT1XumYAxnPCrDiLU4XLNciZncExAzdEJrua',
        token_counter: '1',
        minting_paused: false,
        token_metadata: 75556,
        genesis_minters: [
          'tz1KqzBPfhoTquknvyWSsHQ3PX5VDaoYMqq7',
          'tz1M7n1FpvfKhByTPhW3pwbQv67Ka5YV17BC',
          'tz1NBAh46Vyz7CdNLpnZ68jpN6nBFH4LSboy',
          'tz1PBArJZ5FX6uKdGQwuHZ7NcyMCffN5z3Xa',
          'tz1QkTYvXaG5mkawf2NF5bxeGsj6A1yTihzk',
          'tz1RSWDfALf4RR8tKCqmo55ArK6MfpnYwvtb',
          'tz1TSWEDs9wcBx2KiRzVzyzECsNpRiZaLJ1D',
          'tz1TxDL7npfYDSyvrZFC4deUPMySvsL6xARU',
          'tz1U2wsJgebEvS6CZYXn1mjErRU5mSZ2ZS1Z',
          'tz1UDFDYRcKU2LXkvAVAz5cQ9mBLwmnbtvM4',
          'tz1V11Mtz8jZ9DcwUqqy8fRGgSi7ERuceqQn',
          'tz1V84gmD8MsmLuCfT9M1LDaTjpJb4eAejvM',
          'tz1WeFqivuC8fK9vH1Q4hz4wKXiUm5M96WFk',
          'tz1WidyAU8wuyG25Pd7b93bcx9hMu7W9Pea8',
          'tz1X4Z7JcyYAgxr33bh2XyWBXMug5AcuKg5y',
          'tz1XvP1MfRgh6DbHhVXK5TTqKznV5MYCGoMv',
          'tz1Y6yDurLYsrFPRd4NrwBHVy56AQRsS37Ua',
          'tz1YMqQQme7jcERyk2586QDT9fqWGCz9L2fQ',
          'tz1YinhT4JT3ngF9pMYBySNVrWDYhLNEfsYE',
          'tz1ZBMhTa7gxSpaeXoqyc6bTCrxEHfZYSpPt',
          'tz1ZdMfzmWLb8mu22jE7rZ8Y3t9iKezM68cq',
          'tz1ZszpJ8YdVuwaqwwqJzCfKEFb9cmaYEqTU',
          'tz1aXcPJTeNdgyf8JiTaRDgbCaNd1bKxDfm4',
          'tz1cALmpTf7EeeSBXHAX2rcnR4WAP8tSWkt6',
          'tz1cjTb6ijvnPrJBfaTEFphxDovW9xQbkmDK',
          'tz1eZ8amacCvSQsFM8wampwWXJFWsmGVRQFd',
          'tz1eht4WAjkqU7kaupJd8qCDmec9HuKfGf68',
          'tz1fP1xrV55sqTV3zfdxvYpqbLcE92GAZbnR',
          'tz1fUmgqttdH9eJ17FRdyeTSZ7eLBDajRN1Q',
          'tz1gWf9tis5tF11W4e5Vd3uD4sGuUkG6fGnn',
          'tz1gwmdJruRtdLsL3jwxaSSLD3p9hp2waXU1',
          'tz1h5ggjuAGW33VPksGmpBru2B3Cn868uxsh',
          'tz1hHkndmCoSd7LNNK9QZwDJbaWnBmjpQeQX',
          'tz1hZ9LFcdGxds27TksbJYBpBuuHKExyWNjY',
          'tz1hfuVWgcJ89ZE75ut9Qroi3y7GFJL5Lf2K',
          'tz1iUWYX13agvJ5aSUTkgrkQDxTorRryCxLg',
          'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
          'tz2HwP1JKEjEy4H8RxPMkoHWuSzUWZsRSC3R',
          'tz2VN3fWzqHE44F6zedJB7UtALKEh5WhqAJJ',
          'tz2WtFZKsUdx3gQzg5JKbvC4NdeDXi6z1SUE',
        ],
        genesis_timeout: '2022-01-13T00:14:30Z',
        materia_address: 'KT1E7KaE5mkkxh3sY8GLod8qrkMeEu9diDfQ',
        token_extra_data: 75555,
        contract_registry: 'KT1BMWkNX3zRDH1a6A4PJ1uHjhAm44jhQvrB',
        mint_materia_cost: '10000',
        admin_check_lambda:
          '[{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"False"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]}],[{"prim":"PUSH","args":[{"prim":"address"},{"bytes":"0002ffffffffffffffffffffffffffffffffffffffff"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"GT"},{"prim":"IF","args":[[{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"5"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"SWAP"},{"prim":"DROP"}],[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"invalid_view"}]},{"prim":"FAILWITH"}],[]]}]]}],[{"prim":"SWAP"},{"prim":"DROP"}]]}]]}]',
        signed_co_creatorship: 75554,
        require_verified_to_mint: true,
        contracts_may_hold_tokens_global: false,
      },
      diffs: [
        {
          bigmap: 75557,
          path: 'total_supply',
          action: 'add_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: '10000',
          },
        },
        {
          bigmap: 75556,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              token_id: '0',
              token_info: {
                '': '697066733a2f2f516d5466346f6a64464d35336f347836325963336a6a66697448784a31533779727474705463746d775a4b597268',
              },
            },
          },
        },
        {
          bigmap: 75555,
          path: 'token_extra_data',
          action: 'add_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              minter: 'tz1QjLDuXQrFL2kQyT7NVUXKi1E3U998CmCg',
              splits: [
                {
                  pct: '300',
                  address: 'tz1V11Mtz8jZ9DcwUqqy8fRGgSi7ERuceqQn',
                },
                {
                  pct: '300',
                  address: 'tz1gWf9tis5tF11W4e5Vd3uD4sGuUkG6fGnn',
                },
                {
                  pct: '300',
                  address: 'tz1NBAh46Vyz7CdNLpnZ68jpN6nBFH4LSboy',
                },
                {
                  pct: '10',
                  address: 'tz1eht4WAjkqU7kaupJd8qCDmec9HuKfGf68',
                },
                {
                  pct: '10',
                  address: 'tz1WidyAU8wuyG25Pd7b93bcx9hMu7W9Pea8',
                },
                {
                  pct: '10',
                  address: 'tz1hpdyGDit2se5ztF2Y9piXQfc3rFhYot9t',
                },
                {
                  pct: '10',
                  address: 'tz1cjTb6ijvnPrJBfaTEFphxDovW9xQbkmDK',
                },
                {
                  pct: '10',
                  address: 'tz1PBArJZ5FX6uKdGQwuHZ7NcyMCffN5z3Xa',
                },
                {
                  pct: '10',
                  address: 'tz1XvP1MfRgh6DbHhVXK5TTqKznV5MYCGoMv',
                },
                {
                  pct: '10',
                  address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
                },
                {
                  pct: '10',
                  address: 'tz1d4cbP98Sbni6mxUmvAN9vufMZskSv3F4K',
                },
                {
                  pct: '10',
                  address: 'tz1fUmgqttdH9eJ17FRdyeTSZ7eLBDajRN1Q',
                },
                {
                  pct: '10',
                  address: 'tz1QjLDuXQrFL2kQyT7NVUXKi1E3U998CmCg',
                },
              ],
              royalty: '200',
              infusions: [],
              extra_fields: {},
              max_per_address: '2',
              no_transfers_until: '2022-01-15T00:07:00Z',
              req_verified_to_own: false,
              contracts_may_hold_token: false,
            },
          },
        },
        {
          bigmap: 75550,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprvDt2RnVeUaiUG8BkLs7eEsSwGXpKaidLGFejtHM4r5AwVGoVQy',
            key: {
              nat: '0',
              address: 'tz1QjLDuXQrFL2kQyT7NVUXKi1E3U998CmCg',
            },
            value: '10000',
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [VersumMintHandler]);

  expect(events).toStrictEqual([
    {
      id: '0a975d0309022733024925640529136b',
      type: 'VERSUM_MINT',
      opid: 137729490,
      ophash: 'ono5r7ZwqCXoSJwN6M6wtoDx2Nh17aFprgd2jHofmBijkvWR9hm',
      timestamp: '2022-01-12T00:14:30Z',
      level: 2023174,
      fa2_address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
      token_id: '0',
      editions: '10000',
      artist_address: 'tz1QjLDuXQrFL2kQyT7NVUXKi1E3U998CmCg',
      royalties: '200',
      metadata_uri: 'ipfs://QmTf4ojdFM53o4x62Yc3jjfitHxJ1S7yrttpTctmwZKYrh',
    },
  ]);
});
