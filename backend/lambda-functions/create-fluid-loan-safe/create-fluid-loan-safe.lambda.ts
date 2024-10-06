import assert from 'assert';
import { SafeAccountConfig, SafeFactory } from '@safe-global/protocol-kit';
import { RELAYER_ADDRESS } from '../../_utils/constants';
import { encodeAbiParameters, encodeFunctionData, toHex } from 'viem';
import { prepareTxDataForMulticall, SAFE_MODULE_ADDRESS } from '../_utils/viem/viem-utils';
import { getCustomerFromIdCustomer, updateFluidLoanSafe } from '../_utils/customerDynamoDB/customer-dynamodb';
import { callLambdaFunctionAsync } from '../_utils/callLambdaFunction/call-lambda-function';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { resourceNameManager } from '../_utils/resource-name-manager/resource-name-manager';
import { CreateTxRelayLambdaProps } from '../relay-tx/relay-tx-types';
import { addAddressUnderTracking } from '../_utils/alchemy/alchemy-utils';

const environment: string = process.env.ENVIRONMENT as string;
if (environment === undefined) throw new Error('ENVIRONMENT env variable is missing');

// TODO - this is here just for hackathon purposes - in prod should be a separate process
const relayerPrivateKey: string = process.env.PRIVATE_KEY as string;
if (relayerPrivateKey === undefined) throw new Error('PRIVATE_KEY env variable is missing');
const alchemyApiToken: string = process.env.ALCHEMY_API_TOKEN as string;
if (alchemyApiToken === undefined) throw new Error('ALCHEMY_API_TOKEN env variable is missing');

/**
 * Creates a new safe and excute the operations to enable the module
 * @param params
 */
export const handler = async (params: {
  idCustomer: string;
}): Promise<void> => {
  console.log('event', params);
  assert(!!params.idCustomer, 'idCustomer is required');

  const customer = await getCustomerFromIdCustomer(params.idCustomer);
  assert(!!customer, 'Customer not found');
  assert(!!customer.authWalletAddress, 'Customer authWalletAddress is required');
  assert(!!customer.liquidationAddress, 'Customer liquidationAddress is required');
  const userWalletAddress = customer.authWalletAddress;
  const liquidationAddress = customer.liquidationAddress as `0x${string}`;

  // let's predict and generate the new safe address
  const safeAccountConfig: SafeAccountConfig = {
    owners: [RELAYER_ADDRESS],
    threshold: 1,
  };
  const saltNonce = Math.floor(Math.random() * Math.pow(2, 32));
  const safeFactory = await SafeFactory.init({
    safeVersion: '1.4.1',
    isL1SafeSingleton: false,
    provider: '{ALCHEMY_URL_THERE}',
    signer: relayerPrivateKey,
  });
  const protocolKit = await safeFactory.deploySafe({
    safeAccountConfig,
    saltNonce: toHex(saltNonce),
  });
  const safeAddress = await protocolKit.getAddress();
  let nonce = 0;
  console.log('Generated safe', safeAddress);
  // prepare call to enable module
  const enableModuleTx = await protocolKit.createEnableModuleTx(
    SAFE_MODULE_ADDRESS,
    {
      nonce: nonce,
    },
  );
  const enableModuleTxSignature = await protocolKit.signTransaction(enableModuleTx);
  const enableModuleTxData = await protocolKit.getEncodedTransaction(enableModuleTxSignature);
  nonce++;
  // await protocolKit.executeTransaction(enableModuleTx);
  const abiItem = {
    inputs: [{ name: 'data', type: 'bytes' }],
    name: 'onInstall',
    outputs: [],
    type: 'function',
  };

  const data = encodeFunctionData({
    abi: [abiItem],
    functionName: 'onInstall',
    args: [
      encodeAbiParameters([{ name: 'data', type: 'address' }], [liquidationAddress]),
    ],
  });
  const onInstallModuleTx = await protocolKit.createTransaction({
    transactions: [
      {
        data: data,
        value: '0x0',
        to: SAFE_MODULE_ADDRESS,
      },
    ],
    options: {
      nonce: nonce,
    },
  });
  const onInstallModuleTxSignature = await protocolKit.signTransaction(onInstallModuleTx);
  const onInstallModuleTxData = await protocolKit.getEncodedTransaction(onInstallModuleTxSignature);
  nonce++;
  const addOwnerTx = await protocolKit.createAddOwnerTx(
    {
      ownerAddress: userWalletAddress,
      threshold: 1,
    },
    {
      nonce: nonce,
    },
  );
  const addOwnerTxSignature = await protocolKit.signTransaction(addOwnerTx);
  const addOwnerTxData = await protocolKit.getEncodedTransaction(addOwnerTxSignature);
  const txData = prepareTxDataForMulticall({
    txs: [
      enableModuleTxData,
      onInstallModuleTxData,
      addOwnerTxData,
    ],
    safeAddress: safeAddress,
  });

  // Update the safe address in the fluidload safe part
  const updateSafePromise = updateFluidLoanSafe({
    idCustomer: params.idCustomer,
    fluidLoanSafe: safeAddress.toLowerCase(),
  });

  // Call the relayer lambda function
  const callLambdaPromise = callLambdaFunctionAsync({
    lambdaClient: new LambdaClient({}),
    functionName: `${resourceNameManager.getEnvironment()}-fluidloan-eth-rome-24-relay-tx-lambda`,
    payload: {
      to: '0x9641d764fc13c8B624c04430C7356C1C7C8102e2' as `0x${string}`,
      txData: txData.txData,
    } as CreateTxRelayLambdaProps,
  });

  // Add the safe address to the alchemy tracking
  const addAddressPromise = addAddressUnderTracking(alchemyApiToken, safeAddress);

  try {
    // Execute all promises in parallel
    await Promise.all([updateSafePromise, callLambdaPromise, addAddressPromise]);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
