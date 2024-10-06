import { privateKeyToAccount } from 'viem/accounts';
import assert from 'assert';
import { createViemPublicClient, createViemWalletClient } from '../_utils/viem/viem-utils';
import { CreateTxRelayLambdaProps } from './relay-tx-types';

const environment: string = process.env.ENVIRONMENT as string;
if (environment === undefined) throw new Error('ENVIRONMENT env variable is missing');

const relayerPrivateKey: string = process.env.PRIVATE_KEY as string;
if (relayerPrivateKey === undefined) throw new Error('PRIVATE_KEY env variable is missing');

/**
 * This function is used to relay a transaction to the base network
 * @param params
 */
export const handler = async (params: CreateTxRelayLambdaProps): Promise<{
  data: {
    hash: `0x${string}`;
  };
}> => {
  console.log('event', params);
  const relayerAccount = privateKeyToAccount(relayerPrivateKey as `0x${string}`);
  const viemWalletClient = createViemWalletClient(relayerAccount);
  const publicClient = createViemPublicClient();
  const feesPerGas = await publicClient.estimateFeesPerGas();
  // estimate the gas so that we can then set a 20% more
  const gas = await publicClient.estimateGas({
    account: relayerAccount,
    to: params.to,
    value: BigInt(0),
    data: params.txData,
    type: 'eip1559',
    maxPriorityFeePerGas: feesPerGas.maxPriorityFeePerGas, // we don't want to adjust the priority fee
  });
  assert(!!feesPerGas.maxFeePerGas, 'maxFeePerGas not set inside feesPerGas');
  // 4x the maxFeePerGas so we're sure the tx is not stuck in case of gas spikes - 2x on Mainnet
  const gasIncreaseMultiplier = BigInt(4);
  const request = await viemWalletClient.prepareTransactionRequest({
    account: relayerAccount,
    to: params.to,
    value: BigInt(0),
    data: params.txData,
    type: 'eip1559',
    maxFeePerGas: feesPerGas.maxFeePerGas * gasIncreaseMultiplier,
    maxPriorityFeePerGas: feesPerGas.maxPriorityFeePerGas, // we don't want to adjust the priority fee
    gas: gas * BigInt(12) / BigInt(10), // 20% more gas than estimated
  });
  const signature = await viemWalletClient.signTransaction(request);
  const hash = await viemWalletClient.sendRawTransaction({ serializedTransaction: signature });
  return {
    data: {
      hash: hash,
    },
  };
};
